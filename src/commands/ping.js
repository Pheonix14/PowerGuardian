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
    
let cpuLol;
  cpuStat.usagePercent(function(err, percent ) {
      if (err) {
          return console.log(err);
      }

    const uptime = interaction.client.uptime;

  let uptime_calc = ms(uptime);
    
 const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**TrollMod Status:**`)
.setDescription(`**${emojis.online} Shard [${interaction.guild.shardId}]:

${emojis.latency} Latency: ${interaction.client.ws.ping}ms

${emojis.uptime} Uptime: ${uptime_calc}

${emojis.memory} RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

${emojis.cpu} CPU Usage: ${percent.toFixed(2)}%**`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();

	return interaction.editReply({embeds: [embed] });

   })
    
	},
};
