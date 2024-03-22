/**
 * Head of the bot (manage translation)
 * @author lalBi94
 * @version 1
 */
export default class Frejlord {
    /**
     * @param {import("discord.js").Client} client Discord bot client.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Translate configuration: source=auto, destination=code
     * @param {import("discord.js").MessageReference} msg Data contains in the reply request
     * @param {string} code Country code like ["fr", "en", "fi", etc...]
     * @return {Promise<{}>}
     */
    async translate(msg, code) {
        try {
            const channel = await this.client.channels.fetch(msg.channelId);
            const message = await channel.messages.fetch(msg.messageId);

            const req = await fetch(process.env.DEEPL_LINK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `DeepL-Auth-Key ${process.env.DEEPL_TKN}`,
                },
                body: JSON.stringify({
                    text: [message.content],
                    target_lang: code,
                }),
            });

            return req.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
