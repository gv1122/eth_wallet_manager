import { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../types/command';
import { BANNER_URL, NUMBERS_EMOJIS } from '../constants/data';
import { PrimaryWallet } from '../buttons/primaryWallet';
import { fetchWalletById } from '../mongo/retrieve';

export const Manage: Command = {
    name: 'manage',
    description: 'Manage your wallets, view past transaction, and schedule automation',
    type: 1,

    run: async (client: Client, interaction: CommandInteraction) => {
        const wallets = await fetchWalletById(parseInt(interaction.user.id));
        let fields = [];

        if (wallets.length === 0) {
            return PrimaryWallet.run(client, interaction);
        } else {
            let count = 1;
            // create a field for each wallet
            wallets.forEach(wallet => {
                fields.push({
                    name: `${NUMBERS_EMOJIS[count++]}: ${wallet.walletName}`,
                    value: wallet.walletAddress,
                    inline: true
                });
            });
        }

        const embed = {
            title: '🔐 Wallet Management 🔐',
            description: 'Please select a wallet to manage:',
            fields,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const buttons = [];
        wallets.forEach((wallet, index) => {
            buttons.push(
                new ButtonBuilder()
                    .setCustomId(`wallet-${wallet.walletAddress}`)
                    .setLabel(NUMBERS_EMOJIS[index + 1])
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)]
        });
    }
};
