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
            `Therapist`,
            `Traditional dancer`,
            `Wrestler`,
            `Writing prodigy`,
            `Yakuza`,


        ]
    return available_words_to_solve[Math.floor(Math.random() * available_words_to_solve.length)];

}

module.exports = { pick_a_word }