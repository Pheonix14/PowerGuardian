import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import embeds from "./../../config/embeds.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban A Member From The Server')
.addUserOption(option =>
		option.setName('member')
			.setDescription('Choose A Member To Ban')
.setRequired(true))
.addStringOption(option =>
		option.setName('reason')
			.setDescription('A Reason For Getting Banned'))
.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .setDMPermission(false),
	async execute(interaction, client) {

const member = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

if (!interaction.guild.members.cache.get(member.id))
      return interaction.editReply({content: `Please Mention A Valid Member!`, ephemeral: true });

    if (member.id === interaction.user.id)
      return interaction.editReply({ content: "You Can't Ban Your Self!", ephemeral: true });

    if (member.id === interaction.client.user.id)
      return interaction.editReply({contest: `Please Don't Ban Me ;-;`, ephemeral: true });

if (member.id === interaction.guild.ownerId)
      return interaction.editReply({ content: `You Can't Ban Owner Of Server!`, ephemeral: true });

let user = interaction.guild.members.cache.get(member.id);
    
    if (!user.kickable)
      return interaction.editReply({ content: `I Can't Ban That Member!`, ephemeral: true });
    
try {
       setTimeout(function() {
        interaction.guild.members.ban(user);
      }, 2000);
        
      let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`Member Banned!`)
        .setDescription(`Moderator: ${interaction.user.tag}

Banned Member: ${member.tag}

Reason: ${reason}
`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

interaction.editReply({embeds: [embed]})
  
      if (member.bot === false)
        user.send(
          `You Have Been Banned From **${interaction.guild.name}** For ${reason}`
        );
      
    } catch (error) {
      return interaction.editReply({ content: `I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`, ephemeral: true })
  }
    
	},
};