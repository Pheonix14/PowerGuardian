import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import embeds from "./../../config/embeds.json";
import { QuickDB } from "quick.db";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnings')
		.setDescription(`check your/someone's warmings`)
.addUserOption(option =>
		option.setName('member')
			.setDescription('choose a member to check warnings'))
  .setDMPermission(false),
	async execute(interaction, client) {

const db = new QuickDB({ filePath: './src/database/database.sqlite' });
    
let member = interaction.options.getUser('member');

if (member === null) member = interaction.user;

    if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`Please Mention A Valid Member!`);

const warning = db.table(`guild_${interaction.guild.id}`)

let warnings = await warning.get(`${member.id}.warning`)

let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setDescription(`${member.tag}'s Warnings: ${warnings}`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

interaction.editReply({embeds: [embed]})
    
  },
};