'use strict';

const Discord = require('discord.js');
const client = new Discord.Client({
    mentionEveryone: false
});
const discordData = require('./discord.json');

module.exports = new Promise((resolve, reject) => {
    client
        .on('ready', () => {
            client
                .resolver
                .resolveGuild('239752912446816256')
                .channels
                .find(channel => channel.id === '241298500074209281')
                .sendMessage('Successfully start `cspspc-github-integration` server.')
                .then(() => resolve(client))
                .catch(err => null);
        });

    client.login(process.env.CGI_DISCORD_TOKEN);
});