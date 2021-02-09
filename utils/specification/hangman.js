// A folder containing cool commands for error handlers! They can be triggerred by using the "try and catch(err)" method in each command file in the "commands" folder!

const { MessageEmbed } = require('discord.js');

function show_hangman(number) {

    const hangman_picture = {
        0: ' \n \n \n \n ',
        1:
        /**/    `     +---+`
            + `\n         |`
            + `\n         |`
            + `\n         |`
            + `\n        ===`
        ,
        2:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n         |`
            + `\n         |`
            + `\n        ===`
        ,
        3:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n     |   |`
            + `\n         |`
            + `\n        ===`
        ,
        4:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n    /|   |`
            + `\n         |`
            + `\n        ===`
        ,
        5:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n    /|\\  |`
            + `\n         |`
            + `\n        ===`
        ,
        6:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n    /|\\  |`
            + `\n    /    |`
            + `\n        ===`
        ,
        7:
        /**/    `     +---+`
            + `\n     O   |`
            + `\n    /|\\  |`
            + `\n    / \\  |`
            + `\n        ===`
        ,
        /**
         * I had to add an extra backslash to each right arm or leg to send the picture properly
         * 
         */
    }
    return hangman_picture[number]
}

function show_letters_used(letter, letters_that_have_been_guessed) {

    const alphabet = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`]

    const index_of_alphabet_letter = alphabet.indexOf(letter)
    return letters_that_have_been_guessed[index_of_alphabet_letter] = letter

}



module.exports = { show_letters_used, show_hangman }

