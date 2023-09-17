const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const config = require("./../../config/config.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('add a role to a user')
    .addUserOption(option =>
		option.setName('user')
			.setDescription('user to add role')
.setRequired(true))
   .addRoleOption(option =>
		option.setName('role')
			.setDescription('role to add')
.setRequired(true)),
	async execute(interaction, client) {

    const db = require("./../database/connect.js");
    
    const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');

        if (!user || !role) {
            await interaction.editReply('**User or role not found.**');
            return;
        }

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            await interaction.editReply('**Member not found.**');
            return;
        }

        try {
            await member.roles.add(role);
          let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Role Assigned!**`)
        .setDescription(`**${emojis.mod} Moderator: ${interaction.user.tag}

${emojis.role} Assigned Role: ${role}

${emojis.member} Member: ${user}**`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();
             interaction.editReply({embeds: [embed]});


const settings = db.table(`guild_${interaction.guild.id}`);

const modlogs = await settings.get(`modlogs`)
  
if (isNaN(modlogs)) return;

const log = interaction.guild.channels.cache.get(modlogs)

  
if (log === undefined) return;

 await log.send({embeds: [embed]})
          
        } catch (error) {
            await interaction.editReply('**An error occurred while adding the role. Make sure the bot has the necessary permissions.**');
            }
	},
};
