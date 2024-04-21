const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetwarn")
    .setDescription(`reset someone's warnings`)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("choose a member to reset warnings")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    let member = interaction.options.getUser("member");

    if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`**Please Mention A Valid Member!**`);

    const warning = db.table(`guild_${interaction.guild.id}`);

    let warnings = await warning.get(`${member.id}.warning`);

    if (warnings === undefined) warnings = 0;

    if (warnings === 0) {
      interaction.editReply(`**This Member Don't Have A Warning**`);
    } else {
      await warning.sub(`${member.id}.warning`, warnings);

      let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Warning Reset!**`)
        .addFields(
          {
            name: `${emojis.mod} Moderator:`,
            value: `${interaction.user.tag}`,
            inline: false,
          },
          {
            name: `${emojis.warning} Warning Reset:`,
            value: `${member.tag}`,
            inline: false,
          },
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      interaction.editReply({ embeds: [embed] });

      const settings = db.table(`guild_${interaction.guild.id}`);

      const modlogs = await settings.get(`modlogs`);

      if (isNaN(modlogs)) return;

      const log = interaction.guild.channels.cache.get(modlogs);

      if (log === undefined) return;

      await log.send({ embeds: [embed] });
    }
  },
};
