const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`)
const { error_occurred } = require(`../../utils/error`);
const { I_need_permission } = require(`../../utils/error`);


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['testest', 'testet'],
            group: 'first',
            memberName: 'test',
            description: 'testestestest',
        });

    };

    /**
     * 
     * I need to learn how  to loop for this command
     */


    run(message, args) {
        try {

        
            //   let x = [`1`, `2`]

            let hidden = [`_`, `_`, `_`, `_`, `_`, `_`, `_`, `_`, `_`, `_`, `_`]

            let guesses = 0
            while (guesses < 2) {
             

                const filter = m => m.author.id === message.author.id
                message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then(() => {

                    console.log(`ok`)
                    message.channel.send(`hi`)
                    guess++
                })
            }



            return
            for (let guesses = 0; guesses < 6;) {

                const letter_gussed = args[0]

                const filter = m => m.author.id === message.author.id
                message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then((args) => {


                    const array_of_letters = [`P`, `L`, `A`, `I`, `N`, `A`, `R`, `I`, `U`, `M`, `A`]

                    function ok(letter) {

                        if ((array_of_letters.some(array => letter.toUpperCase().includes(array)))) {

                            let letter_has_been_found = array_of_letters

                            array_of_letters.forEach(letter => {

                                if (letter == letter_gussed) {

                                    const index_of_found_letter = letter_has_been_found.indexOf(letter)
                                    console.log(index_of_found_letter)
                                    letter_has_been_found[index_of_found_letter] = `-`
                                    hidden[index_of_found_letter] = letter

                                } else guesses++

                            })

                            console.log(letter_has_been_found)
                            console.log(hidden)
                        }

                        return hidden[letter] = args[0]
                    }

                    ok(letter_gussed)
                })
            }




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