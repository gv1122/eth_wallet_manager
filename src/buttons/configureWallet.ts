import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Client,
    CommandInteraction
} from 'discord.js';
import { Button } from '../types/button';
import { BANNER_URL } from '../constants/data';
import { fetchWalletById } from '../mongo/retrieve';
import { updateWalletById } from '../mongo/modify';

export const ConfigureWallet: Button = {
    name: 'configure_wallet',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `🔧 Configure Wallet 🔧`,
            description: `Use the commands below to configure your wallet settings:\n\n🔑 View Private Key\nView the private key for your wallet.\n\n📝 Rename Wallet\nRename your wallet.\n\n⏸️ Toggle Automation\nPause/Resume all farming actions on your wallet.\n\n⚙️ Manage Wallet\nManage a wallet\n\n🔄 Select Wallet\nSelect a wallet to manage`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const buttons = [
            new ButtonBuilder()
                .setCustomId(`view_private_key-${walletAddress}`)
                .setLabel('🔑 View Private Key')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`rename_wallet-${walletAddress}`)
                .setLabel('📝 Rename Wallet')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`toggle_automation-${walletAddress}`)
                .setLabel('⏸️ Toggle Automation')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`wallet-${walletAddress}`)
                .setLabel('⚙️ Manage Wallet')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`select-${walletAddress}`)
                .setLabel('🔄 Select Wallet')
                .setStyle(ButtonStyle.Primary)
        ];

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[0], buttons[1]),
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[2], buttons[3]),
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[4])
            ]
        });
    }
};

export const ViewPrivateKey: Button = {
    name: 'view_private_key',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const walletData = (await fetchWalletById(parseInt(interaction.user.id)))[0];

        const embed = {
            title: `🗝 View Private Key 🗝`,
            description: `Wallet: \`${walletData.walletName}\`\nAddress: \`${walletData.walletAddress}\`\nPrivate Key: ||${walletData.privateKey}||\n\nPlease securely store this and do not share it with anyone, as a compromised private key will allow unrestricted access to your wallet.`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        await interaction.followUp({
            ephemeral: true,
            content: 'I sent you a DM with your private key!'
        });

        await interaction.user.send({
            embeds: [embed]
        });
    }
};

export const RenameWallet: Button = {
    name: 'rename_wallet',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `📝 Rename Wallet 📝`,
            description: `Please enter a new name for your wallet within the next 10 seconds, or type \`cancel\` to cancel this operation.`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const reply = await interaction.followUp({
            ephemeral: true,
            embeds: [embed]
        });

        const filter = (m: any) => m.author.id === interaction.user.id;
        const collector = reply.channel.createMessageCollector({ filter, time: 10000 });

        collector.on('collect', async collectedMessage => {
            if (collectedMessage.content === 'cancel') {
                await interaction.followUp({
                    ephemeral: true,
                    content: 'Operation cancelled.'
                });
            } else {
                const walletData = (await fetchWalletById(parseInt(interaction.user.id)))[0];
                walletData.walletName = collectedMessage.content;

                // type issue with package types / schema. need to update in future
                // @ts-ignore
                updateWalletById(walletData, parseInt(interaction.user.id));

                await interaction.followUp({
                    ephemeral: true,
                    content: `Successfully renamed wallet to \`${collectedMessage.content}\`!`
                });
            }
        });
    }
};

export const ToggleAutomation: Button = {
    name: 'toggle_automation',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const walletData = (await fetchWalletById(parseInt(interaction.user.id)))[0];

        const embed = {
            title: `Automation`,
            description: walletData.farmingPaused
                ? 'Are you sure you want to resume farming on this wallet? This will restart automation with the current configuration. Please reply with "yes" to confirm.'
                : 'Are you sure you want to pause farming on this wallet? This will stop all automation and you will need to manually resume farming. Please reply with "yes" to confirm.',
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const reply = await interaction.followUp({
            ephemeral: true,
            embeds: [embed]
        });

        const filter = (m: any) => m.author.id === interaction.user.id;
        const collector = reply.channel.createMessageCollector({ filter, time: 10000 });

        collector.on('collect', async collectedMessage => {
            if (collectedMessage.content === 'cancel') {
                await interaction.followUp({
                    ephemeral: true,
                    content: 'Operation cancelled.'
                });
            } else {
                if (collectedMessage.content === 'yes') {
                    walletData.farmingPaused = !walletData.farmingPaused;

                    // type issue with package types / schema. need to update in future
                    // @ts-ignore
                    updateWalletById(walletData, parseInt(interaction.user.id));

                    await interaction.followUp({
                        ephemeral: true,
                        content: `Successfully ${
                            walletData.farmingPaused ? 'paused' : 'resumed'
                        } automation on this wallet.`
                    });
                }
            }
        });
    }
};
