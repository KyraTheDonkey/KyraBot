// Require the necessary discord.js classes
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Setting up the terminal in/out for the bot
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

// Set up a database for use
const sqlite3 = require('sqlite3');
var db = new sqlite3.Database("KyraBot.db", (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Opened db");
	db.run(`CREATE TABLE IF NOT EXISTS verificationRequests(
		userID integer PRIMARY KEY,
		serverLocation text,
		age integer
		)`, (err) => {
			if (err) {
				console.error(err.message);
			}
			console.log("Successfully ensured the db exists");
		});
});

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

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

/*
* Here I try to write some terminal commands so I can control my bot without needing to interact with it.
*/
rl.on('line', (input) => {
	if (input.match(/s(top)?/)) {
		rl.question('Are you sure you want to exit? ', (answer) => {
			if (answer.match(/^y(es)?$/i)) {
				rl.close();
			}
		});
	}
});

rl.on('SIGINT', () => {
	rl.question('Are you sure you want to exit? ', (answer) => {
	  	if (answer.match(/^y(es)?$/i)) {
			rl.close();
	  	}
	});
});

rl.on('close', () => {
	client.destroy();
	db.close();
});