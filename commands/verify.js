const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { verifyChannel, generalChannel, rulesChannel, rolesChannel, introductionsChannel, welcomeRole, serverMemberRole, level0Role } = require('../config.json');

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
		if (!interaction.channel.name.match(/verification-\d*/)) {
			await interaction.reply("This is not a valid channel to use this command in!");
			return;
		}
		interaction.channel.messages.fetch()
		.then(async messages => {
			messages.reverse();
			var messageContents = [{name: `Group 1`, value: ""}];
			i = 0;
			messages.forEach(message => {
				var currentMessage = `${message.author}: ${message.cleanContent}\n`;
				if (currentMessage.length + messageContents[i].value.length >= 4096) {
					i++;
					messageContents[i] = {name: `Group ${i+1}`, value: ""};
				}
				messageContents[i].value += currentMessage;
			});
			
			messageContents.forEach(async message => {
				var embed = new EmbedBuilder()
				.setColor(0xDB96C8)
				.setAuthor({name: `${interaction.channel.name}`})
				.setTitle(`${target.username}`)
				.setThumbnail(`${target.displayAvatarURL()}`)
				.setDescription(`${message.value}`)
				.setFooter({text: `Verified by: ${interaction.member.user.username}`, iconURL: `${interaction.member.user.avatarURL()}`})
				.addFields(
					{ name: 'Verified Member', value: `${target.toString()}`, inline: true },
					{ name: 'Staff', value: `${interaction.member.user.toString()}`, inline: true },
				)
				.setTimestamp();
				await interaction.client.channels.cache.get(verifyChannel).send({embeds: [embed]})
			})
			
			interaction.guild.members.cache.get(target.id).roles.add(serverMemberRole);
			interaction.guild.members.cache.get(target.id).roles.add(level0Role);
			interaction.channel.delete();

			var welcomeMessage = `Welcome ${target.toString()} to ${interaction.guild.name}! We're happy to have you here :sparkles:\n\n` +

			`Make sure you read <#${rulesChannel}>, all the server's info is there too.\n` +
			`Use <#${rolesChannel}> to self-assign your roles.\n` +
			`Then you can introduce yourself in <#${introductionsChannel}>.\n` +
			`(<@&${welcomeRole}>)\n`;
			await interaction.client.channels.cache.get(generalChannel).send(welcomeMessage);

			await interaction.reply("Verification Success");
		})
		.catch(console.error);
	},
};