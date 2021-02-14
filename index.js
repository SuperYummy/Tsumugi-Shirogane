const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { token, developerID, support_server_link, prefix, connectionString } = require(`./config.json`);
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider;
const mongoose = require('mongoose');
const mongo = require('./utils/mongo')

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: developerID,
  invite: support_server_link,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['first', 'random commands'],
    ['string', 'playing with strings']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    args: false,
    unknownCommand: false,
    ping: false,
    commandState: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.users.cache.get(developerID).send(`Hi!`)
  client.user.setActivity('Danganronpa V3: Killing Harmony');
  await mongo()
});

client.setProvider(
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: `Tsumugi`
  })
    .then((client) => {
      return new MongoDBProvider(client, 'cluster0')
    })
    .catch((err) => {
      console.error(err)
    })
)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


process.on('unhandledRejection', (error, message) => {
  console.error(error);
});

client.on('error', console.error);

client.login(token);