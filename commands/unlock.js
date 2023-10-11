const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "unlock",
  aliases: [],
  description: "שלח הודעה עם פתיחת הערוץ!",
  usage: "unlock",
  run: async (client, message, args) => {
    // שינוי ההרשאות של הערוץ כך שכל החברים יוכלו לשלוח הודעות
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });

    const reason = args.join(" ");
    if (!reason) return message.channel.send('יש להוסיף סיבה');

    const embed = new MessageEmbed()
      .setTitle("עדכון ערוץ")
      .setDescription(`הערוץ נפתח`)
      .setColor("#0e1394")
      .setTimestamp()
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'מנהל', value: `${message.author}`, inline: true },
        { name: 'ערוץ', value: `${message.channel}`, inline: true },
        { name: 'סיבה', value: `${reason}`}
      );

    // שולח הודעה ומוחק את ההודעה המקורית שהוזנה על ידי המשתמש
    message.channel.send(embed);
    message.delete();
  }
};
