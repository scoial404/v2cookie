const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "lock",
  aliases: [],
  description: "נעילת ערוץ",
  usage: "lock",
  run: async (client, message, args) => {
    // בודק אם למשתמש יש הרשאות לנהל ערוצים
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('אין לך הרשאות מתאימות לביצוע פעולה זו.');

    // משנה את ההרשאות של הערוץ כך שרק מנהלי השרת יכולים לשלוח הודעות
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });

    // משיב הודעה למשתמש עם הסיבה שננעל הערוץ
    const reason = args.join(" ");
    if (!reason) return message.channel.send('יש לציין סיבה לנעילת הערוץ.');

    // מייצר הודעה מותאמת אישית עם פרטי הנעילה
    const embed = new MessageEmbed()
      .setTitle("עדכון ערוץ")
      .setDescription(`הערוץ ננעל`)
      .setColor("#0e1394")
      .setTimestamp()
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'מנהל', value: `${message.author}`, inline: true },
        { name: 'ערוץ', value: `${message.channel}`, inline: true },
        { name: 'סיבה', value: `${reason}` }
      );

    // שולח את ההודעה ומוחק את ההודעה המקורית שהוזנה על ידי המשתמש
    message.channel.send(embed);
    message.delete();
  }
};
