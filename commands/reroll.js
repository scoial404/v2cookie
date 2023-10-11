const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.roles.cache.some((r) => r.name === client.config.giveawayRole)){
        return message.channel.send(`<a:X_:1156174331060178964> אין לך גישות`);
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send('<a:X_:1156174331060178964> לא ציינת את האיידי של ההגרלה');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        message.channel.send(`<a:X_:1156174331060178964> לא נמצא שום הגרלה - \`${messageID}\`, תבדוק אם לא טעית ונסה שינית`);
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID, {
        messages: {
            congrat: client.config.giveawayEmoji + 'זוכה/זוכים חדש/ים : {winners}! מזל טוב!'
        }
    })
    .then(() => {
        // Success message
        message.channel.send('<a:V_:1156174334507888691> הושלם הרירול');
    })
    .catch((e) => {
        if(e.startsWith(`ההגרלה - ${giveaway.messageID} לא נגמרה`)){
            message.channel.send('This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send('<a:X_:1156174331060178964> There was an error');
        }
    });

};
