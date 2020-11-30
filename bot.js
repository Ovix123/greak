const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');////////destiny
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');////////ukqzn
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
////////developers

/////////////////////////////// 7/24 ////////////////////////////////////////
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "FwhyCode Destiny Altyapısı");//dokunmayın çalışmaz
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://destinypremium.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {////////ukqzn
    console.log(`${message}`);
};

/////////////////////////////// 7/24 ////////////////////////////////////////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);/////////ukqzn
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });////////ukqzn
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });/////////ukqzn
            resolve();
        } catch (e) {
            reject(e);
        }////////ukqzn
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};/////////ukqzn




////////////////// gold üye  //////////////////////////

client.on("message", async message => {
  let Gold = client.emojis.get("703842046300913704");
  let TimeOut = 1800000;
  let LastSee = await db.fetch(`GoldS_${message.author.id}`);
  let R = await db.fetch(`Gold_${message.author.id}`);
  if (R == "Gold") {
    if (LastSee !== null && TimeOut - (Date.now() - LastSee) > 0) {
      let Time = ms(TimeOut - (Date.now() - LastSee));
    } else {
      if (message.author.bot) return;
      if (message.content.length > 1) {
        db.set(`GoldS_${message.author.id}`, Date.now());
        const RevengeNYKS = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(
              "<a:tik4:735790712913920030> Bir Premium Üye Geldi,Hoşgeldin <@" +
              message.author.id +
              ">"
          )
          .setColor("RANDOM");
        message.channel
          .send(RevengeNYKS)
          .then(message => message.delete(12000));
      }
    }
  } else if (R == undefined) {
  }
  if (!R) return;
});

/////////////////////// Gold Üye /////////////////////////




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {////////ukqzn
            reject(e);
        }/////////ukqzn
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};/////////ukqzn
//ukqzn

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   ukqzn
// }); //ukqzn//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);////////ukqzn

//---------------------------------KOMUTLAR---------------------------------\\
client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn

  let kullanıcı = message.mentions.users.first() || message.author;//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  let sebep = afkkullanıcı;
   let isim = db.fetch(`afkK_${message.author.id}`);

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) retrn; //ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
    const embed = new Discord.RichEmbed()//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
       message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  }
    if (afkkullanıcı) {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${kullanıcı.id}> adlı kullanıcı şuan **${sebep}** nedeniyle AFK!`)
      message.channel.send(embed)//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
    }
  }
//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
      message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname(isim)
  }
    }
});

client.on("message", async  msg => {
 var i = await db.fetch(`reklam_${msg.guild.id}`)
    if (i == 'acik') {
       const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz",".rf.gd", ".az", ".party"];
        if (reklam.some(word => msg.content.includes(word))) {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
                  msg.delete();
                    return msg.reply('Reklam yapmak yasak **Mesajın silindi**.').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              
//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
            }              
          } catch(err) {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
  ;
client.on("guildMemberAdd", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;
  client.channels
    .get(frenzykanal)
    .send(
      `O Sunucumuza Yeni Biri Geldi Ve İsmi ${member}, Hoşgeldin  **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
});
client.on("guildMemberRemove", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);//ukqzn
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;//ukqzn
  let sonuç = frenzysayı - member.guild.memberCount;//ukqzn

  client.channels
    .get(frenzykanal)//ukqzn
    .send(
      `${member}, Sunucudan Ayrıldı! **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
  return;//ukqzn
});

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);//ukqzn
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa"//ukqzn
    ) {
      try {
        return msg.reply(//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
          "Aleyküm Selam"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {//ukqzn
  }//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  if (!i) return;
});

///////
  client.on("roleDelete", async(role , guild) => {//ukqzn
  let a = await db.fetch(`rol_${role.guild.id}`);
    if (a == "açık") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) //ukqzn
        role.guild.owner.send(` **${role.name}** Adlı Rol Sılındı Aynısından Ben Tekrar Olusturdum Efendim`)
//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  
}//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
})
/////////////////////KOMUTLARR///////////////////
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//ukqzn
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      if (!i) return;//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
        var embed = new Discord.RichEmbed()
          .setDescription(//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
            "**Sunucuya Yeni Katılan** @" +//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
              member.user.tag +//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
              " **Kullanıcısına** <@&" +//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
              otorol +//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
              ">  **Rolü verildi:white_check_mark:**"
          )//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
          .setColor("0x36393E")
          .setFooter(`Destiny Otorol Sistemi`);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
        member.guild.channels.get(i).send(embed);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      } else if (role) {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
        member.addRole(member.guild.roles.get(otorol));//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
        var embed = new Discord.RichEmbed()//ukqzn
          .setDescription(//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **kullanıcısına** \`${role}\` **rolü verildi.**`//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
          )//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
          .setColor("WHİTE")//ukqzn
          .setFooter(`Destiny Otorol Sistemi`);//ukqzn
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {//ukqzn//ukqzn//ukqzn
      console.log(e);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
    }//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  }//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
});//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn

