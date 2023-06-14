const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require('moment-timezone')
const config = require("./../../config/config.json");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('worldclock')
		.setDescription('show you times of G20 countries'),
	async execute(interaction, client) {
    
const moment = require('moment-timezone');

// Define the G20 countries and UAE with their respective timezones and flag emojis
const countries = [
  { name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
];

// Display the current time and flag emoji for each country

function createWorldClockEmbed() {
  const embed = new EmbedBuilder()
    .setColor(embeds.color)
    .setTitle('World Clock')
    .setDescription('Current time in different countries (GMT/UTC)')
    .setFooter({text: `${embeds.footer}`});

  const currentTime = moment();

  countries.forEach((country) => {
    const countryTime = currentTime.clone().tz(country.timezone).format('YYYY-MM-DD HH:mm:ss');
    embed.addFields({ name: `${country.flag} ${country.name}`, value: countryTime });
  });

  return embed;
   }
    
const embed = createWorldClockEmbed();

await interaction.editReply({embeds: [embed]})
    
	},
};