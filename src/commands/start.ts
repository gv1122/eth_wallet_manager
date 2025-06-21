import { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../types/command';
import { BANNER_URL } from '../constants/data';

export const Start: Command = {
    name: 'start',
    description: 'Get started with the bot, activate new wallets!',
    type: 1,
	
    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = {
            title: '🤖 Welcome to Sybulls',
            description:
                'Sybulls is an airdrop automation suite, designed to autonomously manage airdrop-farming transactions across a wide variety of promising DeFi projects. With Bullbot, gaining eligibility for airdrops is as simple as activating your wallet and letting the bot do the rest.\n\nTo get started, please utilize the commands below to activate paid wallets or proceed with the free trial. Please note, the free trial is limited to 1 wallet per-user.',
            color: 16711680,
            image: {
                url: BANNER_URL
            }
        };

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('primary_wallet')
                .setLabel('Set Primary Wallet')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('select_wallet').setLabel('Select Wallet').setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel('View Documentation')
                .setStyle(ButtonStyle.Link)
                .setURL('https://sybulls.gitbook.io')
        );

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [row]
        });
    }
};
