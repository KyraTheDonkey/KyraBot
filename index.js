// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

client.on('messageCreate', async message => {
    if (!message.author.bot) {
        console.log("Message received \"" + message.content + "\"");
        var matchHay = message.content.match(/([H|h][a]+y)|(H[A]+Y)/);
        var matchCarrot = message.content.match(/[C|c]arrot[s]?/);
        if (matchHay && matchCarrot) {
            console.log("found feast");
            await replyHayAndCarrots(message);
        } else if (matchHay) {
            console.log("found hay");
            await replyHay(message);
        } else if (matchCarrot) {
            console.log("found carrots");
            await replyCarrots(message);
        }
    } 
    
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'hay') {
		await interaction.reply('Monch monch!');
	} else if (commandName === 'carrots') {
        await interaction.reply("Orange food!");
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

async function replyCarrots(message) {
    var num = Math.floor(Math.random() * 4);
    if (num === 0) {
        await message.reply("Oooooh.")
    }
    else if (num === 1) {
        await message.reply("Orange food!")
    }
    else if (num === 2) {
        await message.reply("*Noms it from your hand*")
    }
    else if (num === 3) {
        await message.reply("Crunchy.")
    }
}

async function replyHayAndCarrots(message) {
    var num = Math.floor(Math.random() * 4);
    if (num === 0) {
        await message.reply("A FEAST!")
    }
    else if (num === 1) {
        await message.reply("*You find the life squished out of you as the bot give you a super tight hug*")
    }
    else if (num === 2) {
        await message.reply("*The bot goes into shutdown cause you gave it so much food (not really)*")
    }
    else if (num === 3) {
        await message.reply("Bestest day EVAAAAR")
    }
}