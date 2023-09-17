const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const config = require("./../../config/config.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Bot admins only command')
    .addStringOption(option =>
		option.setName('eval')
			.setDescription('The JavaScript eval code').setRequired(true)),
	async execute(interaction, client) {

 if(!config.bot.settings.includes(interaction.user.id)) return interaction.reply(`This Command Not Made For Public. It's only for bot's admins so don't use it again`);   

	    const code = interaction.options.getString('eval');
	    
	    try {
	        const result = eval(code);
	        interaction.editReply(`Result: \`${result}\``);
	    } catch (error) {
	        interaction.editReply(`Error: \`${error}\``);
	    }
	},
};
