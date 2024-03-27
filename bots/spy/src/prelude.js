import fs from "fs";
import { REST, Routes } from "discord.js";
import path from "path";
import * as env from "dotenv";
env.config();
import { URL } from "url";
import { readdir } from "fs/promises";

export default async () => {
    try {
        const __dirname = new URL(".", import.meta.url).pathname;
        const commands = [];
        const foldersPath = path.join(__dirname, "commands");
        const commandFolders = await readdir(foldersPath);
        const rest = new REST().setToken(process.env.B_TKN);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);

            const commandFiles = (await readdir(commandsPath)).filter((file) =>
                file.endsWith(".js")
            );

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = await import(filePath);

                if (command.default.data && command.default.execute) {
                    commands.push(command.default.data);
                } else {
                    console.log(
                        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                    );
                }
            }
        }

        const data = await rest.put(
            Routes.applicationGuildCommands(
                process.env.B_ID,
                process.env.B_S_ID
            ),
            { body: commands }
        );

        console.log(`Spy loaded ${data.length} commands.`);
    } catch (err) {
        console.error(err);
    }
};
