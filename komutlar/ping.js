const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let start = new Discord.MessageEmbed()
    .setAuthor("Ping?")
    .setColor("#FF5349");
  const m = await message.channel.send(start);
  db.set(`test`, Date.now());
  let test = db.fetch(`test`);
  let TIMEE = Date.now() - test;

  let finisg = new Discord.MessageEmbed()

    .setDescription(
      `Mesaj gecikmesi\`${m.createdTimestamp -
        message.createdTimestamp}\`ms\nWebsocket gecikmesi\`${
        client.ws.ping
      }\`ms\nVeritabanı gecikmesi\`${TIMEE}\`ms`
    )
    .setColor("#FF5349");
  m.edit(finisg);
};
module.exports.help = {
  name: "ping",
  description: "",
  usage: " ",
  aliases: ["ping"],
  
};
