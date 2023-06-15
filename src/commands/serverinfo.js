const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Some information about the server')
  .setDMPermission(false),
	async execute(interaction, client) {

const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const totalMembers = guild.members.cache.size;
    const onlineMembers = guild.members.cache.filter(
      (member) => member.presence?.status !== 'offline'
    ).size;
    const textChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_TEXT'
    ).size;
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === 'GUILD_VOICE'
    ).size;
    const serverCreationDate = guild.createdAt.toDateString();
    const botCount = guild.members.cache.filter((member) => member.user.bot).size;
    let verificationLevel = guild.verificationLevel;

    if (verificationLevel === 0) verificationLevel = 'None';
    if (verificationLevel === 1) verificationLevel = 'Low';
    if (verificationLevel === 2) verificationLevel = 'Medium';
    if (verificationLevel === 3) verificationLevel = 'High';
    if (verificationLevel === 4) verificationLevel = 'Highest';
      
    const owner = await interaction.client.users.fetch(guild.ownerId);
    const ownerUsername = owner.username;
    const ownerTag = `${ownerUsername}#${owner.discriminator}`;
    const roleCount = guild.roles.cache.size;
    const isCommunityServer = guild.features.includes('COMMUNITY');

    const communityIndicator = isCommunityServer ? `${emojis.tic}` : `${emojis.cross}`;

const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**Server's Info**`)
  .setThumbnail(guild.iconURL())
.setDescription(`**${emojis.server} Server Name: ${guild.name}

${emojis.owner} Owner: ${ownerTag}

${emojis.member} Total Members: ${totalMembers}

${emojis.bot} Bot Count: ${botCount}

${emojis.member} Online Members: ${onlineMembers}

${emojis.channel} Text Channels: ${textChannels}

${emojis.voice} Voice Channels: ${voiceChannels}

${emojis.role} Role Count: ${roleCount}

${emojis.verify} Verification Level: ${verificationLevel}

${emojis.community} Community Server: ${communityIndicator}

${emojis.birthday} Server Creation Date: ${serverCreationDate}
**`)
  .setFooter({text: `${embeds.footer}`})
   .setTimestamp();

return interaction.editReply({embeds: [embed]})
  
	},
};
