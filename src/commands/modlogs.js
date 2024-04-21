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
    .setDescription(`Configure bot's settings`)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set a channel for moderation logs")
        .addChannelOption((option) =>
          option
            .setName("logging_channel")
            .setDescription("The channel for mod logs"),
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
          `**${emojis.tic} Successfully Set ModLogs Channel: ${channel}**`,
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "disable") {
      await settings.set(`modlogs`, "");

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(`**${emojis.tic} Successfully Disabled ModLogs**`)
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
