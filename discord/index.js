'use strict';
const Promise = require('bluebird');
const Discord = require('discord.js');
const client = new Discord.Client();
const discordData = require('./discord.json');

Promise.promisifyAll(client);

var attempts = 0;
var loggedIn = false;

(function login() {
   return client
        .loginWithTokenAsync(process.env.CGI_DISCORD_TOKEN)
        .then(() => {
            attempts = 0
            loggedIn = true;
            return client
                .sendMessageAsync(discordData.channel, 'Successfully started `cspspc-github-integration` service.', null)
                .finally(() => client);
        })
        .catch(err => {
            attempts++;
            if (attempts > 10) return process.exit(1);
            return login();    
        });
})();

module.exports = loggedIn ? Promise.resolve(client) : login();