// A folder containing cool commands for error handlers! They can be triggerred by using the "try and catch(err)" method in each command file in the "commands" folder!

const { MessageEmbed } = require('discord.js');

const error_occurred = new MessageEmbed()
    .setColor('#e5b3b5')
    .setTitle('Error occurred')
    .attachFiles([`./attachment/sprites/interested.png`])
    .setImage(`attachment://interested.png`)
    .setDescription
    (
        `\`\`\`It seems like this command is unusable at the moment.\`\`\``
        + `\`\`\`\n\nI'll let the bot developer know about this.\`\`\``
    );

module.exports = { error_occurred }

