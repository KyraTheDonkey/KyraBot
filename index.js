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
        console.log("Message received \"" + message.content + "\"");
        if (message.content.match(/([H|h][a]+y)|(H[A]+Y)/)) {
            console.log("found hay");
            await replyHay(message);
        }
    } 
    
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'hay') {
		await interaction.reply('Monch monch!');
	} 
});

async function replyHay(message) {
    var num = Math.floor(Math.random() * 6);
    if (num === 0) {
        await message.reply("Fooood!")
    }
    else if (num === 1) {
        await message.reply("Yummy!")
    }
    else if (num === 2) {
        await message.reply("*nuzzles neck for the hay*")
    }
    else if (num === 3) {
        await message.reply("*tail flicking*")
    }
    else if (num === 4) {
        await message.reply("*nimbly steals the hay*")
    }
    else if (num === 5) { 
        await message.reply("You suddenly feel a donkey breathing down your neck.")
    }
}