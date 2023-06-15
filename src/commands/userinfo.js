const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays information about a user.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to get information about')),

  async execute(interaction) {

const { options, guild } = interaction;
    const userToGetInfo = options.getUser('user') || interaction.user;
    const memberToGetInfo = guild.members.cache.get(userToGetInfo.id);

    // User Info
    const userID = userToGetInfo.id;
    const nickname = memberToGetInfo?.nickname || 'None';
    const roles = memberToGetInfo?.roles.cache.map(role => role.name).join(', ') || 'None';

    // Dates
    const discordJoinedDate = userToGetInfo.createdAt.toDateString();
    const serverJoinedDate = memberToGetInfo?.joinedAt.toDateString() || 'Unknown';
    
    
    // Construct the embed
    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setThumbnail(userToGetInfo.iconURL())
      .setTitle(`**Information of ${userToGetInfo}**`)
      .setDescription(`**${emojis.id} User ID: ${userID}
      
${emojis.nickname} Nickname: ${nickname}

${emojis.role} Roles: ${roles}

${emojis.birthday} Server Joined Date: ${serverJoinedDate}

${emojis.birthday} Discord Joined Date: ${discordJoinedDate}**`)
      .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    
  },
};
  