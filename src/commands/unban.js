const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unban A Banned Member')
.addStringOption(option =>
		option.setName('id')
			.setDescription("Banned User's Id")
.setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .setDMPermission(false),
	async execute(interaction, client) {

		const user_id = interaction.options.getString('id');

if (isNaN(user_id)) return interaction.editReply({ content: `**Please Give Me Valid ID!**`, ephemeral: true});

if (user_id === interaction.user.id) return interaction.editReply({ content: `**You Are Already Unban!**`, ephemeral: true});

if (user_id === interaction.guild.ownerId) return interaction.editReply({ content: `**Server Owner Is Already Unban!**`, ephemeral: true});

if (user_id === interaction.client.user.id) return interaction.editReply({ content: `**I Am Already Unban!**`, ephemeral: true});

let FetchBan = await interaction.guild.bans.fetch();

    let member;
    member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === user_id.toLocaleLowerCase()
      ) ||
      FetchBan.get(user_id) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === user_id.toLocaleLowerCase()
      );

    if (!member)
      return interaction.editReply({ content: `**Please Give Valid Member ID Or Member Is Not Banned!**`, ephemeral: true});

try {
        interaction.guild.members.unban(member.user.id);
        
      let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Member Unbanned!**`)
        .setDescription(`**${emojis.mod} Moderator: ${interaction.user.tag}

${emojis.unban} Unbanned Member: ${member.user.tag}**`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

interaction.editReply({embeds: [embed]})
  
      if (member.bot === false)
        member.send(
          `**You Have Been ${emojis.unban} Unbanned From ${interaction.guild.name}**`
        );
      
    } catch (error) {
      return interaction.editReply({ content: `**I Can't Unban That Member Maybe Member Is Not Banned Or Some Error!**`, ephemeral: true })
}
    
	},
};