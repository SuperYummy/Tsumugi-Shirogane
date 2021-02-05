const { Command } = require('discord.js-commando');
const  { error_occurred } = require(`../../utils/error`);
const { manage_messages, member_needs_to_be_admin } = require(`../../utils/permission`);

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

    }

    async run(message, args) {

        if (member_needs_to_be_admin(message)) return;
        if (manage_messages(message)) return;

        const { author } = message

        try {

            const user = `<@${author.id}>`;
            const username = author.username;
            const phrase = args.join(` `) || `What would you like me to say, ${user}?\n*Example: \`,,say Hello ${username}!\`*`;
            if (phrase) return message.say(phrase) && message.delete();

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};