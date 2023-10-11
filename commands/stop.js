exports.run = async (client, message, args) => {

    if(message.author.id == client.config.ownerID){
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle('הבוט נכבה')
        .setDescription('זה יקח 5 שניות בערך')

        console.log(client.config.botName + ` is restarting...`);
        message.channel.send(embed).then(sentMessage =>  process.exit(0))
    }

};
