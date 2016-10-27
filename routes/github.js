'use strict';

const GitHubWebHooks = require('express-github-webhook');
const handler = GitHubWebHooks({ path: '/' });
const discord = require('../discord');
const discordData = require('../discord/discord.json');

handler.on('push', (repo, data) => {
    discord
        .then(client => {
            client
                .sendMessageAsync(discordData.channel,
                '`' + data.sender.login + '` has pushed to `' + repo + '` :\n' +
                data.commits.map(commit => '    `' + commit.id.substring(0, 6) + '` ' + commit.message + '\n'), {
                    disableEveryone: true
                });
        });
});

handler.on('issues', (repo, data) => {
    discord
        .then(client => {
            client
                .sendMessageAsync(discordData.channel,
                '`' + data.sender.login + '` has ' + data.action + ' the issue `' + data.issue.number + '#' + data.issue.title + '`\n', {
                    disableEveryone: true
                });
        });
});

module.exports = handler;