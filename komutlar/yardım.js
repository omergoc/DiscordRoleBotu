const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let embed = new Discord.MessageEmbed()
  .setAuthor('Yardım Komutları', message.author.displayAvatarURL())
  .setThumbnail(client.user.avatarURL())
  .setColor('#FFE800')
  .setDescription(`**KOMUTLAR:**
  **\`!rroluştur\`** - **Emoji Rol Sistemini Oluşturursunuz!**
  **\`!rrsil\`** - **Emoji Rol Sistemini Silersiniz!**
  **\`!rrlist\`** - **Kullanılan emoji rol sistemlerini gösterir!**
`)
  /*
  

  
  */
  .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
  message.channel.send(embed)

  
}
    

module.exports.help = {
  name: "yardım",
  description: "Yardım Komutu",
  usage: " ",
  aliases: ["help"]
};
