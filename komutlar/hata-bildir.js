const Discord = require('discord.js');


exports.run = function(client, message, args) {

	var öneri = args.slice(0).join(' ');
	var guildID = "459698010473889813";
	var channelID = "484779276114067467";
	
	if (!öneri){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **-hata-bildir <Bulduğunuz hata> + Bot yazdığınız mesaj için log göndermez, siz hatanızı yazın bot bize ulaştırır.**");
	} else {
		
		var embed = new Discord.RichEmbed()
			.setTimestamp()
			.addField("Eylem:", "Öneri")
			.addField("Kullanıcı:", message.author.tag)
			.addField("ID", message.author.id)
			.addField("Öneri", öneri)
		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.channel.send("Öneriniz alınmıştır! Teşekkür ederiz.");
	};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hata-bildir"], 
  permLevel: 0 
};

exports.help = {
  name: 'öneri', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'öneri <mesaj>' 
};