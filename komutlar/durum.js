const Discord = require("discord.js");

exports.run = async (client,message,args) => {
if(message.author.id !== "488272180774174720")return message.channel.send("Bunu Kullanmak için Yeterli Yetkiye sahip Değilsin");
if(args[0] === "dnd") {
client.user.setStatus("dnd");
message.channel.send('Durumum artık **Rahatsız Etmeyin**.');
}
if(args[0] === "idle") {
  client.user.setStatus("idle");
  message.channel.send('Durumum artık **Boşta**.');
  }
  if(args[0] === "online") {
    client.user.setStatus("online");
    message.channel.send('Durumum artık **Çevrimiçi**.');
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'durum-değiş',
  description: 'BOTUN DURUMUNU Değiştirirsiniz(Kodu Paylaşan Annesiz).',
  usage: 'f!durum-değiş <durum>'
};