/*/ ****************************************************** /*/
/*/ Publish : 19/03/2024 (09:35:50)                        /*/
/*/ Author  : General Zod (lalBi94)                        /*/
/*/ Desc.   : Bot using Deepl's API to translate messages  /*/
/*/           by mentioning the bot and then adding        /*/
/*/           the destination country code.                /*/
/*/ ****************************************************** /*/

import * as env from "dotenv";
import Frejlord from "./frejlord/frejlord.js";
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

const frejlord = new Frejlord(client);

client.login(process.env.B_TKN);
client.once(Events.ClientReady, (_) => {
    console.log(`Translator run.`);
});

client.on(Events.MessageCreate, (msg) => {
    try {
        let splited = msg.content.split(" ");

        if (
            msg.content.slice(0, 22).trim() !== `<@${process.env.B_ID}>` ||
            splited.length != 2 ||
            splited[1].length != 2 ||
            !msg.reference
        ) {
            return null;
        }

        frejlord
            .translate(msg.reference, splited[1].toUpperCase())
            .then((res) => {
                if (!res) return;

                console.log(
                    `$> [${new Date(msg.createdTimestamp).toLocaleDateString(
                        "fr-FR"
                    )}:${msg.author.id}] request a translation: ${
                        msg.content
                    } -> ${res.translations[0].text}`
                );

                msg.reply(
                    `\`[from ${res.translations[0].detected_source_language}]\`\n ${res.translations[0].text} !`
                );
            })
            .catch((err) => {
                console.error(err);
                msg.reply("Invalid country code.");
                return null;
            });
    } catch (err) {
        console.error(err);
        return null;
    }
});
