function show_letters_used(letter_guessed, all_letters_guessed_so_far) {

    const alphabet = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`] // used for defining each letter as an index of its own
    const index_of_alphabet_letter = alphabet.indexOf(letter_guessed) // example: index of the letter "O" is 14
    return all_letters_guessed_so_far[index_of_alphabet_letter] = letter_guessed // example: adds the letter O into the 14th index of the "all_letters_guessed_so_far" array
    // displays an array of all of the letters the user has guessed so far

}


module.exports = { show_letters_used }