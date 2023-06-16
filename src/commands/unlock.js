const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription(`unlock a lock channel`)
    .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to unlock'))
.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .setDMPermission(false),
	async execute(interaction, client) {

const channel = interaction.options.getChannel('channel') || interaction.channel;

const everyoneRole = interaction.guild.roles.cache.find(role => role.name === '@everyone');
    
const canSendMessages = channel.permissionsFor(everyoneRole).has(PermissionFlagsBits.SendMessages);
  
if (canSendMessages) {
      await interaction.editReply('This channel is already unlocked.');
      return;
    }

const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${channel} Is Unlocked Successfully ${emojis.unlock}`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();
    
    try {
      await channel.permissionOverwrites.create(interaction.guild.roles.everyone, { SendMessages: true });
      await interaction.editReply({embeds: [embed]});
    } catch (error) {
      console.error('Failed to unlock channel:', error);
      await interaction.editReply('An error occurred while unlocking the channel.');
    }
  },
};