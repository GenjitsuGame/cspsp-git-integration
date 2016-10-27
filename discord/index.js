'use strict';
const Promise = require('bluebird');
const Discord = require('discord.js');
const client = Discord.client();

Promise.promisfyAll(client);

var attempts = 0;
var loggedIn = false;

(function login() {
   return client
        .loginWithTokenAsync(process.env.CGI_DISCORD_TOKEN)
        .then(() => {
            attempts = 0
            loggedIn = true;
        })
        .catch(err => {
            attempts++;
            return login();    
        });
})();

module.exports = loggedIn ? Promise.resolve(client) : login();