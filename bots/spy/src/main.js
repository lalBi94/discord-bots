/*/ **************************************************** /*/
/*/ Publish : 22/03/2024 (21:25:14)                      /*/
/*/ Author  : General Zod (lalBi94)                      /*/
/*/ Desc.   : Spy someone                                /*/
/*/ **************************************************** /*/

import * as env from "dotenv";
import { Events, Client, GatewayIntentBits } from "discord.js";
import * as prelude from "./prelude.js";
prelude.default().then();
env.config();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.login(process.env.B_TKN);
client.once(Events.ClientReady, (_) => {
    console.log(`Spy run`);
});
