const express = require("express");
const app = express();
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});

let token = "OTM4ODczNzMwNjQwMjU3MDI0.YfwoTA.aLOq8gh6Brf_0L4Az5Z1ArtgM98"

const port = 1000;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const fs = require("fs");
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Komut dosyaları bulunamadı!");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Events Dosyaları Bulunamadı!");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Eventler Yükleniyor: ${eventName}`);
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
  });
});


client.login(token);
