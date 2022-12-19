import { REST, Routes } from "discord.js";
import { clientId, guildId, token } from "./../config/config.json";
import * as fs from 'fs';

const commands = [];

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log(`Started Refreshing ${commands.length} Application (/) Commands...`);
		
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`➥ Successfully Reloaded ${data.length} Application (/) Commands.`);
	} catch (error) {
	
		console.error(error);
	}
})();