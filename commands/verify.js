const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies the user'),
	async execute(interaction) {
		interaction.channel.messages.fetch()
		.then(async messages => {
			messages.reverse();
			var messageContents = [{name: `Group 1`, value: ""}];
			i = 0;
			messages.forEach(message => {
				var currentMessage = `${message.author}: ${message.cleanContent}\n`;
				if (currentMessage.length + messageContents[i].value.length >= 1024) {
					i++;
					messageContents[i] = {name: `Group ${i+1}`, value: ""};
				}
				messageContents[i].value += currentMessage;
			});
			console.log(messageContents);

			var embed = new EmbedBuilder()
				.setColor(0xDB96C8)
				.setTitle(interaction.channel.name)
				.setDescription(`Verified by: ${interaction.member.toString()}`)
				.addFields(messageContents)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		})
		.catch(console.error);
	},
};