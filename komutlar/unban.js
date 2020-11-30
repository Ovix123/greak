const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  message.delete();
  let pekmez = args[0]
if(!pekmez) return message.reply('Kullanıcı id  belirt.!')
  message.guild.unban(pekmez);
};
exports.conf = {
  enabled:false,
  guildOnly: false,
  aliases: [],
  permlevel: 2
};
exports.help = {
  name: "unban",
  description: "Herhangi bir kullanıcının banını açarsınız.",
  usage: "unban kullanıcı"
};