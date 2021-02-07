const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const characterSchema = mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    characterName: reqString,
})

module.exports = mongoose.model('character-names', characterSchema)