import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import embeds from "./../../config/embeds.json";
import { QuickDB } from "quick.db";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('warn members on server')
.addUserOption(option =>
		option.setName('member')
			.setDescription('choose a member to warn')
.setRequired(true))
.addStringOption(option =>
		option.setName('reason')
			.setDescription('A Reason For Getting Warned'))
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .setDMPermission(false),
	async execute(interaction, client) {
    
const db = new QuickDB({ filePath: './src/database/database.sqlite' });
    
const member = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!interaction.guild.members.cache.get(member.id))
      return message.channel.send(`Please Mention A Valid Member!`);

    if (member.id === interaction.user.id)
      return interaction.editReply({ content: "You Can't Kick Your Self!", ephemeral: true });

    if (member.id === interaction.client.user.id)
      return interaction.editReply({contest: `Please Don't Warn Me ;-;`, ephemeral: true });

if (member.id === interaction.guild.ownerId)
      return interaction.editReply({ content: `You Can't Warn Owner Of Server!`, ephemeral: true });

let user = interaction.guild.members.cache.get(member.id);
    
    if (!user.moderatable)
      return interaction.editReply({ content: `I Can't Warn That Member!`, ephemeral: true });

const warning = db.table(`guild_${interaction.guild.id}`)

await warning.add(`${user.id}.warning`, 1)

let embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`Member Kicked!`)
        .setDescription(`Moderator: ${interaction.user.tag}

Warned Member: ${member.tag}

Reason: ${reason}
`)
        .setFooter({text: `${embeds.footer}`})
        .setTimestamp();

interaction.editReply({embeds: [embed]})
    
  },
};