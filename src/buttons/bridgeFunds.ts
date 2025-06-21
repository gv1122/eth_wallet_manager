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

export const BridgeFunds: Button = {
    name: 'bridge',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        let balances = `Ethereum: 0\nBinance Smart Chain: 0\nPolygon: 0\nAvalanche: 0\nFantom: 0\nHarmony: 0\nxDai: 0\nArbitrum: 0\n`;
        const embed = {
            title: `🪙 Fund Wallet ${walletAddress} 🪙`,
            description: `Your wallet currently holds the following balances:\n\n${balances}\nThe recommended minimum balance per-chain is 0.1 ETH. Once funded on mainnet, use the "bridge funds" buttons below to transfer funds to the desired networks.\n\nOnce your wallet is funded and you've bridged to your target chains, use the "Manual Farm" or "Configure Automation" options to trigger transactions.`,
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
