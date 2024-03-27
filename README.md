## Introduction

It's going to take a while, but it's worth it.

## Installation

First, make sure you have `git clone` the project.
Then browse the folders in `bots/` to modify and create the necessary `.env` files. The `.env-ex` are there to help you.
Now go to Discord's [Developer Portal](https://discord.com/developers/applications). Create an equivalent number of bots to the number of folders in `bots/` by renaming them. Now look at the `main.js` of all the bots to see the permissions you need to grant them (Warning! They're almost all different).

## Startup

To start all bots, you can use the `pnpm run all` command at the project root.

## PS

I promise to provide an easier way in the future. You can contact me [here](mailto:pro.boudjemline@gmail.com) to help you implement it on your server.

## Dependencies

-   [Discord Developer Portal](https://discord.com/developers/)
-   [discord.js (Core)](https://discord.js.org/)
-   [deepl API (Translate)](https://developers.deepl.com/docs)
-   [pnpm](https://pnpm.io/)
