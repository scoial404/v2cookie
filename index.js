const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('sex'));

app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);

const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose'); // Import the mongoose module
const { MessageEmbed } = require("discord.js");
const { Collection, Client } = require("discord.js");
const { token, default_prefix } = require("./config.json");
const config = require("./config.json");
const db = require("quick.db");
const { readdirSync } = require("fs");
const { join, format } = require("path");

const client = new Discord.Client();

client.config = config;

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: config.botsCanWin,
        embedColor: config.embedColor,
        embedColorEnd: config.embedColorEnd,
        reaction: config.reaction
    }
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://Ace1g:!Ace123!@cluster0.rsoaqwz.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    if (member.id !== client.user.id) {
        console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    if (member.id !== client.user.id) {
        console.log(`${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`👌 Command loaded: ${commandName}`);
    });
});

// Define the MongoDB model for ticket transcripts
client.ticketTranscript = mongoose.model('transcripts', new mongoose.Schema({
    Channel: String,
    Content: Array
}));

client.on('message', async (message) => {
    if (message.channel.parentID !== '1157604854290710538') return;
    client.ticketTranscript.findOne({ Channel: message.channel.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            console.log('there is data');
            data.Content.push(`${message.author.tag} : ${message.content}`);
        } else {
            console.log('there is no data');
            data = new client.ticketTranscript({ Channel: message.channel.id, Content: [`${message.author.tag} : ${message.content}`] });
        }
        await data.save().catch(err => console.log(err));
        console.log('data is saved ');
    });
});

// Login
if (client.config.useENV == true) {
    require('dotenv').config();
    client.login(process.env.TOKEN);
} else {
    client.login(client.config.token);
}
