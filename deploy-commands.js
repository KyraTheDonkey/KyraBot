const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const { clientId, kyrashideaway, nsfs, token } = require("./config.json");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands in Kyra's Hideaway.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const kyraData = await rest.put(
      Routes.applicationGuildCommands(clientId, kyrashideaway),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${kyraData.length} application (/) commands in Kyra's Hideaway.`,
    );

    console.log(
      `Started refreshing ${commands.length} application (/) commands in NSFS.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const nsfsData = await rest.put(
      Routes.applicationGuildCommands(clientId, nsfs),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${nsfsData.length} application (/) commands in NSFS.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
