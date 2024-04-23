const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("securegate")
    .setDescription(
      `When a user joins, the bot will take action if they are suspicious`,
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("enable").setDescription("Enable securegate plugin"),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("disable").setDescription("Disable securegate plugin"),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    const settings = db.table(`guild_${interaction.guild.id}`);

    if (interaction.options.getSubcommand() === "enable") {
      await settings.set(`securegate`, "enabled");

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(
          `**${emojis.tic} You have successfully enabled the SecureGate plugin. Please note that from now on, when a member joins, it will check and kick them if:

- The member is unverified.
- The member has an invite link in their username.
- The member's account age is less than 5 days.
- The member is an unverified bot.
- The member joined and obtained admin permissions within 1 minute.**`,
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }

    if (interaction.options.getSubcommand() === "disable") {
      await settings.set(`securegate`, "disabled");

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(
          `**${emojis.tic} The SecureGate Plugin has been successfully disabled.**`,
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
