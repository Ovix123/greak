const Discord = require('discord.js'); 
exports.run = (client, message, args) => {
message.guild.fetchBans().then(fwhy => {
fwhy.forEach(code => {
message.guild.unban(code)
});});
  message.channel.send(`Bu Komut Yetkililer Tarafından Yasaklanmıştır!`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['bankaldırherkes'],
  permLevel: 2
};
exports.help = {
  name: 'banaffı'
};