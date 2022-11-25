const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carrots')
		.setDescription('Eats your carrots'),
	async execute(interaction) {
		await interaction.reply('Orange food!');
	},
};