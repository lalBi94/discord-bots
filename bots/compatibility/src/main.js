/*/ **************************************************** /*/
/*/ Publish : 22/03/2024 (16:43:06)                      /*/
/*/ Author  : General Zod (lalBi94)                      /*/
/*/ Desc.   : Very simple bot featuring a bogus          /*/
/*/           compatibility game between server          /*/
/*/           members.                                   /*/
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
    console.log(`Compatibility run.`);
});

client.on(Events.MessageCreate, (msg) => {
    try {
        const splited = msg.content.split(" ");
        const author = msg.author.id;

        if (
            msg.content.slice(0, 22).trim() !== `<@${process.env.B_ID}>` ||
            !/<@[\w\d]+>/.test(`<@${splited[1]}>`) ||
            splited.length != 2
        ) {
            return null;
        }

        const perc = Math.floor(Math.random() * 100);

        msg.reply(
            `<@${author}> + ${splited[1]} = ${perc}% ${
                perc <= 10
                    ? "💔"
                    : perc <= 25
                    ? "❤️‍🩹"
                    : perc <= 50
                    ? "💙"
                    : perc <= 75
                    ? "💘"
                    : perc <= 90
                    ? "💗"
                    : "💍"
            }`
        );
    } catch (err) {
        console.error(err);
        return null;
    }
});
