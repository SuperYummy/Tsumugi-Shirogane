const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`)
const { error_occurred } = require(`../../utils/error`);
const { I_need_permission } = require(`../../utils/error`);


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['link', 'invitelink'],
            group: 'first',
            memberName: 'invite',
            description: 'Sends the link to invite the bot to a server.',
        });

    };

    //https://discord.com/oauth2/authorize?client_id=806207784210530354&scope=bot&permissions=8


    run(message, args) {

        const { author } = message
        const username = author.username
        const link_to_invite_Tsumugi = new MessageEmbed()
            .setColor('#e5b3b5')
            .setTitle('Invite')
            .attachFiles([`./attachment/sprites/normal_talk.png`])
            .setImage(`attachment://normal_talk.png`)
            .setDescription(`\`\`\`But I'm just a plain, boring girl. You know that, right ${username}?\`\`\`\`\`\`If you would still like to invite me, you may click the link below.\`\`\`\n**[ [Invite Me](https://discord.com/oauth2/authorize?client_id=806207784210530354&scope=bot&permissions=8) ]**`)
        try {

            message.say(link_to_invite_Tsumugi)

        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};