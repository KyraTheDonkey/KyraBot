// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILDS', 'GUILD_MESSAGES'] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

client.on('messageCreate', async message => {
    if (!message.author.bot) {
        console.log("message received \"" + message.content + "\"");
        if (message.content.match(/([H|h][a]+y)|(H[A]+Y)/)) {
            console.log("found hay");
            await message.reply("Haaaay");
        }
    } else {
        console.log("not so fast");
    }
    
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'hay') {
		await interaction.reply('Monch monch!');
	} 
});