'use strict';

const Discord = require('discord.js');
const client = new Discord.Client({
    mentionEveryone: false
});
const discordData = require('./discord.json');

module.exports = new Promise((resolve, reject) => {
    client
        .on('ready', () => {
           resolve(client);
        });

    client.login(process.env.CGI_DISCORD_TOKEN);
});