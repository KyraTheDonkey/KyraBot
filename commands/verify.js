const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies the user'),
	async execute(interaction) {
		await interaction.reply('Weeeeeee');
	},
};