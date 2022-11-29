const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { verifyChannel, roleToAdd } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verifies the user')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to verify')
				.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		interaction.channel.messages.fetch()
		.then(async messages => {
			messages.reverse();
			var messageContents = [{name: `Group 1`, value: ""}];
			i = 0;
			messages.forEach(message => {
				var currentMessage = `${message.author}: ${message.cleanContent}\n`;
				if (currentMessage.length + messageContents[i].value.length >= 128) {
					i++;
					messageContents[i] = {name: `Group ${i+1}`, value: ""};
				}
				messageContents[i].value += currentMessage;
			});
			console.log(messageContents);
			
			var embeds = [];
			messageContents.forEach(async message => {
				var embed = new EmbedBuilder()
				.setColor(0xDB96C8)
				.setAuthor({name: `${interaction.channel.name}`})
				.setTitle(`${target.username}`)
				.setThumbnail(`${target.avatarURL()}`)
				.setDescription(`${message.value}`)
				.setFooter({text: `Verified by: ${interaction.member}`})
				.setTimestamp();
				embeds.push(embed);
			})
			
			embedsLen = embeds.length;
			console.log(`embedsLen is ${embedsLen}`);
			var FullTimes = embedsLen / 10;
			for (i = 0; i < FullTimes; i++) {
				console.log(`Running time ${i}`)
				await interaction.client.channels.cache.get(verifyChannel).send({embeds: embeds.slice(i*10, (i+1)*10)})
			}
			
			interaction.guild.members.cache.get(target.id).roles.add(roleToAdd);

			await interaction.reply("Verification Success");
		})
		.catch(console.error);
	},
};