const {
  Events,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const sqlite3 = require("sqlite3");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;
    switch (interaction.customId) {
      case 'createVerificationButton':
        var db = new sqlite3.Database("KyraBot.db", (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log(
            "Opened db for checking if the user already has a verification"
          );
        });
        db.all(
          `SELECT * FROM verificationRequests WHERE userID = ?`,
          [interaction.user.id],
          async (err, rows) => {
            if (err) {
              console.log(err.message);
              return;
            }
            if (rows.length > 0) {
              await interaction.reply({
                content: "You have a pending verification!",
                ephemeral: true,
              });
              return;
            }

            // There are no pending verifications
            const modal = new ModalBuilder()
              .setCustomId("verificationModal")
              .setTitle("Verification");

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

            const hobbyInput = new TextInputBuilder()
              .setCustomId("hobbyInput")
              .setLabel("What hobbies do you have?")
              // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Paragraph);

            const furryInput = new TextInputBuilder()
              .setCustomId("furryInput")
              .setLabel("What does being a furry mean to you?")
              // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Paragraph);

            const joinReasonInput = new TextInputBuilder()
              .setCustomId("joinReasonInput")
              .setLabel("Why are you interested in NSFS?")
              // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Paragraph);

            const fursonaInput = new TextInputBuilder()
              .setCustomId("fursonaInput")
              .setLabel("Do you have a fursona?")
              // Paragraph means multiple lines of text.
              .setStyle(TextInputStyle.Paragraph);

            // An action row only holds one text input,
            // so you need one action row per text input.
            const firstActionRow = new ActionRowBuilder().addComponents(
              joinReasonInput
            );
            const secondActionRow = new ActionRowBuilder().addComponents(
              ageInput
            );
            const thirdActionRow = new ActionRowBuilder().addComponents(
              hobbyInput
            );
            const fourthActionRow = new ActionRowBuilder().addComponents(
              furryInput
            );
            const fifthActionRow = new ActionRowBuilder().addComponents(
              fursonaInput
            );

            modal.addComponents(
              firstActionRow,
              secondActionRow,
              thirdActionRow,
              fourthActionRow,
              fifthActionRow
            );

            await interaction.showModal(modal);
          }
        );
        db.close();
        break;
      case 'deleteVerificationButton':
        var db = new sqlite3.Database("KyraBot.db", (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log("Opened db for trying to delete a verification");
        });
        db.all(
          `SELECT * FROM verificationRequests WHERE userID = ?`,
          [interaction.user.id],
          async (err, rows) => {
            if (err) {
              console.log(err.message);
              return;
            }
            if (rows.length == 0) {
              await interaction.reply({
                content: "You don't have a verification to delete!",
                ephemeral: true,
              });
              return;
            }
            db.run(
              `DELETE FROM verificationRequests WHERE userID = ?`,
              [interaction.user.id],
              async (err) => {
                if (err) {
                  console.log(err.message);
                  await interaction.reply({
                    content: "Something went wrong trying to delete your verification",
                    ephemeral: true,
                  });
                  return;
                }
                await interaction.reply({
                  content: "Verification Removed",
                  ephemeral: true,
                })
              }
            );
          }
        );

        db.close();
        break;
    }
  },
};
