const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`)
const { error_occurred } = require(`../../utils/error`);
const { show_letters_used, show_hangman } = require(`../../utils/specification/hangman`);


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'Hangman',
            aliases: ['gambit'],
            group: 'first',
            memberName: 'test',
            description: 'testestestest',
        });

    };

    async run(message, args) {

        try {

            function pick_a_word() {

                const available_words_to_solve =
                    [
                        `Hope`,
                        `Despair`,
                        `Ultimate talent`,
                        `Hair`,
                        `Trigger Happy Havoc`,
                        `Goodbye Despair`,
                        `Killing Harmony`,
                        `Mastermind`,
                        `Class trial`,
                        `Blackened`,
                        `Handbook`,
                        `Monocoins`,
                        `Accomplice`,
                        `Jabberock Island`,
                        `Orange juice`,
                        `Seesaw`,
                        `Blackened`,
                        `Cospox`,
                        `Alter ego`,
                        `Future Foundation`,
                        `Blackened`,
                        `Ultra Despair Girls`,
                        `Blackened`,
                        `MonoMono machine`,
                        `Execution`,
                        `Punishment`,
                        `Sparkling Justice`,
                        `Blackened`,
                        // =========== Talents
                        // A
                        `Adventurer`,
                        `Affluent progeny`,
                        `Aikido Master`,
                        `Animator`,
                        `Analayst`,
                        `Anthropologist`,
                        `Artist`,
                        `Assassin`,
                        `Astronaut`,
                        // B
                        `Baseball star`,
                        `Blacksmith`,
                        `Biker gang leader`,
                        `Bodyguard`,
                        `Botaanst`,
                        `Boxer`,
                        `Breeder`,
                        // C
                        `Child caregiver`,
                        `Clairvoyant`,
                        `Confectioner`,
                        `Cook`,
                        `Cosplayer`,
                        // D
                        `Detective`,
                        // E
                        `Entomologist`,
                        // F
                        `Fanfic creator`,
                        `Farmer`,
                        `Fashionishta`,
                        // G
                        `Gambler`,
                        `Gamer`,
                        `Gymnast`,
                        // H
                        `Housekeeper`,
                        // I
                        `Imposter`,
                        `Inventor`,
                        // L
                        `Lucky Student`,
                        // M
                        `Magician`,
                        `Maid`,
                        `Martial artist`,
                        /** `Make-Up Artist`,*/
                        `Mechanic`,
                        // H
                        `Hall monitor`,
                        /** `Multiple Birth Sibling`,*/
                        `Serial killer`,
                        `Musician`,
                        `Neuorologist`,
                        `Nurse`,
                        `Pharmacist`,
                        `Photographer`,
                        `Physicist`,
                        `Pianist`,
                        `Idol`,
                        `Princess`,
                        `Programmer`,
                        `Pyrotechnician`,
                        `Robot`,
                        `Secret agent`,
                        `Secretary`,
                        `Soldier`,
                        `Street fighter`,
                        `Student council president`,
                        `Supreme leader`,
                        `Survivor`,
                        `Swimmer`,
                        `Swordswoman`,
                        `Coach`,
                        `Tennis pro`,
                        `THerapist`,
                        `Traditional dancer`,
                        `Wrestler`,
                        `Writing prodigy`,
                        `Yakuza`,


                    ]
                return available_words_to_solve[Math.floor(Math.random() * available_words_to_solve.length)];

            }

            const word = pick_a_word() // example: plain
            const capitalised_all_letters = word.toUpperCase() // example: plain => PLAIN
            const split_all_letters_from_each_other_into_array = capitalised_all_letters.split(``) // example: PLAIN => [`P`, `L`, `A`, `I`, `N`]
            const array_of_letters = split_all_letters_from_each_other_into_array // example: [`P`, `L`, `A`, `I`, `N`]
            console.log(array_of_letters)

            let hidden = []
            array_of_letters.forEach((letter) => {

                if (letter == ` `) return hidden.push(` `)
                hidden.push(`_`)
            })

            console.log(hidden)

            let letters_that_have_been_guessed = [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]

            let guesses = 0;
            const no_more_letters_to_guessed_now = 999;

            const hangman_beginning = new MessageEmbed()
                .setColor('#e5b3b5')
                .setTitle(`Hangman Gambit`)
                .setDescription
                (
                /**/  `\`\`\`${hidden.join(` `)}\`\`\``
                    + `\`\`\`${show_hangman(guesses)}\`\`\``

                    + `\`\`\`letters guessed: ${letters_that_have_been_guessed.join(` `)}\`\`\``)

            message.say(hangman_beginning).then(async game => {

                while (guesses <= 6) {

                    const hidden_word_has_been_completed = !hidden.includes(`_`);

                    if (hidden_word_has_been_completed) {

                        const letters_remaining_to_guess = hidden.join(` `)

                        const congratulation = new MessageEmbed()
                            .setColor('#e5b3b5')
                            .setTitle(`Hangman Gambit`)
                            .setDescription
                            (
                                /**/  `\`\`\`${letters_remaining_to_guess}\`\`\``
                                + `\`\`\`${show_hangman(guesses)}\`\`\``

                                + `\`\`\`letters guessed:`
                                + `${letters_that_have_been_guessed.join(` `)}\`\`\``

                                + `\`\`\`Congratulation, friend.\`\`\``
                            )

                        game.edit(congratulation)

                        break;

                    }

                    const filter = m => m.author.id === message.author.id
                    await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then((message) => {

                        message = message.first()
                        const array_of_words_from_message_content = message.content.split(` `)
                        const letter_guessed = array_of_words_from_message_content.shift().toUpperCase()
                        function ok(letter) {

                            const hidden_word_has_the_letter_guessed = (array_of_letters.some(array => letter.toUpperCase().includes(array)))

                            if (hidden_word_has_the_letter_guessed) {

                                let letter_has_been_found = array_of_letters

                                array_of_letters.forEach(letter => {

                                    if (letter == letter_guessed) {

                                        const index_of_found_letter = letter_has_been_found.indexOf(letter)
                                        console.log(index_of_found_letter)
                                        letter_has_been_found[index_of_found_letter] = `!`

                                        hidden[index_of_found_letter] = letter

                                    }

                                })

                            } else guesses++

                        }

                        ok(letter_guessed)

                        const letters_remaining_to_guess = hidden.join(` `)



                        show_letters_used(letter_guessed, letters_that_have_been_guessed)

                        //show_letters_used(letter_guessed, letters_that_have_been_guessed)

                        if (guesses <= 6) {
                            const hangman_progress = new MessageEmbed()
                                .setColor('#e5b3b5')
                                .setTitle(`Hangman Gambit`)
                                .setDescription(
                    /**/  `\`\`\`${letters_remaining_to_guess}\`\`\``
                                    + `\`\`\`${show_hangman(guesses)}\`\`\``

                                    + `\`\`\`letters guessed:`
                                    + `${letters_that_have_been_guessed.join(` `)}\`\`\``)

                            game.edit(hangman_progress) && message.delete()

                        }
                        else {

                            const nice_try = new MessageEmbed()
                                .setColor('#e5b3b5')
                                .setTitle(`Hangman Gambit`)
                                .setDescription
                                (
                                /**/  `\`\`\`The word was: ${word.toUpperCase()}\`\`\``
                                    + `\`\`\`${show_hangman(guesses)}\`\`\``

                                    + `\`\`\`letters guessed: ${letters_that_have_been_guessed.join(` `)}\`\`\``

                                    + `\`\`\`Nice try, friend.\`\`\``
                                )

                            game.edit(nice_try)

                        }
                    })
                }




            });


            return







            array.forEach(element => ok(element))

            console.log(hidden)

            return
            const array1 = [`P`, `L`, `A`, `I`, `N`, `A`, `R`, `U`, `M`, `I`]

            function yeah(letter) {
                if (letter == args[0]) return `_`
                return letter
            }

            array1.forEach(element => console.log(yeah(element)))

            //   console.log(array1[2, 5])

            return





        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};