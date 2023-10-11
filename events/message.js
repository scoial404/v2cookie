const config = require('../config.json');
const Discord = require('discord.js');
const db = require('quick.db');
import chalk from 'chalk';

module.exports = async (client, message) => {
    let prefix = config.prefix;
    try {
        if (message.author.bot || message.channel.type === "dm") return;

        if ((message.content === `<@${client.user.id}>`) || (message.content === `<@!${client.user.id}>`)) {
            message.channel.send(`My Prefix is ${config.prefix}`);
        }

        if (!message.content.startsWith(prefix)) return;

        let timeout = 60 * 1000;
        let myDaily = await db.get(`timeout`);

        if (!db.has(`${message.guild.id}.${message.author.id}.messageCount`)) {
            db.set(`${message.guild.id}.${message.author.id}.messageCount`, 1);
        } else {
            db.add(`${message.guild.id}.${message.author.id}.messageCount`, 1);
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
        if (cmd) {
            cmd.execute(client, message, args);
        }
    } catch (error) {
        console.log(error);
    }
};
