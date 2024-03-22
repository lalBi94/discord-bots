import {
    ChannelType,
    ActionRowBuilder,
    ButtonStyle,
    ButtonBuilder,
    EmbedBuilder,
    GuildChannelManager,
    VoiceState,
} from "discord.js";
import * as env from "dotenv";
env.config();

export default class Bilgewater {
    constructor() {}

    async haveParty(way, member) {
        try {
            const fullDefaultName = `${member.name}'s party`;
            let isPresent = false;
            let id = "0";

            way.cache.map((e) => {
                if (e.name === fullDefaultName) {
                    isPresent = true;
                    id = e.id;
                }
            });

            return { present: isPresent, id: id };
        } catch (err) {
            console.error(err);
            return { present: false, id: null };
        }
    }

    async createParty(channel, member) {
        try {
            const haveParty = await this.haveParty(channel, {
                name: member.name,
                voice: member.voice,
            });

            if (haveParty.present) {
                member.voice.setChannel(haveParty.id);
                return null;
            }

            const room = await channel.create({
                type: ChannelType.GuildVoice,
                name: `${member.name}'s party`,
                parent: process.env.PARENT_ID,
            });

            if (!room) {
                return null;
            }

            const embed = new EmbedBuilder()
                .setTitle(member.name)
                .setDescription(
                    "has created a vocal chanel.\nClick on the button above to join!"
                )
                .setThumbnail(member.ppUrl)
                .setColor("#000000");

            const roomLink = await room.createInvite();
            const joinBtn = new ButtonBuilder()
                .setLabel("Join now")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.gg/${roomLink.code}`);

            const row = new ActionRowBuilder().addComponents(joinBtn);
            const target_log = await channel.fetch("1220724362156441630");
            await target_log.send({ embeds: [embed], components: [row] });

            await member.voice.setChannel(room.id);
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
