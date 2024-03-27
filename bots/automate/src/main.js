/*/ **************************************************** /*/
/*/ Publish : 22/03/2024 (21:25:14)                      /*/
/*/ Author  : General Zod (lalBi94)                      /*/
/*/ Desc.   : He's the best friend of the whole of bots  /*/
/*/ **************************************************** /*/

import * as env from "dotenv";
import { Events, Client, GatewayIntentBits } from "discord.js";
env.config();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(process.env.B_TKN);
client.once(Events.ClientReady, (_) => {
    console.log(`Automate here but not here.`);
});

client.on(Events.MessageCreate, (msg) => {
    try {
        const splited = msg.content.split(" ");
    } catch (err) {
        console.error(err);
        return null;
    }
});
