const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modaltest")
    .setDescription("It's Modal time!"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("testModal")
      .setTitle("Test Modal");

    // Create the text input components
    const serverFindInput = new TextInputBuilder()
      .setCustomId("serverFindInput")
      // The label is the prompt the user sees for this input
      .setLabel("How did you find NSFS?")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Paragraph);

    const ageInput = new TextInputBuilder()
      .setCustomId("ageInput")
      .setLabel("How old are you?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Short);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(
      serverFindInput,
    );
    const secondActionRow = new ActionRowBuilder().addComponents(ageInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },
};
