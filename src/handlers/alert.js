const config = require("./../../config/config.json");

module.exports = (client) => {
  client.on("guildCreate", (guild) => {
    const alertChannel = guild.channels.cache.get(config.bot.joinId);
    if (alertChannel && alertChannel.isText()) {
      alertChannel.send(`I've joined the server: ${guild.name}`);
    }
  });

  client.on("guildDelete", (guild) => {
    const alertChannel = guild.channels.cache.get(config.bot.leftId);
    if (alertChannel && alertChannel.isText()) {
      alertChannel.send(`I've left the server: ${guild.name}`);
    }
  });

  client.on("error", (error) => {
    const alertChannel = client.channels.cache.get(config.bot.errorId);
    if (alertChannel && alertChannel.isText()) {
      alertChannel.send(`An error occurred: ${error.message}`);
    }
  });
};
