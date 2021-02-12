const { Command } = require('discord.js-commando');
const { error_occurred } = require(`../../utils/error`);
const { manage_messages, member_needs_to_be_admin } = require(`../../utils/permission`);

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['z'],
            group: 'first',
            memberName: 'test',
            description: 'Testing command',
            argsType: `multiple`,
        });

    }

    async run(message, args) {



        try {

            const filter = m => m.author.id === message.author.id // The bot won't responds to other users' answers
            await message.channel.awaitMessages(filter, { max: 1, time: 1000, errors: ['timeout'] }).then((args) => {
                message.say(`awaiting request`)
                if (args) {
                    args = args.first()
                    message.say(`You said ${args || `nothing`}.`)
                }

                if (message.content.split(` `).shift() == `,,test`) {
                    
                }
            })

        

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};