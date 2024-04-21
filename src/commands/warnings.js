const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription(`check your/someone's warmings`)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("choose a member to check warnings"),
    )
    .setDMPermission(false),
  async execute(interaction, client) {
    const db = require("./../database/connect.js");

    let member = interaction.options.getUser("member");

    if (member === null) member = interaction.user;

    if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`**Please Mention A Valid Member!**`);

    const warning = db.table(`guild_${interaction.guild.id}`);

    let warnings = await warning.get(`${member.id}.warning`);

    if (warnings === undefined) warnings = 0;

    let embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**${member.tag}'s**`)
      .addFields({
        name: `${emojis.warning} Warnings:`,
        value: `${warnings}`,
        inline: false,
      })
      .setFooter({ text: `${embeds.footer}` })
      .setTimestamp();

    interaction.editReply({ embeds: [embed] });
  },
};
