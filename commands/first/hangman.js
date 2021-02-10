const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`)
const { error_occurred } = require(`../../utils/error`);
const { show_letters_used } = require(`../../utils/specification/hangman/letters-used`);
const { show_hangman } = require(`../../utils/specification/hangman/picture`);
const { pick_a_word } = require(`../../utils/specification/hangman/pick-a-word`);
const { hide_the_word } = require(`../../utils/specification/hangman/hide-word`);


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hangman',
            aliases: ['gambit'],
            group: 'first',
            memberName: 'hangman',
            description: 'play hangman',
        });

    };

    async run(message, args) {

        try {

            const word = pick_a_word() // example: plain
            const capitalise_all_letters = word.toUpperCase() // example: plain => PLAIN
            const split_all_letters_from_each_other_into_array = capitalise_all_letters.split(``) // example: PLAIN => [`P`, `L`, `A`, `I`, `N`]
            const array_of_letters = split_all_letters_from_each_other_into_array // reference: [`P`, `L`, `A`, `I`, `N`]
            let hidden = []; // create array
            hide_the_word(array_of_letters, hidden); // example: [`P`, `L`, `A`, `I`, `N`] => [`_`, `_`, `_`, `_`, `_`]
            const hidden_word = hidden.join(` `) // example: [`_`, `_`, `_`, `_`, `_`] => "_ _ _ _ _"
            let array_for_showing_letters_used = [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
            let guesses = 0;

            const hangman_beginning = new MessageEmbed()
                .setColor('#e5b3b5')
                .setTitle(`Hangman Gambit`)
                .setDescription
                (
                /**/  `\`\`\`${hidden_word}\`\`\``
                    + `\`\`\`${show_hangman(guesses)}\`\`\``

                    + `\`\`\`letters guessed: ${array_for_showing_letters_used.join(` `)}\`\`\``
                );

            message.say(hangman_beginning).then(async game => {

                while (guesses <= 6) {

                    const hidden_word_has_been_completed = !hidden.includes(`_`);
                    const all_letters_guessed = array_for_showing_letters_used.join(` `)

                    if (hidden_word_has_been_completed) { // Stops the game when the user completes the word

                        const comepleted_word = hidden.join(` `)

                        const congratulation = new MessageEmbed()
                            .setColor('#e5b3b5')
                            .setTitle(`Hangman Gambit`)
                            .setDescription
                            (
                                /**/  `\`\`\`${comepleted_word}\`\`\``
                                + `\`\`\`${show_hangman(guesses)}\`\`\``

                                + `\`\`\`letters guessed: ${all_letters_guessed}\`\`\``

                                + `\`\`\`Congratulation, friend.\`\`\``
                            )

                        game.edit(congratulation)

                        break;

                    }

                    const filter = m => m.author.id === message.author.id // The bot won't responds to other users' answers
                    await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then((message) => {

                        if (message) {

                            message = message.first()
                            const array_of_words_from_message_content = message.content.split(` `)
                            const letter_guessed = array_of_words_from_message_content.shift().toUpperCase() // the user's response of the letter guessed => example: `a`

                            function checks_whether_letter_is_correct_or_wrong(letter) {

                                const hidden_word_has_the_letter_guessed = (array_of_letters.some(array => letter.toUpperCase().includes(array)));
                                const decrease_guess_count_by_1 = guesses++;

                                if (hidden_word_has_the_letter_guessed) {

                                    let letter_has_been_found = array_of_letters;

                                    array_of_letters.forEach(letter => {

                                        const hidden_word_has_the_letter_guessed = letter == letter_guessed

                                        if (hidden_word_has_the_letter_guessed) {

                                            const index_of_found_letter = letter_has_been_found.indexOf(letter); // Identifies the index of the letter guessed (for the next code line)
                                            letter_has_been_found[index_of_found_letter] = `!`; // Helps ignore letters that the users has already guessed => example: saying `a` twice
                                            hidden[index_of_found_letter] = letter; // Reveals the letter guessed => example: (Magician) "_ _ _ _ _ _ _ _" => _ A _ _ _ _ A _

                                        }

                                    })

                                } else decrease_guess_count_by_1; // In hangman (or at least this game), the user has a maximum of 6 chances of finding the correct letter of the hidden word

                            };

                            show_letters_used(letter_guessed, array_for_showing_letters_used);
                            const all_letters_that_have_been_guessed = array_for_showing_letters_used.join(` `);
                            checks_whether_letter_is_correct_or_wrong(letter_guessed);

                            const letters_remaining_to_guess = hidden.join(` `);
                            const user_still_has_chances_to_complete_the_word = guesses <= 6;

                            if (user_still_has_chances_to_complete_the_word) {

                                const hangman_progress = new MessageEmbed()
                                    .setColor('#e5b3b5')
                                    .setTitle(`Hangman Gambit`)
                                    .setDescription(
                                /**/  `\`\`\`${letters_remaining_to_guess}\`\`\``
                                        + `\`\`\`${show_hangman(guesses)}\`\`\``

                                        + `\`\`\`letters guessed: ${all_letters_that_have_been_guessed}\`\`\``);

                                game.edit(hangman_progress) && message.delete();

                            }
                            else {

                                const you_lose = new MessageEmbed()
                                    .setColor('#e5b3b5')
                                    .setTitle(`Hangman Gambit`)
                                    .setDescription
                                    (
                                /**/  `\`\`\`The word was: ${word.toUpperCase()}\`\`\``
                                        + `\`\`\`${show_hangman(guesses)}\`\`\``

                                        + `\`\`\`letters guessed: ${all_letters_that_have_been_guessed}\`\`\``

                                        + `\`\`\`Nice try, friend.\`\`\``
                                    )

                                game.edit(you_lose)

                            }
                        }
                        
                    }).catch(collected => message.say(`Um, are you there, ${author.username}? Guess I'll cancel this game.`))

                }

            });

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};