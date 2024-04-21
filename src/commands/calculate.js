const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("calculate plus, minus, multiplication and division.")
    .addNumberOption((option) =>
      option.setName("number1").setDescription("number1").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("operator")
        .setDescription("calc type")
        .setRequired(true)
        .addChoices(
          { name: "plus", value: "+" },
          { name: "minus", value: "-" },
          { name: "multiplication", value: "*" },
          { name: "division", value: "/" },
        ),
    )
    .addNumberOption((option) =>
      option.setName("number2").setDescription("number2").setRequired(true),
    ),
  async execute(interaction, client) {
    const number1 = interaction.options.getNumber("number1");
    const number2 = interaction.options.getNumber("number2");
    const operator = interaction.options.getString("operator");

    let result;
    let operatorSymbol;

    switch (operator) {
      case "+":
        result = number1 + number2;
        operatorSymbol = "+";
        break;
      case "-":
        result = number1 - number2;
        operatorSymbol = "-";
        break;
      case "*":
        result = number1 * number2;
        operatorSymbol = "×";
        break;
      case "/":
        result = number1 / number2;
        operatorSymbol = "÷";
        break;
      default:
        return interaction.editReply(
          "Invalid operator. Please use one of: +, -, *, /",
        );
    }

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**Calculator Of Newton**`)
      .setDescription(
        `**The result of ${number1} ${operatorSymbol} ${number2} = ${result}**`,
      )
      .setFooter({ text: `${embeds.footer}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
