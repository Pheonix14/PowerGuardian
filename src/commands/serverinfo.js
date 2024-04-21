const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Some information about the server")
    .setDMPermission(false),
  async execute(interaction, client) {
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const totalMembers = guild.members.cache.size;
    const onlineMembers = guild.members.cache.filter(
      (member) => member.presence?.status !== "offline",
    ).size;
    const textChannels = guild.channels.cache.filter(
      (channel) => channel.type === "GUILD_TEXT",
    ).size;
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === "GUILD_VOICE",
    ).size;
    const serverCreationDate = guild.createdAt.toDateString();
    const botCount = guild.members.cache.filter(
      (member) => member.user.bot,
    ).size;
    let verificationLevel = guild.verificationLevel;

    if (verificationLevel === 0) verificationLevel = "None";
    if (verificationLevel === 1) verificationLevel = "Low";
    if (verificationLevel === 2) verificationLevel = "Medium";
    if (verificationLevel === 3) verificationLevel = "High";
    if (verificationLevel === 4) verificationLevel = "Highest";

    const owner = await interaction.client.users.fetch(guild.ownerId);
    const ownerUsername = owner.username;
    const ownerTag = `${ownerUsername}`;
    const roleCount = guild.roles.cache.size;
    const isCommunityServer = guild.features.includes("COMMUNITY");

    const communityIndicator = isCommunityServer
      ? `${emojis.tic}`
      : `${emojis.cross}`;

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**Server's Info**`)
      .setThumbnail(guild.iconURL())
      .addFields(
        {
          name: `${emojis.server} Server Name:`,
          value: `${guild.name}`,
          inline: false,
        },
        { name: `${emojis.owner} Owner:`, value: `${ownerTag}`, inline: false },
        {
          name: `${emojis.member} Total Members:`,
          value: `${totalMembers}`,
          inline: false,
        },
        {
          name: `${emojis.bot} Bot Count:`,
          value: `${botCount}`,
          inline: false,
        },
        {
          name: `${emojis.member} Online Members:`,
          value: `${onlineMembers}`,
          inline: false,
        },
        {
          name: `${emojis.channel} Text Channels:`,
          value: `${textChannels}`,
          inline: false,
        },
        {
          name: `${emojis.voice} Voice Channels:`,
          value: `${voiceChannels}`,
          inline: false,
        },
        {
          name: `${emojis.role} Role Count:`,
          value: `${roleCount}`,
          inline: false,
        },
        {
          name: `${emojis.verify} Verification Level:`,
          value: `${verificationLevel}`,
          inline: false,
        },
        {
          name: `${emojis.community} Community Server:`,
          value: `${communityIndicator}`,
          inline: false,
        },
        {
          name: `${emojis.birthday} Server Creation Date:`,
          value: `${serverCreationDate}`,
          inline: false,
        },
      )
      .setFooter({ text: `${embeds.footer}` })
      .setTimestamp();

    return interaction.editReply({ embeds: [embed] });
  },
};
