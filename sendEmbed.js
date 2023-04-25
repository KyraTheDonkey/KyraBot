const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require(
  "discord.js",
);

module.exports = (client, channel) => {
  console.log(channel);

  var embed = new EmbedBuilder()
    .setColor(0xdb96c8)
    .setTitle(`Verification`)
    .setDescription(
      `Hello, would you like to verify? We have a lot of stuff for you to do!`,
    );

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("createVerificationButton")
      .setLabel("Start Verification")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("deleteVerificationButton")
      .setLabel("Remove Verification")
      .setStyle(ButtonStyle.Danger),
  );

  client.channels.cache.get(channel).send({
    embeds: [embed],
    components: [buttons],
  });
};
