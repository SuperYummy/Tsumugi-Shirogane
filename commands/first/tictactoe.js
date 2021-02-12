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
            name: 'tictactoe',
            aliases: ['ttt'],
            group: 'first',
            memberName: 'tictactoe',
            description: 'play tic tac toe',
        });

    };

    async run(message, args) {

        console.log(`1`)

        try {

            
            let slots =
                [
                    ``, ``, ``,
                    ``, ``, ``,
                    ``, ``, ``
                ]
               

            console.log(`2`)



            let i = 0

            console.log(`3`)

            while (i == 0) {


                var no_spot = [``]

                var draw = !no_spot.some(no_spot => slots.includes(no_spot));

                if (draw) {
                    var row_1 = `${slots[0] || `.`} ${slots[1] || `.`} ${slots[2] || `.`}`
                    var row_2 = `${slots[3] || `.`} ${slots[4] || `.`} ${slots[5] || `.`}`
                    var row_3 = `${slots[6] || `.`} ${slots[7] || `.`} ${slots[8] || `.`}`

                    i = 1

                    message.say(
                        /* */ `\`\`\`${row_1}`
                        + `\n${row_2}`
                        + `\n${row_3}\`\`\``

                        + `\n\nGuess we end up in a draw, friend.`);


                    return

                }

                console.log(`4`)

                const filter = m => m.author.id === message.author.id // The bot won't responds to other users' answers
                await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then((message) => {

                    console.log(`5`)

                    if (message) {

                        message = message.first()

                        console.log(`a`)
                        console.log(`iusefhuihfiwe`, message.content)
                        const reponse = message.content.split(` `).shift()




                        const not_a_number = isNaN(reponse);
                        if (not_a_number) return message.say(`Please input an actual number. e.g. \`1\``);

                        const number_slot = parseFloat(reponse) - 1

                        const invalid_number_slot = number_slot + 1 >= 10
                        if (invalid_number_slot) return message.say(`There is no ${number_slot + 1}th slot.`);

                        const valid_number_slot = number_slot <= 9

                        const figures = [`X`, `O`];

                        const occupied_spot = figures.some(word => slots[number_slot].toUpperCase().includes(word));

                        if (occupied_spot) return message.say(`That spot is already taken. Please retry with a different one.`);

                        slots[number_slot] = `X`

                        const Xdiagonals = (slots[0] == `X` && slots[4] == `X` && slots[8] == `X`) || (slots[2] == `X` && slots[4] == `X` && slots[6] == `X`)
                        const Xhorizontals = (slots[0] == `X` && slots[1] == `X` && slots[2] == `X`) || (slots[3] == `X` && slots[4] == `X` && slots[5] == `X`) || (slots[6] == `X` && slots[7] == `X` && slots[8] == `X`)
                        const Xverticals = (slots[0] == `X` && slots[3] == `X` && slots[6] == `X`) || (slots[1] == `X` && slots[4] == `X` && slots[7] == `X`) || (slots[2] == `X` && slots[5] == `X` && slots[8] == `X`)


                        var row_1 = `${slots[0] || `.`} ${slots[1] || `.`} ${slots[2] || `.`}`
                        var row_2 = `${slots[3] || `.`} ${slots[4] || `.`} ${slots[5] || `.`}`
                        var row_3 = `${slots[6] || `.`} ${slots[7] || `.`} ${slots[8] || `.`}`

                        if (Xdiagonals || Xhorizontals || Xverticals) return i = 1, message.say(
                        /* */ `\`\`\`${row_1}`
                            + `\n${row_2}`
                            + `\n${row_3}\`\`\``

                            + `\n\nYou win, friend.`);

                        console.log(`b`)

                        var no_spot = [``]

                        var draw = !no_spot.some(no_spot => slots.includes(no_spot));

                        if (draw) {
                            var row_1 = `${slots[0] || `.`} ${slots[1] || `.`} ${slots[2] || `.`}`
                            var row_2 = `${slots[3] || `.`} ${slots[4] || `.`} ${slots[5] || `.`}`
                            var row_3 = `${slots[6] || `.`} ${slots[7] || `.`} ${slots[8] || `.`}`

                            i = 1

                            message.say(
                        /* */ `\`\`\`${row_1}`
                                + `\n${row_2}`
                                + `\n${row_3}\`\`\``

                                + `\n\nGuess we end up in a draw, friend.`);


                            return

                        }


                        if (valid_number_slot) {

                            let m = 0
                            console.log(`c`)

                            while (m == 0) {

                                console.log(`d`)

                                const number_slots = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`]
                                const this_slot = number_slots[Math.floor(Math.random() * number_slots.length)];

                                const unoccupied_slot = !figures.some(word => slots[this_slot].toUpperCase().includes(word));

                                if (unoccupied_slot) {
                                    console.log(`e`)

                                    slots[this_slot] = `O`
                                    m = 1

                                    const Odiagonals = (slots[0] == `O` && slots[4] == `O` && slots[8] == `O`) || (slots[2] == `O` && slots[4] == `O` && slots[6] == `O`)
                                    const Ohorizontals = (slots[0] == `O` && slots[1] == `O` && slots[2] == `O`) || (slots[3] == `O` && slots[4] == `O` && slots[5] == `O`) || (slots[6] == `O` && slots[7] == `O` && slots[8] == `O`)
                                    const Overticals = (slots[0] == `O` && slots[3] == `O` && slots[6] == `O`) || (slots[1] == `O` && slots[4] == `O` && slots[7] == `O`) || (slots[2] == `O` && slots[5] == `O` && slots[8] == `O`)

                                    var row_1 = `${slots[0] || `.`} ${slots[1] || `.`} ${slots[2] || `.`}`
                                    var row_2 = `${slots[3] || `.`} ${slots[4] || `.`} ${slots[5] || `.`}`
                                    var row_3 = `${slots[6] || `.`} ${slots[7] || `.`} ${slots[8] || `.`}`

                                    console.log(Odiagonals || `nope`, Ohorizontals || `nope`, Overticals || `nope`)
                                    if (Odiagonals || Ohorizontals || Overticals) return i = 1, console.log(`oooof`), message.say(
                                        /* */ `\`\`\`${row_1}`
                                        + `\n${row_2}`
                                        + `\n${row_3}\`\`\``

                                        + `\n\nYou lose, friend.`);

                                    message.say(
                                    /* */ `\`\`\`${row_1}`
                                        + `\n${row_2}`
                                        + `\n${row_3}\`\`\``
                                    )

                                }


                            }



                        }





                    }

                })

            }




        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};