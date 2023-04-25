const {
  Events,
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const { pendingVerificationChannel } = require("../config.json");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "verificationModal") {
      const sqlite3 = require("sqlite3");
      var db = new sqlite3.Database("KyraBot.db", (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Opened db for submitting a modal");
      });
      // console.log(interaction);

      const {
        ageInput,
        hobbyInput,
        furryInput,
        joinReasonInput,
        fursonaInput,
      } = getInfoFromModal(interaction);
      // serverLocation text,
      // age integer,
      // hobby text,
      // furry text,
      // joinReason text,
      // fursona text
      db.run(
        `INSERT INTO verificationRequests(userID, serverLocation, age, hobby, furry, joinReason, fursona) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [
          interaction.user.id,
          null,
          ageInput,
          hobbyInput,
          furryInput,
          joinReasonInput,
          fursonaInput,
        ],
        async (err) => {
          if (err) {
            console.log(err.message);
            if (err.errno == 19) {
              await interaction.reply({
                content: "You've already made a request!",
                ephemeral: true,
              });
            }
            return;
          }

          const embed = createEmbed(interaction);

          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("acceptVerification")
              .setLabel("Accept")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId("declineVerification")
              .setLabel("Decline")
              .setStyle(ButtonStyle.Danger),
          );

          let result = await interaction.client.channels.cache
            .get(pendingVerificationChannel)
            .send({ embeds: [embed], components: [buttons] });
          console.log(result.id);

          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          await interaction.reply({
            content: "Verification submitted successfully!",
            ephemeral: true,
          });
        },
      );
      db.close();
    }
  },
};

const getInfoFromModal = (interaction) => {
  const ageInput = interaction.fields.getTextInputValue("ageInput");
  const hobbyInput = interaction.fields.getTextInputValue("hobbyInput");
  const furryInput = interaction.fields.getTextInputValue("furryInput");
  const joinReasonInput = interaction.fields.getTextInputValue(
    "joinReasonInput",
  );
  const fursonaInput = interaction.fields.getTextInputValue("fursonaInput");
  return { ageInput, hobbyInput, furryInput, joinReasonInput, fursonaInput };
};

const createEmbed = (interaction) => {
  const { ageInput, hobbyInput, furryInput, joinReasonInput, fursonaInput } =
    getInfoFromModal(interaction);

  var embed = new EmbedBuilder()
    .setColor(0xdb96c8)
    .setAuthor({ name: `${interaction.user.username}` })
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .addFields(
      { name: "How old are you?", value: ageInput },
      { name: "What hobbies do you have?", value: hobbyInput },
      { name: "What does being a furry mean to you?", value: furryInput },
      { name: "Why are you interested in NSFS?", value: joinReasonInput },
      { name: "Do you have a fursona?", value: fursonaInput },
    )
    .setTimestamp();

  return embed;
};
