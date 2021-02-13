const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`)
const { error_occurred } = require(`../../utils/error`);
const { show_letters_used } = require(`../../utils/specification/hangman/letters-used`);
const { progress } = require(`../../utils/specification/tictactoe/image`);
const { win } = require(`../../utils/specification/tictactoe/win`);
const { draw } = require(`../../utils/specification/tictactoe/draw`);
const { lose } = require('../../utils/specification/tictactoe/lose');


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

        try {

            let slots =
                [
                    ``, ``, ``,
                    ``, ``, ``,
                    ``, ``, ``
                ]
            
            let i = 0;

            while (i == 0) {

                const filter = m => m.author.id === message.author.id // The bot won't respond to other users' answers
                await message.channel.awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ['timeout'] }).then((message) => {

                    if (message) {

                        message = message.first()

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

                        if (Xdiagonals || Xhorizontals || Xverticals) return win(slots, message), i++;

                        const no_more_spots_left = ![``].some(no_spot => slots.includes(no_spot));
                        if (no_more_spots_left) return draw(slots, message), i++;


                        if (valid_number_slot) {

                            let m = 0;

                            while (m == 0) {

                                const number_slots = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`]
                                const this_slot = number_slots[Math.floor(Math.random() * number_slots.length)];
                                const unoccupied_slot = !figures.some(word => slots[this_slot].toUpperCase().includes(word));

                                if (unoccupied_slot) {

                                    slots[this_slot] = `O`;
                                    m = 1;
                                    const Odiagonals = (slots[0] == `O` && slots[4] == `O` && slots[8] == `O`) || (slots[2] == `O` && slots[4] == `O` && slots[6] == `O`)
                                    const Ohorizontals = (slots[0] == `O` && slots[1] == `O` && slots[2] == `O`) || (slots[3] == `O` && slots[4] == `O` && slots[5] == `O`) || (slots[6] == `O` && slots[7] == `O` && slots[8] == `O`)
                                    const Overticals = (slots[0] == `O` && slots[3] == `O` && slots[6] == `O`) || (slots[1] == `O` && slots[4] == `O` && slots[7] == `O`) || (slots[2] == `O` && slots[5] == `O` && slots[8] == `O`)

                                    console.log(Odiagonals || `nope`, Ohorizontals || `nope`, Overticals || `nope`)
                                    if (Odiagonals || Ohorizontals || Overticals) return lose(slots, message), i++;
                                   progress(slots, message)
                                   
                                }


                            }



                        }





                    }

                }).catch(err => message.say(`Is anyone there? Guess I'll cancel this game.ooo`) && console.error(err) && i++)

            }




        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};