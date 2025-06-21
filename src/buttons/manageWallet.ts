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

export const ManageWallet: Button = {
    // needs to stay like this
    name: 'wallet',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `🌐 Managing ${walletAddress} 🌐`,
            description: `Address: \`${walletAddress}\`\n\nUse the commands below to manage your wallet activities and configuration settings:\n\n📊 View Automation\n- View automation settings\n\n🕹️ View Activity\n- With this command, you can view prior transactions for your wallet.\n\n🎮 Manually Farm\n- This command allows you manually trigger a farming action.\n\n⚙️ Configure Automation\n- Use this to manage the automation and farming patterns of your wallet.\n\n💰 Bridge Funds\n- This command allows you to transfer funds into your wallet, bridge, and view the funding of your wallet across all supported chains.\n\n🔑 Configure Wallet\n- This command will let you manage the state of your wallet within Bullbot.\n\n🔄 Select Wallet\n- Select a wallet to manage`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        // need to create 4 rows, each with two buttons

        const buttons = [
            new ButtonBuilder()
                .setCustomId(`automation-${walletAddress}`)
                .setLabel('📊 View Automation')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`activity-${walletAddress}`)
                .setLabel('🕹️ View Activity')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`bridge-${walletAddress}`)
                .setLabel('💰 Bridge Funds')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`farm-${walletAddress}`)
                .setLabel('🎮 Manually Farm')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`configure-${walletAddress}`)
                .setLabel('⚙️ Configure Automation')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`configure_wallet-${walletAddress}`)
                .setLabel('🔑 Configure Wallet')
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
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[4], buttons[5]),
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[6])
            ]
        });
    }
};
