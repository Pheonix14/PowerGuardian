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
    .setName("slowmode")
    .setDescription("Enable/Disable Slowmode For The Channel!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set Slowmode For The Channel!")
        .addStringOption((option) =>
          option
            .setName("duration")
            .setDescription("A Duration Of Slowmode")
            .addChoices(
              { name: "60 secs", value: "60" },
              { name: "5 mins", value: "300" },
              { name: "10 mins", value: "600" },
              { name: "30 min", value: "1800" },
              { name: "1 hour", value: "3600" },
              { name: "6 hour", value: "21600" },
            )
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("disable")
        .setDescription("Disable Slowmode For The Channel!"),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    const settings = db.table(`guild_${interaction.guild.id}`);

    if (interaction.options.getSubcommand() === "set") {
      let duration = interaction.options.getString("duration");

      let duration_sec = duration + "s";

      let duration_ms = ms(duration_sec);

      let duration_word = ms(duration_ms, { long: true });

      try {
        await interaction.channel.setRateLimitPerUser(duration);

        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Slowmode Enabled**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `${interaction.user.tag}`,
              inline: false,
            },
            {
              name: `${emojis.channel} Slowmode Channel:`,
              value: `${interaction.channel}`,
              inline: false,
            },
            {
              name: `${emojis.timeout} Slowmode Duration:`,
              value: `${duration_word}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();

        interaction.editReply({ embeds: [embed] });

        const modlogs = await settings.get(`modlogs`);

        if (isNaN(modlogs)) return;

        const log = interaction.guild.channels.cache.get(modlogs);

        if (log === undefined) return;

        await log.send({ embeds: [embed] });
      } catch (error) {
        console.log(error);
        return interaction.editReply({
          content: `I Can't Turn On Slowmode On This Channel`,
          ephemeral: true,
        });
      }
    }

    if (interaction.options.getSubcommand() === "disable") {
      try {
        await interaction.channel.setRateLimitPerUser("0");

        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Slowmode Disabled**`)
          .setDescription(
            `**${emojis.mod} Moderator: ${interaction.user.tag}

${emojis.channel} Slowmode Channel: ${interaction.channel}
**`,
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();

        interaction.editReply({ embeds: [embed] });

        const modlogs = await settings.get(`modlogs`);

        if (isNaN(modlogs)) return;

        const log = interaction.guild.channels.cache.get(modlogs);

        if (log === undefined) return;

        await log.send({ embeds: [embed] });
      } catch (error) {
        console.log(error);
        return interaction.editReply({
          content: `I Can't Turn Off Slowmode On This Channel`,
          ephemeral: true,
        });
      }
    }
  },
};
