const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modlogs")
    .setDescription(`Configure modlogs channel`)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set a channel for modlogs")
        .addChannelOption((option) =>
          option
            .setName("logging_channel")
            .setDescription("channel for the modlogs"),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("disable").setDescription("Disable Modlogs"),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    const settings = db.table(`guild_${interaction.guild.id}`);

    if (interaction.options.getSubcommand() === "set") {
      const channel = interaction.options.getChannel("logging_channel");

      await settings.set(`modlogs`, channel.id);

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(
          `**${emojis.tic} The ModLogs channel has been successfully configured in the ${channel}**`,
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "disable") {
      await settings.set(`modlogs`, "");

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(`**${emojis.tic} The Modlogs feature has been successfully disabled.**`)
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
