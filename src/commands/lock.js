const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription(`lock a channel for everyone`)
    .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to lock'))
.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .setDMPermission(false),
	async execute(interaction, client) {

const channel = interaction.options.getChannel('channel') || interaction.channel;

const everyoneRole = interaction.guild.roles.cache.find(role => role.name === '@everyone');
    
const canSendMessages = channel.permissionsFor(everyoneRole).has(PermissionFlagsBits.SendMessages);
  
if (!canSendMessages) {
      await interaction.editReply('This channel is already locked.');
      return;
    }

const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${channel} Is Locked Successfully ${emojis.lock}`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();
    
    try {
      await channel.permissionOverwrites.create(interaction.guild.roles.everyone, { SendMessages: false });
      await interaction.editReply({embeds: [embed]});
    } catch (error) {
      console.error('Failed to lock channel:', error);
      await interaction.editReply('An error occurred while locking the channel.');
    }
  },
};