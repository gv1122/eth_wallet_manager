import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import ready from './listeners/ready';
import interaction from './listeners/interaction';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;

console.log('Bot is starting...');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

ready(client);
interaction(client);

client.login(token);
