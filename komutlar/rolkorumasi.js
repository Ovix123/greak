const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":no_entry: **rol koruma** komutunu kullanmak için **__SUNUCUYU YÖNET__** Yetkisine sahip olman gerkeli")
  
  
  if (!args[0]){
    message.channel.send("-rol-koruma  için Doğru Kullanım: -rol-koruma aç / -rol-koruma  kapat")
  }
  if(args[0] === "aç") {
    
    message.channel.send("f!rol-koruma başarıyla açıldı")
    
    db.set(`rol_${message.guild.id}`, "açık")
  }
    if(args[0] ===   "kapat") {
      
      message.channel.send("-rol-koruma başarıyla kapatıldı")
      
      db.set(`rol_${message.guild.id}`, "kapalı")
      
    }
  
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rol-koruma"],
  permLevel: 0
}
exports.help = {
  name: "rolkoruma",
  description: "reklam engel açar yada kapatır.",
  usage: "-reklam-engel"
}