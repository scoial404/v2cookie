const ms = require('ms');

exports.run = async (client, message, args) => {
  let giveawayChannel = ''
  let giveawayDuration = ''
  let giveawayNumberWinners = ''
  let giveawayPrize = ''
  let status = ''

  // If the member doesn't have enough permissions
  if (!message.member.roles.cache.some((r) => r.name === client.config.giveawayRole)) {
    return message.channel.send(`<a:X_:1156174331060178964> אין לך גישה לפקודה זאת`);
  }

  // Giveaway channel
  async function part1() {
    await message.channel.send(`>>> ${client.config.giveawayEmoji} תתייג את החדר שאתה רוצה לבצע בו את ההגרלה.\nתכתוב \`ביטול\` לביטול ההגרלה.`)
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
      { max: 1, time: 1800000 }).then(collected => {
        if (collected.first().content.toLowerCase() == 'ביטול') {
          message.channel.send('**ההגרלה בוטלה**')
          status = 1
          return
        } else {
          giveawayChannel = collected.first().mentions.channels.first()
          if (!giveawayChannel) {
            message.reply('לא תייגת את החדר שאתה רוצה שתיהיה בו ההגרלה\nנסה שוב את הפקודה')
            status = 1
          }
        }
      }).catch(() => {
        message.reply('<a:X_:1156174331060178964> Erorr!! תפנה למנהל הבוט');
        status = 1
      })
  }

  // Giveaway duration
  async function part2() {
    await message.channel.send(`>>> ${client.config.giveawayEmoji} כמה זמן אתה רוצה שתיהיה ההגרלה?\nתכתוב \`ביטול\` לביטול ההגרלה.`)
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
      { max: 1, time: 1800000 }).then(collected => {
        if (collected.first().content.toLowerCase() == 'ביטול') {
          message.channel.send('**ההגרלה בוטלה**')
          status = 1
          return
        } else
          if (isNaN(ms(collected.first().content.toLowerCase()))) {
            message.channel.send('<a:X_:1156174331060178964> לא ציינת זמן אפשרי');
            status = 1
            return
          } else {
            giveawayDuration = collected.first().content
          }
      }).catch(() => {
        message.reply('<a:X_:1156174331060178964> Erorr!! תפנה למנהל הבוט');
        status = 1
      })
  }

  // Number of winners
  async function part3() {
    await message.channel.send(`>>> ${client.config.giveawayEmoji} כמה זוכים אתה רוצה שתיהיה בהגרלה?\n**עד 10**\nתכתוב \`ביטול\` לביטול ההגרלה`)
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
      { max: 1, time: 1800000 }).then(collected => {
        if (collected.first().content.toLowerCase() == 'ביטול') {
          message.channel.send('**ההגרלה בוטלה**')
          status = 1
          return
        } else
          if (isNaN(collected.first().content.toLowerCase()) || (parseInt(collected.first().content.toLowerCase()) <= 0)) {
            message.channel.send('<a:X_:1156174331060178964> לא ציינת כמות זוכים אפשרית');
            status = 1
            return
          } else
            if (collected.first().content.toLowerCase() > 10) {
              message.channel.send('<a:X_:1156174331060178964> אתה חייב פחות מ10 זוכים');
              status = 1
              return
            } else {
              giveawayNumberWinners = collected.first().content
            }
      }).catch(() => {
        message.reply('<a:X_:1156174331060178964> Erorr!! תפנה למנהל הבוט');
        status = 1
      })
  }

  // Giveaway prize
  async function part4() {
    await message.channel.send(`>>> ${client.config.giveawayEmoji} איזה פרס אתה רוצה לעשות בהגרלה?\nתכתוב \`ביטול\` לביטול ההגרלה`)
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
      { max: 1, time: 1800000 }).then(collected => {
        if (collected.first().content.toLowerCase() == 'ביטול') {
          message.channel.send('**ההגרלה בוטלה!**')
          status = 1
          return
        } else {
          giveawayPrize = collected.first().content
        }
      }).catch(() => {
        message.reply('<a:X_:1156174331060178964> Erorr!! תפנה למנהל הבוט');
        status = 1
      })
  }

  // Start the giveaway
  async function part5() {
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      time: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayNumberWinners),
      // Who hosts this giveaway
      hostedBy: client.config.hostedBy ? message.author : null,
      // Messages
      messages: {
        giveaway: (client.config.everyoneMention ? "||@everyone||\n\n" : "") + client.config.giveawayEmoji + " **הגרלה חדשה!!** " + client.config.giveawayEmoji,
        giveawayEnded: (client.config.everyoneMention ? "||@everyone||\n\n" : "") + client.config.giveawayEmoji + "** GIVEAWAY ENDED **" + client.config.giveawayEmoji,
        timeRemaining: "זמן שנשאר: **{duration}**!",
        inviteToParticipate: "תלחץ על האימוגי " + client.config.reaction + " כדי להכנס להגרלה",
        winMessage: client.config.giveawayEmoji + " {winners} זכה/זכו ב- **{prize}**!",
        embedFooter: client.config.botName,
        noWinner: "ההגרלה בוטלה כי אין משתתפים",
        hostedBy: "נוצר על ידי: {user}",
        winners: "זוכה -",
        endedAt: "נגמר כבר ב-",
        units: {
          seconds: "שניות",
          minutes: "דקות",
          hours: "שעות",
          days: "ימים",
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
      }
    });

    message.channel.send(`${client.config.giveawayEmoji} ההגרלה שלחה נוצרה בהצלחה בחדר <a:V_:1156174334507888691> <#${giveawayChannel.id}>`);
  }

  async function main() {
    await part1()
    if (status) return
    await part2()
    if (status) return
    await part3()
    if (status) return
    await part4()
    if (status) return
    await part5()
  }

  main()

};