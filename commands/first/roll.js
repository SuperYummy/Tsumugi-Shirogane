const { Command } = require('discord.js-commando');
const { error_occurred } = require(`../../utils/error`);
const { neutral_expression, negative_expression, sad_expression } = require(`../../utils/expression`);
const { manage_messages } = require(`../../utils/permission`);
const { prefix } = require(`../../config.json`)

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            aliases: ['die', 'dice'],
            group: 'first',
            memberName: 'roll',
            description: 'Replies with the text you provide.',
            argsType: `multiple`,
        });

    }

    async run(message, args) {

        if (manage_messages(message)) return;
        const neutral = neutral_expression().setTitle(`Roll`)
        const negative = negative_expression().setTitle(`Roll`)
        const sad = sad_expression().setTitle(`Roll`)

        const { author } = message
        const username = author.username

        try {

            const an_extra_argument_is_provided = args[1]
            const first_argument = args[0]
            console.log(first_argument)

            /**
             * Checks if the number is an integer
             * 
             * Integer means a whole number. What? You still don't know what it means? Google is your friend.
             */
            function isInt(value) {

                const find_number = parseFloat(value);
                const an_actual_number = !isNaN(value);
                const no_idea_what_this_means_hahaha = (find_number | 0) === find_number;
                console.log(find_number, an_actual_number, no_idea_what_this_means_hahaha)
                console.log((find_number | 0))
                return an_actual_number && no_idea_what_this_means_hahaha;

            }

            const first_argument_is_not_a_number_but_a_word = isNaN(first_argument)
            // If the number is 999,999,999 or over, an error occurs because Javascript sucks that it cannot handle big numbers 
            const number_is_999x999x999_or_over = first_argument > 1_000_000_000
            const number_is_not_an_integer = !isInt(first_argument)
            const number_is_less_than_1 = first_argument < 1
            const number_is_equal_to_1 = first_argument == 1


            if (an_extra_argument_is_provided) {

                const show_extra_arguments_only = function () {

                    let all_arguments_provided = args
                    // The first_argument aka "args[0]" is the only one not considered an extra.
                    all_arguments_provided.shift(first_argument)
                    return all_arguments_provided.join(` `) || all_arguments_provided

                }

                const check_if_first_argument_is_a_number = function () {

                    const first_argument_is_a_number = !isNaN(first_argument);
                    if (first_argument_is_a_number) return `You don't have to include those extras except the number "${first_argument}" you put.`;
                    else return `You don't have to include those extras, and "${first_argument}" needs to be the actual number you want to roll equal to and below.`;

                }

                message.say(neutral.setDescription(`\`\`\`Why did you place "${show_extra_arguments_only()}" in your \`roll\` command?\`\`\`\`\`\`${check_if_first_argument_is_a_number()}\`\`\`\`\`\`Try following these examples:\`\`\`\n\`${prefix}roll <number>\`\n\`${prefix}roll 5\``))

            }
            else if (number_is_999x999x999_or_over) {

                message.say(sad.setDescription(`\`\`\`I'm sorry, ${username}. The number is too big for me to handle.\`\`\`\`\`\`The maximum number I could do is equal to and below 1,000,000,000.\`\`\``))

            }
            else if (first_argument_is_not_a_number_but_a_word) {

                message.say(negative.setDescription(`\`\`\`${username}, "${first_argument}" is a word or something, not an actual number.\`\`\`\`\`\`Maybe try following these examples:\`\`\`\n\`${prefix}roll <number>\`\n\`${prefix}roll 5\`\n\`${prefix}roll 999999999.\``))

            }
            else if (number_is_not_an_integer) {

                message.say(negative.setDescription(`\`\`\`${username}, "${first_argument}" is not a whole number, and we don't support decimal numbers.\`\`\`\`\`\`Maybe try following these examples:\`\`\`\n\`${prefix}roll <number>\`\n\`${prefix}roll 5\``))

            }
            else if (number_is_equal_to_1) {

                message.say(negative.setDescription(`\`\`\`Rolling a random number in a condition where the maximum number is 1 will only result in 1, ${username}...\`\`\` `))

            }
            else if (number_is_less_than_1) {

                message.say(negative.setDescription(`\`\`\`Rolling a random number in a condition where the maximum number is less than 1 will only result in 0 or nothing, ${username}...\`\`\``))

            }
            else {

                // This function makes it impossible to roll the number "0".
                function limit_up_to_1(value) {

                    if (value == 0) return 1;

                }

                // A secret for people who say "11307" or the result appears to be "11307". Hehehe, why not? Adding secrets are fun!
                function secret_number(value) {
                    
                    if (value == 11307) return `Haha, very funny. Anyways, here's the number you rolled:`
                    // This means do nothing or don't say the line ABOVE ^ this comment if no number shows "11307"
                    else return ``

                }

                const first_argument_of_maximum_number = first_argument
                const roll_a_random_number_equal_to_or_less_than_the_maximum_number = Math.random() * first_argument_of_maximum_number;
                const round_the_result_to_the_nearest_integer = Math.round(roll_a_random_number_equal_to_or_less_than_the_maximum_number);

                message.say(`${secret_number(round_the_result_to_the_nearest_integer) || secret_number(first_argument)}\n${limit_up_to_1(round_the_result_to_the_nearest_integer) || round_the_result_to_the_nearest_integer}`)

            }

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};