const invites = {};//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn

const wait = require("util").promisify(setTimeout);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
client.on("ready", () => {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  wait(1000);//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  client.guilds.forEach(g => {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
    g.fetchInvites().then(guildInvites => {//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
      invites[g.id] = guildInvites;//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
    });//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
  });//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn
});//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn//ukqzn










client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **kullanıcı aramızdan ayrıldı :outbox_tray: \nKullanıcıyı davet eden:** \`\`Bulunamadı\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **kullanıcı aramızdan ayrıldı :outbox_tray: \nKullanıcıyı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});
///////////////////HG////////////////////////////
client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı :inbox_tray: \nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu :tada:**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});


client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

  

/////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "+sa-as aç") {
    msg.reply("Başarıyla `Aleyküm selam` Yazmasını açtınız, Artık Bot `sa` Yazıldığında Cevap Verecek.");
  }
});



client.on('message', message => {
 if (message.content.toLowerCase() === '<@53568124976811212>') {
 message.delete()
 message.channel.send(`${message.author},**Etiketlemezsen sevinirim!**`).then(message => message.delete(5000))
}
});

//eklendim-atıldım
client.on("guildCreate", guild => {  // sunucuya eklendim ve atıldım
let add = client.channels.get("740228402304385104")
const eklendim = new Discord.RichEmbed()


.setTitle(`Yeni bir sunucuya eklendim!`)
.setTimestamp()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

add.send(eklendim)//Kolgh Creations

});

client.on("guildDelete", guild => {
let remove = client.channels.get("740228648216428635")
const atildim = new Discord.RichEmbed()

.setTitle(`Sunucudan atıldım :(`)
.setTimestamp()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Sunucu Adı `,guild.name)
.addField(`Sunucu ID  `, guild.id)
.addField(`Kurucu `,guild.owner.user.tag)
.addField(`Kurucu ID `,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

remove.send(atildim)

});

