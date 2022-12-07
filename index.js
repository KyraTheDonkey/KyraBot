// Require the necessary discord.js classes
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Login to Discord with your client's token
client.login(token);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

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