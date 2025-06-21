import { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../types/command';
import { BANNER_URL } from '../constants/data';

export const Support: Command = {
    name: 'support',
    description: 'Redirect to discord to ask the team questions or report bugs',
    type: 1,

    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = {
            title: 'Support',
            description: 'For support, please join our discord and open a ticket in the #open-ticket channel',
            color: 16711680
        };

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel('Join Discord')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/invite/vdX5z2PznF')
        );

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [row]
        });
    }
};
