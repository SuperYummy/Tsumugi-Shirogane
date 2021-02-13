

function progress(slots, message) {

    

    message.say(
 /**/ `\`\`\`${slots[0] || `.`} ${slots[1] || `.`} ${slots[2] || `.`}`
        + `\n${slots[3] || `.`} ${slots[4] || `.`} ${slots[5] || `.`}`
        + `\n${slots[6] || `.`} ${slots[7] || `.`} ${slots[8] || `.`}\`\`\``
    );

}

module.exports = { progress }