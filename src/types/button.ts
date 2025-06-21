import {
    ButtonInteraction,
    ChatInputCommandInteraction,
    Client,
    CommandInteraction,
    MessageComponentInteraction
} from 'discord.js';

export interface Button {
    name: string;

    run: (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress?: string) => void;
}
