const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warn members on server")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("choose a member to warn")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("A Reason For Getting Warned"),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    const member = interaction.options.getUser("member");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`**Please Mention A Valid Member!**`);

    if (member.id === interaction.user.id)
      return interaction.editReply({
        content: "**You Can't Kick Your Self!**",
        ephemeral: true,
      });

    if (member.id === interaction.client.user.id)
      return interaction.editReply({
        content: `**Please Don't Warn Me ;-;**`,
        ephemeral: true,
      });

    if (member.id === interaction.guild.ownerId)
      return interaction.editReply({
        content: `**You Can't Warn Owner Of Server!**`,
        ephemeral: true,
      });

    let user = interaction.guild.members.cache.get(member.id);

    if (!user.moderatable)
      return interaction.editReply({
        content: `**I Can't Warn That Member!**`,
        ephemeral: true,
      });

    const warning = db.table(`guild_${interaction.guild.id}`);

    await warning.add(`${user.id}.warning`, 1);

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**Member Warned!**`)
      .addFields(
        {
          name: `${emojis.mod} Moderator:`,
          value: `${interaction.user.tag}`,
          inline: false,
        },
        {
          name: `${emojis.warning} Warned Member:`,
          value: `${member.tag}`,
          inline: false,
        },
        {
          name: `${emojis.reason} Reason:`,
          value: `${reason}`,
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
  },
};
