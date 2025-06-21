import { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../types/command';
import { BANNER_URL } from '../constants/data';

export const Help: Command = {
    name: 'help',
    description: 'View the setup guide for new users or first time wallets',
    type: 1,

    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = {
            title: 'Getting Started',
            description:
                '**1.:** Register a wallet using /start\n\n**2.:** Fund your wallet by running /manage and selecting your wallet, then transfering funds to the address\n\n**3.:** Bridge funds to your desired chain(s) by running /manage and selecting "Bridge Funds"\n\n**4.:** Once funds are bridged (takes between 5 and 10 minutes), you can run /manage and\n\na. Trigger actions manually by selecting "Manually Farm"\nb. Start automation by selecting configure automation\n\n*If you need help, please join our discord and open a ticket in the #open-ticket channel*',
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
