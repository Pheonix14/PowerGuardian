const { UserFlags, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");
const emojis = require("./../../config/emojis.json");
module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const db = require("./../database/connect.js");
    const settings = db.table(`guild_${member.guild.id}`);
    const securegate = await settings.get(`securegate`);
    if (securegate === "enabled") {
      const guild = member.guild;
      const modlogs = await settings.get(`modlogs`);

      // Regular expression to match Discord invite links
      const inviteRegex =
        /(discord\.gg\/|discord\.com\/invite\/)([a-zA-Z0-9]+)/;

      // Check if the username contains an invite link
      if (inviteRegex.test(member.user.username)) {
        member.kick("User joined with invite link in username.");
        if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Member Kicked**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `SecureGate System`,
              inline: false,
            },
            {
              name: `${emojis.reason} Reason:`,
              value: `User joined with invite link in username.`,
              inline: false,
            },
            {
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
        return;
      }

      // Check if the user's account age is less than 5 days
      const accountAge = Date.now() - member.user.createdAt;
      const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

      if (accountAge < fiveDaysInMs) {
        member.kick("User account is less than 5 days old.");
        if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Member Kicked**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `SecureGate System`,
              inline: false,
            },
            {
              name: `${emojis.reason} Reason:`,
              value: `User account is less than 5 days old.`,
              inline: false,
            },
            {
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
        return;
      }

      // Check if the user is an unverified bot
      if (member.user.bot && !member.user.flags.has(UserFlags.VerifiedBot)) {
        member.kick("Unverified bot joined.");
        if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Member Kicked**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `SecureGate System`,
              inline: false,
            },
            {
              name: `${emojis.reason} Reason:`,
              value: `Unverified bot joined.`,
              inline: false,
            },
            {
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
        return;
      }

      // Check if the user has a verified email
      if (!member.user.verified) {
        member.kick("User does not have a verified email.");
        if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Member Kicked**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `SecureGate System`,
              inline: false,
            },
            {
              name: `${emojis.reason} Reason:`,
              value: `User does not have a verified email.`,
              inline: false,
            },
            {
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
        return;
      }
// Check if the member gets admin perms within a minute of joining
    setTimeout(() => {
        if (member.permissions.has('ADMINISTRATOR')) {
          if (member.user.bot ) return;
          
          try {
            member.kick('Member got admin permissions within a minute of joining.');
            if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**Member Kicked**`)
          .addFields(
            {
              name: `${emojis.mod} Moderator:`,
              value: `SecureGate System`,
              inline: false,
            },
            {
              name: `${emojis.reason} Reason:`,
              value: `Member got admin permissions within a minute of joining.`,
              inline: false,
            },
            {
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
            },
          )
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
        return;
            } catch (error) {
             if (isNaN(modlogs)) return;
        const log = guild.channels.cache.get(modlogs);
        if (log === undefined) return;
        let embed = new EmbedBuilder()
          .setColor(embeds.color)
          .setTitle(`**${emojis.warning} Warning**`)
          .setDescription(`A new member gained administrator permissions within one minute of joining our Discord server. The SecureGate system cannot remove this member because the PowerGuardian role has a lower permission level. Please investigate this user immediately and take appropriate action to verify their identity or remove their administrative privileges.`)
          .addFields({
              name: `${emojis.member} Member:`,
              value: `${member.user.tag}`,
              inline: false,
          })
          .setFooter({ text: `${embeds.footer}` })
          .setTimestamp();
        log.send({ embeds: [embed] });
          } 
        }
    }, 60000); // 1 minute in milliseconds
      
    } else return;
  });
};
