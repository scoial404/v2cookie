const Discord = require('discord.js');
const bot = new Discord.Client();
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: `dm`,
    aliases: [`dm`],
    run: async function(client, message, args) {
        let CommandChannel = client.channels.cache.get('1160557481886494824')
        if (!CommandChannel) return message.channel.send("Please create a suggestions channel");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌שגיאה: אין לך הרשאה לבצע פקודה זו!");

        let user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        if (!user)
            return message.reply(`לא תייגת את האיש שאתה רוצה לשלוח לו הודעה דרך הבוט`);
        if (!args.slice(1).join(" "))
            return message.reply("לא הזנת הודעה");

        user.user.send(args.slice(1).join(" "))
            .then(() => {
                message.reply(`שלחתי הודעה למשתמש ${user.user.tag}`)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                    .catch(/*טיפול בשגיאות אם ההודעה לא נשלחה או נמחקה*/);
            })
            .catch(() => {
                message.reply("לא ניתן לשלוח הודעה למשתמש זה!")
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                    .catch(/*טיפול בשגיאות אם ההודעה לא נשלחה או נמחקה*/);
            });
    }
}
