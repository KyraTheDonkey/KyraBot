const { Events } = require('discord.js');
const { level0Role, level5Role } = require('../config.json');


module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(oldMember, newMember) {
        if(!oldMember.roles.cache.has(level5Role) && newMember.roles.cache.has(level5Role)) {
            console.log("Removed level 0 role from %s", newMember.user.username);
            newMember.roles.remove(level0Role);
        }
    },
};