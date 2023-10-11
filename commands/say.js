const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: `say`,
    aliases: [`say`],
    run: async function(client, message, args) {
        message.delete()
        const sayEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
            .setDescription(args.join(" "))
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('${message.guild.name} | Bot')

        message.channel.send(sayEmbed)
    },
};