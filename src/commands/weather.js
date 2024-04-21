const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const config = require("./../../config/config.json");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Info about weather of your city")
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("Name of your city")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const city = interaction.options.getString("city");

    try {
      const response = await axios.get("http://api.weatherstack.com/current", {
        params: {
          access_key: config.bot.WEATHERSTACK_API_KEY,
          query: city,
          units: "m", // Set units to metric for Celsius and meters per second
        },
      });

      const {
        temperature,
        weather_descriptions,
        uv_index,
        pressure,
        humidity,
        wind_speed,
        wind_dir,
        visibility,
      } = response.data.current;

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Current weather of ${city}**`)
        .addFields(
          { name: `${emojis.temp} Temperature:`, value: `${temperature}°C` },
          {
            name: `${emojis.weather} Weather:`,
            value: `${weather_descriptions[0]}`,
            inline: false,
          },
          {
            name: `${emojis.humidity} Humidity:`,
            value: `${humidity}%`,
            inline: false,
          },
          {
            name: `${emojis.uv} UV Index:`,
            value: `${uv_index}`,
            inline: false,
          },
          {
            name: `${emojis.air} Air Pressure:`,
            value: `${pressure} mb`,
            inline: false,
          },
          {
            name: `${emojis.wind} Wind:`,
            value: `${wind_speed} m/s ${wind_dir}`,
            inline: false,
          },
          {
            name: `${emojis.visi} Visibility:`,
            value: `${visibility} km`,
            inline: false,
          },
        )
        .setFooter({ text: `${embeds.footer}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply("Failed to get weather information.");
    }
  },
};
