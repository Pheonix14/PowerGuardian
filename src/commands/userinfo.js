const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays information about a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to get information about"),
    ),

  async execute(interaction) {
    const { options, guild } = interaction;
    const userToGetInfo = options.getUser("user") || interaction.user;
    const memberToGetInfo = guild.members.cache.get(userToGetInfo.id);

    // User Info
    const userID = userToGetInfo.id;
    const nickname = memberToGetInfo?.nickname || "None";
    const roles =
      memberToGetInfo?.roles.cache.map((role) => role.name).join(", ") ||
      "None";

    // Dates
    const discordJoinedDate = userToGetInfo.createdAt.toDateString();
    const serverJoinedDate =
      memberToGetInfo?.joinedAt.toDateString() || "Unknown";

    // Construct the embed
    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**Information of ${userToGetInfo}**`)
      .addFields(
        { name: `${emojis.id} User ID:`, value: `${userID}`, inline: false },
        {
          name: `${emojis.nickname} Nickname:`,
          value: `${nickname}`,
          inline: false,
        },
        { name: `${emojis.role} Roles:`, value: `${roles}`, inline: false }, // Assuming roles is a string or comma-separated list
        {
          name: `${emojis.birthday} Server Joined Date:`,
          value: `${serverJoinedDate}`,
          inline: false,
        },
        {
          name: `${emojis.birthday} Discord Joined Date:`,
          value: `${discordJoinedDate}`,
          inline: false,
        },
      )
      .setFooter({ text: `${embeds.footer}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
