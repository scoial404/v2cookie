const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some((r) => r.name === client.config.giveawayRole)){
        return message.channel.send(`<a:X_:1156174331060178964> אין לך מספיק גישות`);
    }

    if(!args[0]){
        return message.channel.send('<a:X_:1156174331060178964> לא ציינת איידי להגרלה');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('<a:X_:1156174331060178964> לא מצליח למצוא הגרלה עבור `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('<a:V_:1156174334507888691> ההגרלה תסתיים מפחות מ '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' שניות...');
    })
    .catch((e) => {
        if(e.startsWith(`ההגרלה - ${giveaway.messageID} כבר הסתיימה.`)){
            message.channel.send('ההגרלה הסתיימה כבר');
        } else {
            console.error(e);
            message.channel.send('<a:X_:1156174331060178964> There was an error');
        }
    });

};
