function show_hangman(number) {

    const hangman_picture = {
        0: ' \n \n \n \n ', // <= This picture displays a blank because the user hasn't answered a letter that the "hidden word" does not have.
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
         * I had to add an extra backslash to each right arm and leg to send the picture properly
         * 
         */
    }
    return hangman_picture[number]
}


module.exports = { show_hangman }

