// A folder that contains codes for randomizing Tsumugi's sprites based on her expression in an embed.

const { MessageEmbed } = require('discord.js');
/**
 * I saved all of Tsumugi's sprites (except the spoiler ones) to the "attachment/sprites" folder from this link:
 * https://danganronpa.fandom.com/wiki/Tsumugi_Shirogane/Sprite_Gallery
 * 
 * I edited and cropped them so they look good on Discord.
*/

const sad_expression = function () {

    function pick_a_sad_sprite() {

        const available_sprites = [`cry`, `normal_anxious`, `normal_scared`, `normal_very_anxious`, `protective_sad`, `protective_anxious`, `protective_very_anxious`];
        return available_sprites[Math.floor(Math.random() * available_sprites.length)];

    }
    const sprite = pick_a_sad_sprite()

    const embed_blueprint = new MessageEmbed()
        .setColor('#e5b3b5')
        .attachFiles([`./attachment/sprites/${sprite}.png`])
        .setImage(`attachment://${sprite}.png`)
    return embed_blueprint

}


const negative_expression = function () {

    function pick_a_negative_sprite() {

        const available_sprites = [`normal_upset`, `protective_upset`, `stand_upset`, `creative_upset`];
        return available_sprites[Math.floor(Math.random() * available_sprites.length)];

    }
    const sprite = pick_a_negative_sprite()

    const embed_blueprint = new MessageEmbed()
        .setColor('#e5b3b5')
        .attachFiles([`./attachment/sprites/${sprite}.png`])
        .setImage(`attachment://${sprite}.png`)
    return embed_blueprint

}


const neutral_expression = function () {

    function pick_a_neutral_sprite() {

        const available_sprites = [`normal_talk`, `stand`, `thinking`, `thinking_talk`, `creative`];
        return available_sprites[Math.floor(Math.random() * available_sprites.length)];
    }
    const sprite = pick_a_neutral_sprite()

    const embed_blueprint = new MessageEmbed()
        .setColor('#e5b3b5')
        .attachFiles([`./attachment/sprites/${sprite}.png`])
        .setImage(`attachment://${sprite}.png`)
    return embed_blueprint

}

module.exports = { neutral_expression, negative_expression, sad_expression }