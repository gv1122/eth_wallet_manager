import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../types/command';

export const Hello: Command = {
    name: 'hello',
    description: 'Returns a greeting',
    type: 1,

    run: async (client: Client, interaction: CommandInteraction) => {
        const content = 'Hello there!';

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
