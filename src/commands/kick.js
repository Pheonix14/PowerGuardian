const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick A Member From The Server')
.addUserOption(option =>
		option.setName('member')
			.setDescription('choose a member to kick')
.setRequired(true))
.addStringOption(option =>
		option.setName('reason')
			.setDescription('A Reason For Getting Kick'))
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .setDMPermission(false),
	async execute(interaction, client) {

const member = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`**Please Mention A Valid Member!**`);

    if (member.id === interaction.user.id)
      return interaction.editReply({ content: "**You Can't Kick Your Self!**", ephemeral: true });

    if (member.id === interaction.client.user.id)
      return interaction.editReply({contest: `**Please Don't Kick Me ;-;**`, ephemeral: true });

if (member.id === interaction.guild.ownerId)
      return interaction.editReply({ content: `**You Can't Kick Owner Of Server!**`, ephemeral: true });

let user = interaction.guild.members.cache.get(member.id);
    
    if (!user.kickable)
      return interaction.editReply({ content: `**I Can't Kick That Member!**`, ephemeral: true });
    
try {
       
        user.kick({ reason: `${reason}` });
        
      let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**Member Kicked!**`)
        .setDescription(`**${emojis.mod} Moderator: ${interaction.user.tag}

${emojis.kicked} Kicked Member: ${member.tag}

${emojis.reason} Reason: ${reason}
**`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

interaction.editReply({embeds: [embed]})
  
      if (member.bot === false)
        user.send(
          `You Have Been ${emojis.kicked} Kicked From **${interaction.guild.name}** For ${emojis.reason} ${reason}`
        );
      
    } catch (error) {
      return interaction.editReply({ content: `I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`, ephemeral: true })
  }
    
	},
};