const mongoose = require('mongoose')
const { connectionString } = require(`../config.json`)

const mongoPath = connectionString
module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}
