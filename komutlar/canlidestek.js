const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;//Kolgh Creations//Kolgh Creations
let guild = message.guild.name;
let guildid = message.guild.id;//Kolgh Creations
let kanal = message.channel.name;
let channel = bot.channels.get("736282985543893065")//bug repot kanal id'i
let embed = new Discord.RichEmbed()//Kolgh Creations//Kolgh Creations//Kolgh Creations//Kolgh Creations
.setTitle("Bug Report")
.setThumbnail("data:image/png;base64,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")
.addField("Bug", bug)
.addField("Report Eden", user, true)
.addField("Sunucu", guild, true)
.addField("Sunucu ID", guildid, true)//Kolgh Creations
.addField("Kanal", kanal, true)
.setColor("#f49542")//Kolgh Creations//Kolgh Creations
//Kolgh Creations
message.channel.send(":white_check_mark:  **| Bug Report Başarı İle İletildi.**")
channel.send(embed).then(i => i.react(":hourglass_flowing_sand:"))//Kolgh Creations

  //Kolgh Creations

}//Kolgh Creations
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hata-bildir"],
  permLevel: 0  
};

exports.help = {
  name: 'bug',//Kolgh Creations
  description: 'Çalışıp para kazanırsınız.',
  usage: 'hata-bildir'
}