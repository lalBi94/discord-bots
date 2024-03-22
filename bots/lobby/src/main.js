/*/ ******************************************************** /*/
/*/ Publish : 21/03/2024 (16:47:14)                          /*/
/*/ Author  : General Zod (lalBi94)                          /*/
/*/ Desc.   : Bot for creating voice channels by joining     /*/
/*/           a specific voice. Vocals are created           /*/
/*/           in a specific category too. A command, "boom"  /*/
/*/           by default, deletes all vocals in THE          /*/
/*/           category. If a player who has already created  /*/
/*/           a channel joins THE vocal channel, he'll be    /*/
/*/           redirected to his vocal channel.               /*/
/*/ ******************************************************** /*/

import { Events, Client, GatewayIntentBits } from "discord.js";
import Bilgewater from "./bilgewater/bilgewater.js";
import * as env from "dotenv";

env.config();
const bilgewater = new Bilgewater();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

client.login(process.env.B_TKN);
client.once(Events.ClientReady, (_) => {
    console.log(`Lobby run.`);
});

client.on(Events.VoiceStateUpdate, (o, n) => {
    try {
        if (n.channelId !== process.env.CHANNEL_ID) {
            return null;
        }

        bilgewater.createParty(n.guild.channels, {
            id: n.member.id,
            name: n.member.displayName,
            voice: n.member.voice,
            ppUrl: n.member.user.avatarURL({ dynamic: true, size: 4096 }),
        });
    } catch (err) {
        console.error(err);
        return null;
    }
});

client.on(Events.MessageCreate, (msg) => {
    let splited = msg.content.split(" ");

    if (
        (msg.author.id !== process.env.O_ID &&
            msg.author.id !== process.env.O2_ID) ||
        splited.length !== 2 ||
        splited[1] !== process.env.COMMAND1
    ) {
        return null;
    }

    const allVoiceChannels = msg.guild.channels.cache.filter(
        (c) => c.parentId === process.env.PARENT_ID
    );

    allVoiceChannels.map((e) => {
        e.guild.channels.delete(e.id);
    });

    msg.reply("C'est fait maitre :)");
});
