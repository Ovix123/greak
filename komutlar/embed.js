const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kobss = args.slice(0).join(" ");
  const kobs = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`${kobss}`)
  message.channel.send(kobs);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "embed",
  description: "Yazdığınızı Mesajı Embedli Atar.",
  usage: "embed",
  category: "Kullanıcı"
};