const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription(`Configure bot's settings`)
.addSubcommand(subcommand =>
		subcommand
			.setName('modlogs')
			.setDescription('Set a channel for moderation logs')
			.addChannelOption(option =>
		option.setName('logging_channel')
			.setDescription('The channel for mod logs')))
.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDMPermission(false),
	async execute(interaction, client) {

const db = require("./../database/connect.js");

const settings = db.table(`guild_${interaction.guild.id}`);

if (interaction.options.getSubcommand() === 'modlogs') {
            const channel = interaction.options.getChannel('logging_channel');

await settings.set(`modlogs`, channel.id)

const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${emojis.tic} Successfully Set ModLogs Channel: ${channel}`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();

	return interaction.editReply({embeds: [embed] });
  
}
    
  },
};