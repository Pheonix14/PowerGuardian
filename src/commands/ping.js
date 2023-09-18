const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const cpuStat = require("cpu-stat");
const os = require('node:os');
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {

const db = require("./../database/connect.js");

// Function to estimate the ping to the Quick.db database
async function estimateDatabasePing() {
  const start = Date.now();
  try {
    // Execute a simple operation, like fetching a value
    await db.get('example_key');
    const end = Date.now();
    const ping = end - start;
    return ping;
  } catch (error) {
    console.error('Error estimating database ping:', error);
    return -1; // Return -1 or another value to indicate an error
  }
}

// Call the function to estimate the database ping and use it outside
    
let cpuLol;
  cpuStat.usagePercent(function(err, percent ) {
      if (err) {
          return console.log(err);
      }

estimateDatabasePing()
  .then(ping => {
    if (ping !== -1) {
    
    const uptime = interaction.client.uptime;
    
  let uptime_calc = ms(uptime);
    
 const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**PowerGuardian Status:**`)
.setDescription(`**${emojis.online} Shard [${interaction.guild.shardId}]:

${emojis.latency} Websocket Latency: ${interaction.client.ws.ping}ms

${emojis.database} Database Latency: ${ping}ms

${emojis.uptime} Uptime: ${uptime_calc}

${emojis.memory} RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

${emojis.cpu} CPU Usage: ${percent.toFixed(2)}%**`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();

	return interaction.editReply({embeds: [embed] });

} else {
      console.error('Database ping estimation failed.');
    }
  });
      
   })
    
	},
};
