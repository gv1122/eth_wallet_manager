import { CommandInteraction, Client, Interaction, ButtonInteraction } from 'discord.js';
import { Commands } from '../constants/commands';
import { Buttons } from '../constants/buttons';

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        } else if (interaction.isButton()) {
            await handleButton(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({
            content: 'An error occurred while executing this command!'
        });

        return;
    }

    await interaction.deferReply();
    slashCommand.run(client, interaction);
};

const handleButton = async (client: Client, interaction: ButtonInteraction): Promise<void> => {
    const button = Buttons.find(c => c.name.startsWith(interaction.customId.split('-')[0]));
    console.log(interaction.customId.split('-'));

    // for pagination, in which case we dont want a message sent
    if (interaction.customId.startsWith('next_page') || interaction.customId.startsWith('previous_page')) {
        console.log('returning early');
        return;
    }

    await interaction.deferReply();

    if (!button) {
        interaction.followUp({
            content: 'An error occurred while executing this command!'
        });

        return;
    }

    if (
        button.name.startsWith('wallet') ||
        button.name.startsWith('automation') ||
        button.name.startsWith('activity') ||
        button.name.startsWith('bridge') ||
        button.name.startsWith('farm') ||
        button.name.startsWith('configure') ||
        button.name.startsWith('enable_automation') ||
        button.name.startsWith('disable_automation') ||
        button.name.startsWith('configure_wallet') ||
        button.name.startsWith('view_private_key') ||
        button.name.startsWith('rename_wallet') ||
        button.name.startsWith('toggle_automation')
    ) {
        button.run(client, interaction, interaction.customId.split('-')[1]);
    } else {
        button.run(client, interaction);
    }
};
