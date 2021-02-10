function hide_the_word(array_of_letters, hidden) {
    array_of_letters.forEach((letter) => {

        if (letter == ` `) return hidden.push(` `);
        return hidden.push(`_`);

    })
}

module.exports = { hide_the_word }