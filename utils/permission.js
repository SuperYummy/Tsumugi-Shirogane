const { MessageEmbed } = require(`discord.js`)


const construct_embed = function (not_admin) {

    function pick_a_sprite() {

        if (not_admin) return `silly`;
        const available_sprites = [`normal_talk`, `stand`];
        return available_sprites[Math.floor(Math.random() * available_sprites.length)];

    }
    const sprite = pick_a_sprite();

    return new MessageEmbed()
        .setColor('#e5b3b5')
        .setTitle('I lack permissions')
        .attachFiles([`./attachment/sprites/${sprite}.png`])
        .setImage(`attachment://${sprite}.png`);

};


const member_needs_to_be_admin = function (message) {

    const { member } = message
    const member_is_not_admin = !member.hasPermission(`ADMINISTRATOR`)

    if (member_is_not_admin) { return message.say(construct_embed(not_admin).setDescription(`This command is very powerful that you need to be an administrator to use this.`)) }

}

const manage_messages = function (message) {

    const { member, guild, author } = message
    const { me, owner } = guild
    const guild_owner = `<@${owner.id}>`
    const Tsumugi_does_not_have_permission_to_send_messages = !me.hasPermission(`ADMINITRATOR` && `SEND_MESSAGES`)
    const Tsumugi_does_not_have_permission_to_manage_messages = !me.hasPermission(`ADMINITRATOR` && `MANAGE_MESSAGES`)
    const member_is_an_administrator = member.hasPermission(`ADMINISTRATOR`)

    if (Tsumugi_does_not_have_permission_to_send_messages) {

        if (member_is_an_administrator) { return author.send(construct_embed().setDescription(`\`\`\`I'll need your "send messages" permission on your server for this command to work, silly.\`\`\``)).catch(() => {/*ignore error*/ }) }
        else { return message.say(construct_embed().setDescription(`\`\`\`I'll need the one of the following permissions from ${guild_owner} or an administrator for this command to work:\n- Administrator \n- Send messages \`\`\``)).catch(() => {/*ignore error*/ }) }

    }

    else if (Tsumugi_does_not_have_permission_to_manage_messages) {

        if (member_is_an_administrator) { return message.say(construct_embed().setDescription(`\`\`\`I'll need one of your following permissions for this command to work, silly:\n- Administrator\n- Manage messages \`\`\``)) }
        else { return message.say(construct_embed().setDescription(`\`\`\`I'll need one of the following permissions from ${guild_owner} or an administrator for this command to work:\n- Administrator \n- Manage messages \`\`\``)) }

    }

}

module.exports = { manage_messages, member_needs_to_be_admin }