import { token } from "./../config/config.json";
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import * as fs from 'fs';
import * as path from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Events Loader
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));
console.log(`Loading Events...`);

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
  console.log(`➥ Loaded ${event.name} Event`)
}

// Commands Loader
client.commands = new Collection();

console.log(`Loading Commands...`);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
client.commands.set(command.data.name, command);
  console.log(`➥ Loaded ${command.data.name} Command`)
}

["commands"]
    .filter(Boolean)
    .forEach(h => {
      console.log(`Loading Handlers...`);
        require(`./handlers/${h}`)(client);
      console.log(`➥ Loaded ${h} Handler`);
    });


console.log(`Logging Into To The Bot...`)

client.login(token);