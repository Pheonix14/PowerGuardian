const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Give Timeout To Server Member")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Choose A Member To Timeout")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("A Duration Of Timeout")
        .addChoices(
          { name: "60 secs", value: "60s" },
          { name: "5 mins", value: "5m" },
          { name: "10 mins", value: "10m" },
          { name: "1 hour", value: "1h" },
          { name: "1 day", value: "1d" },
          { name: "1 week", value: "1w" },
        )
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("A Reason For Getting Timeout"),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  async execute(interaction, client) {
    const member = interaction.options.getUser("member");
    let duration = interaction.options.getString("duration");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    const db = require("./../database/connect.js");

    if (!interaction.guild.members.cache.get(member.id))
      return interaction.editReply({
        content: `**Please Mention A Valid Member!**`,
        ephemeral: true,
      });

    if (member.id === interaction.user.id)
      return interaction.editReply({
        content: "**You Can't Timeout Your Self!**",
        ephemeral: true,
      });

    if (member.id === interaction.client.user.id)
      return interaction.editReply({
        contest: `**Please Don't Timeout Me ;-;**`,
        ephemeral: true,
      });

    if (member.id === interaction.guild.ownerId)
      return interaction.editReply({
        content: `**You Can't Timeout Owner Of Server!**`,
        ephemeral: true,
      });

    let user = interaction.guild.members.cache.get(member.id);

    if (!user.moderatable)
      return interaction.editReply({
        content: `**I Can't Timeout That Member!**`,
        ephemeral: true,
      });

    let calculated_duration = ms(`${duration}`);

    let duration_word = ms(calculated_duration, { long: true });

    try {
      user.timeout(calculated_duration, `${reason}`);

      let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Member Timeout!**`)
        .addFields(
          {
            name: `${emojis.mod} Moderator:`,
            value: `${interaction.user.tag}`,
            inline: false,
          },
          {
            name: `${emojis.timeout} Timeout Member:`,
            value: `${member.tag}`,
            inline: false,
          },
          {
            name: `${emojis.timeout} Timeout Time:`,
            value: `${duration_word}`,
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

      if (member.bot === false)
        user.send(
          `**You Have Got ${duration_word} ${emojis.timeout} Timeout From **${interaction.guild.name}** For ${emojis.reason} ${reason}**`,
        );

      const settings = db.table(`guild_${interaction.guild.id}`);

      const modlogs = await settings.get(`modlogs`);

      if (isNaN(modlogs)) return;

      const log = interaction.guild.channels.cache.get(modlogs);

      if (log === undefined) return;

      await log.send({ embeds: [embed] });
    } catch (error) {
      return interaction.editReply({
        content: `I Can't Timeout That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`,
        ephemeral: true,
      });
    }
  },
};
