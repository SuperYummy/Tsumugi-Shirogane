const { Command } = require('discord.js-commando');
const  commandPrefixSchema  = require(`../../schemas/command-prefix-schema`)

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'abcdefghijklmnopqrstuvwxyz',
            group: 'first',
            memberName: 'abcdefghijklmnopqrstuvwxyz',
            description: `abc`,
            argsType: `multiple`,
        });

    }

    async run(message, args) {

        const guildId = message.guild.id
        const prefix = args[0]

        await commandPrefixSchema.findOneAndUpdate(
            { guildID: guildId },
            { guildID: guildId, prefix: args[0] },
            { upsert: true });

        message.reply(`Success! The prefix for this bot is now ${prefix}.`)


    }
}