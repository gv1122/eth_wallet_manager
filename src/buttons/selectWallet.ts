import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Client,
    CommandInteraction
} from 'discord.js';

import { Button } from '../types/button';
import { BANNER_URL, NUMBERS_EMOJIS } from '../constants/data';
import { fetchWalletById } from '../mongo/retrieve';
import { PrimaryWallet } from './primaryWallet';

export const SelectWallet: Button = {
    name: 'select_wallet',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction) => {
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
