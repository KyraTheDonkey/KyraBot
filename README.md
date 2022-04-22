Uses node.js v16+
Can be installed anywhere, just google it :D

You need a config.json with 
{
    token: `API token here`,
    clientId: `Use dev tools to get the bot's ID`,
    guildId: `Any servers you want to register slash commands for (/hay)`
}

When cloned, you want to use `npm install` to get the node_modules needed.
Then to deploy the commands to 'servers' (called guilds) you do `node deploy-commands.js` (Which is just /hay)
The different guilds are stored in my config.json
And running the bot is just `node index.js`