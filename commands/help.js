const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle(client.config.botName)
        .setDescription(`לעוד מידע תפנו אל - <@${client.config.ownerID}>`);
    
    const ticketCommands = [
        {
            name: 'add',
            description: 'מוסיף מישהו לטיקט'
        },
        {
            name: 'close',
            description: 'סוגר את הטיקט'
        },
        {
            name: 'create',
            description: 'יוצר הגרלה'
        },
        {
            name: 'delete',
            description: 'מוחק את הטיקט'
        },
        {
            name: 'edit',
            description: 'עריכת הגרלה'
        },
        {
            name: 'end',
            description: 'לגמור הגרלה מוקדם יותר'
        },
        {
            name: 'list',
            description: 'רשימת ההגרלה הפעילות'
        },
        {
            name: 'new',
            description: 'טיקט חדש'
        },
        {
            name: 'open',
            description: 'אם אתה סוגר את הטיקט זה מחזיר אותו ופותח אותו'
        },
        {
            name: 'transcript',
            description: 'שולח את כל הצאט של הטיקט'
        }
    ];

    const verifyCommands = [
        {
            name: 'verify',
            description: 'מביא לך רול של ממבר'
        }
    ];

    const giveawayCommands = [
        {
            name: 'create',
            description: 'יוצר הגרלה'
        },
        {
            name: 'list',
            description: 'רשימת ההגרלה הפעילות'
        },
        {
            name: 'reroll',
            description: 'שולח זוכה אחר להגרלה'
        },
        {
            name: 'edit',
            description: 'עריכת הגרלה'
        },
        {
            name: 'end',
            description: 'לגמור הגרלה מוקדם יותר'
        },
        {
            name: 'delete',
            description: 'מוחק את ההגרלה'
        }
    ];

    embed.addField("<:ticket:1160204128337793154>**__פקודות טיקטים__**<:ticket:1160204128337793154>", ticketCommands.map(cmd => `**${client.config.prefix}${cmd.name}**: ${cmd.description}`).join("\n"));
    embed.addField("<a:V_:1156174334507888691>**__פקודות verify__**<a:V_:1156174334507888691>", verifyCommands.map(cmd => `**${client.config.prefix}${cmd.name}**: ${cmd.description}`).join("\n"));
    embed.addField("<a:tadap:1149387656032165928>**__פקודות הגרלות__**<a:tadap:1149387656032165928>", giveawayCommands.map(cmd => `**${client.config.prefix}${cmd.name}**: ${cmd.description}`).join("\n"));

    message.channel.send(embed);
};
