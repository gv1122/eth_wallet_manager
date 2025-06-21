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

export const PrimaryWallet: Button = {
    name: 'primary_wallet',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction) => {
        const embed = {
            title: 'Primary Wallet',
            description: 'To set a primary wallet, please connect your wallet via our dashboard.',
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel('Connect Wallet')
                .setStyle(ButtonStyle.Link)
                .setURL('https://sybulls-dashboard.vercel.app/')
        );

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [row]
        });
    }
};
