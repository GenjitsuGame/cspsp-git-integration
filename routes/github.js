'use strict';

const GitHubWebHooks = require('express-github-webhook');
const handler = GitHubWebHooks({ path: '/' });
const discord = require('../discord');
const Discord = require('../discord/discord.json');

handler.on('push', (repo, data) => {
    discord
        .sendMessageAsync(Discord.channel,
        '`' + data.sender.login + '` has pushed to `' + repo + '` :\n' +
        data.commits.map(commit => '    `' + commit.id.substring(0, 6) + '` ' + commit.message + '\n'), {
            disableEveryone: true
        });
});

handler.on('issues', (repo, data) => {
    discord
        .sendMessageAsync(Discord.channel,
        '`' + data.sender.login + '` has ' + data.action + ' the issue `' + data.issue.number + '#' + data.issue.title + '`\n', { 
            disableEveryone: true
        });
});

module.exports = handler;