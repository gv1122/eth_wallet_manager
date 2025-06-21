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
import { fetchTransactionsByWalletId } from '../mongo/retrieve';

export const Farm: Button = {
    // needs to stay like this
    name: 'farm',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `Farm`,
            description: `Please select a chain you would like to manually farm on`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        // need to add the rest of the buttons

        const buttons = [
            new ButtonBuilder()
                .setCustomId(`select-${walletAddress}`)
                .setLabel('🔄 Select Wallet')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`wallet-${walletAddress}`)
                .setLabel('⚙️ Manage Wallet')
                .setStyle(ButtonStyle.Primary)
        ];

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[0], buttons[1])]
        });
    }
};
