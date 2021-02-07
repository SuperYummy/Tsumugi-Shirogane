const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;

const request_string = {
  type: String,
  required: true
}

const commandPrefixSchema = mongoose.Schema
  (
    {
      guildID: request_string,
      prefix: request_string
    }
  )

module.exports = mongoose.model('guild-prefixes', commandPrefixSchema)