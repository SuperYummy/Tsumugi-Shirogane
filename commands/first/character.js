const { Command } = require('discord.js-commando');
const { error_occurred } = require(`../../utils/error`);
const { neutral_expression } = require(`../../utils/expression`);
const { member_needs_to_be_admin } = require(`../../utils/permission`);
const { characterSchema } = require(`../../schemas/character-schema`);
const { MessageEmbed } = require(`discord.js`);

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'character',
            aliases: ['chara', 'player'],
            group: 'first',
            memberName: 'character',
            description: 'Add a character for a roleplayer',
            argsType: `multiple`,
        });

    }

    async run(message, args) {

        if (member_needs_to_be_admin(message)) return;

        const { client, guild, author } = message

        try {
            let user_does_not_exist;
            console.log(user_does_not_exist);
            const userID = args[0].replace(/\D/g, "");
            const user_exists_in_the_guild = client.users.cache.get(userID) || (user_does_not_exist = true);
            const administrator = `<@${author.username}>`


            const name = (args[1])


            if (user_exists_in_the_guild) {

                await characterSchema.findOneAndUpdate(
                    { guildID: guild.id, userID: userID },
                    { guildID: guild.id, userID: userID, character: name },
                    { upsert: true });

            }
            else if (user_does_not_exist) {
                
                const retry_command_with_a_valid_user = neutral_expression()
                    .setTitle(`Character`)
                    .setDescription(`\`\`\`${administrator}, no one carries the ${userID} as their ID on this server.\`\`\`\`\`\`Make sure you get the member's ID correctly.\`\`\`\``);

                return message.say(retry_command_with_a_valid_user);

            };

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};