const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply(`Bu komutu kullanmak için "Rolleri Yönet" Yetkisine Sahip Olmalısın!`);
  let msgid = args[0];
  if (!msgid) return message.reply("Lütfen bir mesaj ID'si belirtin!");
    /*
  

  
  */
  try {
    message.channel.messages
      .fetch(msgid, { limit: 1 })
      .then(m => {
        try {
          if (m.embeds.length > 0) {
            let rol31 = db.fetch(
              `rolereactions_${message.guild.id}_${msgid}`
            );
            if (!rol31)
              return message.reply("Emoji rol sistemi bulunamadı lütfen oluşturduğunuzdan emin olun!");
            let embed = new Discord.MessageEmbed()
              .setColor("#FF5349")
              .setDescription(
                rol31.text || `<@&${rol31.role}> Rolünü almak için aşağıdaki ${rol31.emoji} emojisine tıklayın!`
              )
              .setFooter("Bu emoji rolü silindi");
            db.delete(`rolereactions_${message.guild.id}_${msgid}`);
            m.edit({ embed });
            message.channel.send("Emoji rol sistemi veritabanından silindi!");
          } else {
            message.reply("Bilinmeyen bir hata oluştu!");
          }
        } catch (e) {
          message.reply("Bu bir emoji rolü mesajı değil lütfen kontrol edin");
        }
      })
      .catch(err => {
        message.channel.send("Mesaj bulunamadı bir hata oluştu " + err.message);
      });
  } catch (e) {
    message.reply("oof bir şeyler ters gitti " + e.message);
  }
};
module.exports.help = {
  name: "rrsil",
  description: "Tepki rolünü siler",
  usage: " <emoji rolü mesaj idsi>",
  aliases: ["rrremove","rrdelete"]
};
