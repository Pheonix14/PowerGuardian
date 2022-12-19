import { Events } from "discord.js";

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`➥ Logged in as ${client.user.tag}`);
    console.log(`Now Bot Ready To Interact With Discord`)
	},
};