const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hay")
    .setDescription("Eats your hay"),
  async execute(interaction) {
    await interaction.reply("Monch monch");
  },
};