client.on('messageDelete', async message   => { // mod-log
      let modlogs = db.get(`tc-modlog_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setTitle("BİR MESAJ SİLİNDİ")
.setDescription(`<@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`)
  .setFooter("Destiny |  MOD-LOG")
  modlogkanal.sendEmbed(embed);
  })


client.on('guildBanAdd', async message  => {
      let modlogs = db.get(`tc-modlog_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")

	.setDescription(`Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`)
		.setThumbnail(message.user.avatarURL)
  .setFooter("Destiny | MOD-LOG")
  modlogkanal.sendEmbed(embed);
  })
client.on('channelCreate', async channel  => {
      let modlogs = db.get(`tc-modlog_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
	if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
					.setColor('BLUE')
				.setDescription(`${channel.name} adlı metin kanalı oluşturuldu.`)
				.setFooter(`Destiny | MOD-LOG Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor('BLUE')
.setTitle("SES KANALI OLUŞTURULDU")
				.setDescription(`${channel.name} adlı ses kanalı oluşturuldu!`)
				.setFooter(`Destiny | MOD-LOG Sistemi Kanal ID: ${channel.id}`)

				modlogkanal.send({embed});
			}
		
	})
client.on('channelDelete', async channel  => {
      let modlogs = db.get(`tc-modlog_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
	if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
					.setColor('BLUE')
				.setDescription(`${channel.name} adlı metin kanalı silini!`)
				.setFooter(`Destiny | MOD-LOG Sistemi Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor('BLUE')
.setTitle("SES KANALI SİLİNDİ")
				.setDescription(`${channel.name} adlı ses kanalı silindi`)
			.setFooter(`Destiny | MOD-LOG Sistemi  Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			}
	})
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`tc-modlog_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(db.fetch(`tc-modlog_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .addField("Kullanıcı", oldMsg.author.tag, true)
  .addField("Eski Mesaj",`  ${oldMsg.content}  `)
  .addField("Yeni Mesaj", `${newMsg.content}`)
  .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);  
		
	})

client.on('message', async message => {
    if (message.content === 'fakegiriş') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on('message', async message => {
    if (message.content === 'fakeçıkış') {
        client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                if (uyarisayisi === null) {
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Red Reklam Kick Sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> Red Reklam Kick Sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)                
}
                if (uyarisayisi === 1) {
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Red Reklam Kick Sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> Red Reklam Kick Sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 2) {
                    message.delete();
                    await kullanici.kick({
                        reason: `Red Reklam Kick Sistemi`,
                    })
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Red Reklam Kick Sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacakç`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 3) {
                    message.delete();
                    await kullanici.ban({
                        reason: `Red Reklam Ban Sistemi`,
                    })
                    db.delete(`reklamuyari_${message.author.id}`)
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Red Reklam Kick Sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }

            }
        }
    }
});
//yazdığında emojiyle tepki verme
client.on('message', async msg => {
if (msg.author.id == '53568124976811212') {//kendi id
await msg.react('729465199693922366')//emojinin idsi
}
});
client.on("guildMemberAdd", member => {
if(member.guild.id != "729335386656079882") return
  const kanal = "730127827051217007";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    var kontrol;
if (kurulus < 1296000000) kontrol = ' Bu Hesap Güvenilir Değil <a:no1:729465163329044521>'
if (kurulus > 1296000000) kontrol = ' Bu Hesap Güvenilir <a:tik3:729465165845889135>'
  moment.locale("tr");
  let buse = client.channels.get(kanal);
buse.send("<a:maden:729465171918979162> Hoşgeldin " + member + " Seninle `" + member.guild.memberCount + "` Kişiyiz \n\n <a:dance3:729465247752257616>  Sunucuya Kayıt Olmak İçin <#730127827051217007>'a İsim Yaş Yazınız ! \n\n <@&729335386656079884> Rolündeki yetkililer seninle iliglencektir \n\nHesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)") +  "  \n\n"  + kontrol + " \n\n",  new Discord.Attachment("https://cdn.discordapp.com/attachments/730341286607061043/730346668125585418/bandit.jpg"
    )
  );
});
//güvenlik
client.on("guildMemberAdd", async member => {
  // Güvenlik Sistemi
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  if (!kanal) return;
  const attachment = new Discord.Attachment(canvas.toBuffer(), "güvenlik.png");
  kanal.send(attachment);
});

client.on("messageDelete", async message => {
  // mod-log
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setTitle("MESAJ SİLİNDİ")
    .setDescription(
      `<@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`
    )
    .setFooter("Destiny | Log Sistemi");
  modlogkanal.sendEmbed(embed);
});
client.on("guildBanAdd", async message => {
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(
      `Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`
    )
    .setThumbnail(message.user.avatarURL)
    .setFooter("Destiny | Log Sistemi");
  modlogkanal.sendEmbed(embed);
});
client.on("channelCreate", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`${channel.name} adlı metin kanalı oluşturuldu.`)
      .setFooter(`Destiny | Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setTitle("SES KANALI OLUŞTURULDU")
      .setDescription(`${channel.name} adlı ses kanalı oluşturuldu!`)
      .setFooter(`Destiny | Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
});
client.on("channelDelete", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`${channel.name} adlı metin kanalı silini!`)
      .setFooter(`Destiny | Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setTitle("SES KANALI SİLİNDİ")
      .setDescription(`${channel.name} adlı ses kanalı silindi`)
      .setFooter(`Destiny | Log Sistemi  Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`tc-modlog_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(
    db
      .fetch(`tc-modlog_${oldMsg.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .addField("Kullanıcı", oldMsg.author.tag, true)
    .addField("Eski Mesaj", `  ${oldMsg.content}  `)
    .addField("Yeni Mesaj", `${newMsg.content}`)
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});