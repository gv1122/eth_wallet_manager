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

export const ConfigureAutomation: Button = {
    name: 'configure',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `🔧 Configure Automation 🔧`,
            description: `Use the commands below to configure your automation settings:\n\n🤖 Enable Automation\nEnable/disable automation activity on a specific chain.\n\n🤖 Disable Automation\nDisable automation activity on a specific chain.`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const buttons = [
            new ButtonBuilder()
                .setCustomId(`enable_automation-${walletAddress}`)
                .setLabel('🤖 Enable Automation')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`disable_automation-${walletAddress}`)
                .setLabel('🤖 Disable Automation')
                .setStyle(ButtonStyle.Primary),
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
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[0], buttons[1]),
                new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[2], buttons[3])
            ]
        });
    }
};

export const EnableAutomation: Button = {
    name: 'enable_automation',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `🔧 Configure Automation 🔧`,
            description: `Please select the chain you would like to enable automation for`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        // need to add the rest of the buttons for chains

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

export const DisableAutomation: Button = {
    name: 'disable_automation',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const embed = {
            title: `🔧 Configure Automation 🔧`,
            description: `Please select the chain you would like to disable automation for`,
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        // need to add the rest of the buttons for chains

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