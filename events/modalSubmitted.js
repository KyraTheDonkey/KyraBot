const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        const sqlite3 = require('sqlite3');
        var db = new sqlite3.Database("KyraBot.db", (err) => {
        	if (err) {
        		console.error(err.message);
        	}
        	console.log("Opened db for submitting a modal");
        });
        console.log(interaction);

        const server = interaction.fields.getTextInputValue('serverFindInput');
	    const age = interaction.fields.getTextInputValue('ageInput');
        db.run(`INSERT INTO verificationRequests(userID, serverLocation, age) VALUES(?, ?, ?)`, [interaction.user.id, server, age], async (err) => {
            if (err) {
                console.log(err.message);
                if (err.errno == 19) {
                    await interaction.reply("You've already made a request!");
                }
                return;
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            await interaction.reply("Verification submitted successfully!");
        })
        db.close();
    },
};