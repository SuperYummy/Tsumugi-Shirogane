const { Command } = require('discord.js-commando');
const Oops = require(`./error`);

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['parrot', 'copy'],
            group: 'first',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            argsType: `multiple`,
        });

    };

    run(message, args) {

        const { member, author, guild } = message

        if (!member.hasPermission(`ADMINISTRATOR`)) return message.say(`You need the "Administrator" permission for this command.`);
        if (!guild.me.hasPermission(`ADMINISTRATOR` && `MANAGE_MESSAGES`)) return message.reply(`I need one of the following permissions for the \`say\` command to work:\n- Administrator\n- Manage messages`); 

        try {

            const user = `<@${author.id}>`;
            const username = author.username;
            const phrase = args.join(` `) || `What would you like me to say, ${user}?\n*Example: \`,,say Hello ${username}!\`*`;
            if (phrase) return message.say(phrase) && message.delete();

        } catch (err) {

            console.error(err);
            message.say(Oops);

        };
    };
};