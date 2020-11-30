const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Hata: **Yönetici** yetkisine sahip değilsin.');

    if (!args[0]) return message.reply(`aç/kapat`);

    if (args[0] == 'aç') {
        var durum = await db.fetch(`reklam_${message.guild.id}`)            
        if (durum == "acik") return message.channel.send("Zaten açık");
        db.set(`reklam_${message.guild.id}`, 'acik')
        message.channel.send(`Reklam engel başarıyla açıldı!!`)
    }

    if (args[0] == 'kapat') {
        var durum = await db.fetch(`reklam_${message.guild.id}`)            
        if (durum == "kapali") return message.channel.send("Zaten kapalı");
        db.set(`reklam_${message.guild.id}`, 'kapali')
        message.channel.send(`Reklam engel başarıyla kapatıldı!!`)
    }

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklam'],
  permLevel: 3
};
exports.help = {
  name: 'reklam-engel',
  description: '',
  usage: 'reklam-engel'
};