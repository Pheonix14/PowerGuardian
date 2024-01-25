const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const config = require("./../../config/config.json");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('askgemini')
		.setDescription("Ask Questions To Google's Gemini AI Model")
  .addStringOption(option =>
		option.setName('prompt')
.setDescription('Prompt For Gemini').setRequired(true)),
	async execute(interaction, client) {
    
const prompt = interaction.options.getString('prompt');
    
try {

const genAI = new GoogleGenerativeAI(config.bot.GEMINI_API_KEY);
  
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Gemini AI**`)
        .setDescription(`${text}`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

      await interaction.editReply({embeds: [embed]});
    } catch (error) {
      await interaction.editReply('Technical Error, Please Try Again Later');
        } 
	},
};