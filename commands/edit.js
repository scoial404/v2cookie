exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.roles.cache.some((r) => r.name === client.config.giveawayRole)){
        return message.channel.send(`<a:X_:1156174331060178964> אין לך מספיק גישות`);
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send('<a:X_:1156174331060178964> תבחר איידי של הגרלה כדי לעשות לה עריכה');
    }

    // If no field to edit is specifed
    if(!args[1]){
        return message.channel.send('<a:X_:1156174331060178964> אתה צריך לערוך את הפרס או את הזוכים!');
    }

    if(args[1] === 'prize'){
        let newPrize = args.slice(2).join(' ')

        if(!newPrize) return message.channel.send('<a:X_:1156174331060178964> אתה חייב לציין פרס חדש');

        client.giveawaysManager.edit(args[0], {
            newPrize: newPrize,
        }).then(() => {
            // here, we can calculate the time after which we are sure that the lib will update the giveaway
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('<a:V_:1156174334507888691> ההגרלה תתעדכן עוד -  ' + numberOfSecondsMax + ' שניות');
        }).catch((err) => {
            message.channel.send(`<a:X_:1156174331060178964> לא מצאתי הגרלה ל-\`${args[0]}\`, תבדוק את ההודעה הנכונה ותעשה שוב את הפקודה`);
        });
    }else
    if(args[1] === 'winners'){
        let newWinners = args[2]
        if(isNaN(newWinners) || (parseInt(newWinners) <= 0)){
            return message.channel.send('<a:X_:1156174331060178964> לא ציינת מספר זוכים נכון');
        }

        client.giveawaysManager.edit(args[0], {
            newWinnerCount: newWinners,
        }).then(() => {
            // here, we can calculate the time after which we are sure that the lib will update the giveaway
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('<a:V_:1156174334507888691> -כמות הזוכים תתעדכן בעוד כ ' + numberOfSecondsMax + ' שניות.');
        }).catch((err) => {
            message.channel.send(`<a:X_:1156174331060178964> לא נמצא הגרלה ל- \`${args[0]}\`, תבדוק את ההודעות ותבצע את הפקודה מחדש`);
        });
    }else{
        return message.channel.send('<a:X_:1156174331060178964> אתה צריך לערוך את הפרס או את הזוכים!');
    }
};
