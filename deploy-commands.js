const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, kyrashideaway, fluffcafe, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('hay').setDescription('Eats your hay'),
	new SlashCommandBuilder().setName('carrots').setDescription('Eats your carrots'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, kyrashideaway), { body: commands })
	.then(() => console.log('Successfully registered application commands to Kyra\'s Hideaway.'))
	.catch(console.error);

    rest.put(Routes.applicationGuildCommands(clientId, fluffcafe), { body: commands })
	.then(() => console.log('Successfully registered application commands to Fluff Cafe.'))
	.catch(console.error);