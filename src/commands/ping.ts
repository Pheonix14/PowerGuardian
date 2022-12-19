import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import ms from "ms";
import cpuStat from "cpu-stat";
import * as os from 'os';
import embeds from "./../../config/embeds.json";

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
    .setTitle(`TrollMod Status:`)
.setDescription(`**🟢 Shard [0]:

📶 Latency: ${interaction.client.ws.ping}ms

🤖 Uptime: ${uptime_calc}

⚙️ RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

⛓️ CPU Usage: ${percent.toFixed(2)}%**`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();

	return interaction.editReply({embeds: [embed] });

   })
    
	},
};
