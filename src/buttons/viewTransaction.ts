import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Client,
    CommandInteraction,
    ComponentType
} from 'discord.js';
import moment from 'moment-timezone';

import { Button } from '../types/button';
import { BANNER_URL, NUMBERS_EMOJIS } from '../constants/data';
import { fetchTransactionsByWalletId } from '../mongo/retrieve';

export const ViewTransaction: Button = {
    name: 'automation',

    run: async (client: Client, interaction: ButtonInteraction | CommandInteraction, walletAddress: string) => {
        const txs = await fetchTransactionsByWalletId(/* parseInt(interaction.user.id)*/ 5155646664);

        if (txs.length === 0) {
            const embed = {
                title: `📆 Automated Activity`,
                description: `No scheduled transactions found for wallet: \`${walletAddress}\``,
                color: 16711680,
                image: {
                    url: BANNER_URL
                }
            };

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

            return;
        } else {
            let page = 0;
            let pages = [];
            let current = '';

            for (let transaction of txs) {
                const time = new Date(transaction.startTime);
                const myTimezone = 'America/Toronto';
                const myDatetimeFormat = 'YYYY-MM-DD hh:mm:ssa z';
                const myDatetimeString = moment(time).tz(myTimezone).format(myDatetimeFormat);

                if (time > new Date()) continue;

                if (page > 7) {
                    page = 0;
                    pages.push(current);
                    current = '';
                } else {
                    current += `🕛 ${myDatetimeString}\nExecuting a ${transaction.actionName} on ${transaction.chainName}\n\n`;
                    page++;
                }
            }

            if (current !== '') pages.push(current);
            page = 0;

            const embed = {
                title: `📆 Automated Activity`,
                description: pages[page],
                color: 16711680,
                image: {
                    url: BANNER_URL
                }
            };

            const message = await interaction.followUp({
                embeds: [embed],
                components: [
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        new ButtonBuilder()
                            .setCustomId(`previous_page`)
                            .setLabel('⬅️ Previous Page')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === 0),
                        new ButtonBuilder()
                            .setCustomId(`next_page`)
                            .setLabel('➡️ Next Page')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === pages.length - 1)
                    )
                ]
            });

            const collector = message.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 15000
            });

            collector.on('collect', async i => {
                await i.deferUpdate();

                if (i.user.id === interaction.user.id) {
                    if (i.customId === 'previous_page') {
                        if (page > 0) {
                            page--;
                        } else {
                            return;
                        }
                    } else if (i.customId === 'next_page') {
                        if (page < pages.length - 1) {
                            page++;
                        } else {
                            return;
                        }
                    }

                    console.log('page: ', page);
                    message.edit({
                        embeds: [
                            {
                                title: `📆 Automated Activity`,
                                description: pages[page],
                                color: 16711680,
                                image: {
                                    url: BANNER_URL
                                }
                            }
                        ],
                        components: [
                            new ActionRowBuilder<ButtonBuilder>().addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`previous_page`)
                                    .setLabel('⬅️ Previous Page')
                                    .setStyle(ButtonStyle.Primary)
                                    .setDisabled(page === 0),
                                new ButtonBuilder()
                                    .setCustomId(`next_page`)
                                    .setLabel('➡️ Next Page')
                                    .setStyle(ButtonStyle.Primary)
                                    .setDisabled(page === pages.length - 1)
                            )
                        ]
                    });
                }
            });
        }
    }
};
