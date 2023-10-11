const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { MessageActionRow, MessageEmbed } = require("discord-buttons");

module.exports = {
  name: "h",
  aliases: ["h"],
  description: "h Command!",
  usage: "h | <Command Name>",
  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#3575ed')
    .addField("__**User:**__",`${message.author} | צריך עזרה`)
    .addField("__**Voice:**__",`${message.member.voice.channel || "\⛔️ לא בחדר דיבור \⛔️"} `)
    .addField("__**Roles Staff:**__",`<@&1160557661801168996>`)
    .addField("__**Reason:**__",`${args.join(" ") || "לא צוינה סיבה | <:0037pi1sppm71:1160594845761536070>"}`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(`${message.author.tag} `,message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
   
    message.channel.send(embed)
  }
};