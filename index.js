const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { token, developerID, prefix, supportServerInvitiation } = require(`./config.json`)

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: developerID,
    invite: supportServerInvitiation,
});
//https://discord.com/oauth2/authorize?client_id=806207784210530354&scope=bot&permissions=8

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['first', 'Your First Command Group'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        args: false,
        unknownCommand: false,
        ping: false,
        commandState: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.users.cache.get(developerID).send(`Hi!`)
    client.user.setActivity('Danganronpa V3: Killing Harmony');
});

client.login(token);