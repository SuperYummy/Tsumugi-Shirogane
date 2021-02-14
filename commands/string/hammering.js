const { Command } = require('discord.js-commando');
const { error_occurred } = require(`../../utils/error`);
const { manage_messages, member_needs_to_be_admin } = require(`../../utils/permission`);

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hammeringdistance',
            aliases: [`hd`],
            group: 'string',
            memberName: 'hammeringdistance',
            description: 'measures the minimum number of substitutions required to change one string into the other',
            argsType: `multiple`,
        });

    }

    async run(message, args) {

        if (member_needs_to_be_admin(message)) return;
        if (manage_messages(message)) return;

        const { author } = message

        try {

            function secondWord(x) {
                if (x) return 1;
                return 0;
            }

            function hammingDistance(a, b) {

                if (args[1]) {

                    //  console.log(`${a.length + secondWord(args[1])} and  ${b.length}`)


                    if (a.lengths !== b.length) return;
                    // console.log('Strings must be of the same length');
                }

                let distance = 0;

                for (let i = 0; i < a.length; i += 1) {
                    if (a[i] !== b[i]) {
                        distance += 1;
                    }
                }

                return distance;
            }

            //       const x = hammingDistance((args[0] + args[1]), `indian` + `parsley`)
            //      console.log(x)

            //TODO: work with spaces



            const apple = hammingDistance(args[0], `apple`)
            console.log(apple)
            const banana = hammingDistance(args[0], `banana`)
            const cherry = hammingDistance(args[0], `cherry`)
            const dewberry = hammingDistance(args[0], `dewberry`)
            const eggplant = hammingDistance(args[0], `eggplane`)
            const fig = hammingDistance(args[0], `fig`)
            const grapes = hammingDistance(args[0], `grapes`)
            const honeydew = hammingDistance(args[0], `honeydew`)
            const indian_parsley = hammingDistance(args[0] + args[1], `indian` + `parsley`)
            const jalapeno = hammingDistance(args[0], `jalapeno`)
            const kiwi = hammingDistance(args[0], `kiwi`)
            const lemon = hammingDistance(args[0], `lemon`)
            const mushroom = hammingDistance(args[0], `mushroom`)
            const nectarine = hammingDistance(args[0], `nectarine`)
            const orange = hammingDistance(args[0], `orange`)
            const pumpkin = hammingDistance(args[0], `pumpkin`)
            const quince = hammingDistance(args[0], `quince`)
            const radish = hammingDistance(args[0], `radish`)
            const strawberry = hammingDistance(args[0], `strawberry`)
            const tomato = hammingDistance(args[0], `tomato`)
            const ugli_fruit = hammingDistance(args[0] + args[1], `ugli fruit`)
            const vidalia_onion = hammingDistance(args[0] + args[1], `vidalia` + `onion`)
            const watermelon = hammingDistance(args[0], `watermelon`)
            const ximenia = hammingDistance(args[0], `ximenia`)
            const yam = hammingDistance(args[0], `yam`)
            const zucchini = hammingDistance(args[0], `zucchini`)

            if (apple >= 1 && apple <= 2) message.say(`Do you mean \`apple\`?`)
            else if (banana >= 1 && banana <= 2) message.say(`Do you mean \`banana\`?`)
            else if (cherry >= 1 && cherry <= 2) message.say(`Do you mean \`cherry\`?`)
            else if (dewberry >= 1 && dewberry <= 2) message.say(`Do you mean \`dewberry\`?`)
            else if (eggplant >= 1 && eggplant <= 2) message.say(`Do you mean \`eggplant\`?`)
            else if (fig >= 1 && fig <= 2) message.say(`Do you mean \`fig\`?`)
            else if (grapes >= 1 && grapes <= 2) message.say(`Do you mean \`grapes\`?`)
            else if (honeydew >= 1 && honeydew <= 2) message.say(`Do you mean \`honeydew\`?`)
            else if (indian_parsley >= 1 && indian_parsley <= 2) message.say(`Do you mean \`indian parsley\`?`)
            else if (jalapeno >= 1 && jalapeno <= 2) message.say(`Do you mean \`jalapeno\`?`)
            else if (kiwi >= 1 && kiwi <= 2) message.say(`Do you mean \`kiwi\`?`)
            else if (lemon >= 1 && lemon <= 2) message.say(`Do you mean \`lemon\`?`)
            else if (mushroom >= 1 && mushroom <= 2) message.say(`Do you mean \`mushroom\`?`)
            else if (nectarine >= 1 && nectarine <= 2) message.say(`Do you mean \`nectarine\`?`)
            else if (orange >= 1 && orange <= 2) message.say(`Do you mean \`orange\`?`)
            else if (pumpkin >= 1 && pumpkin <= 2) message.say(`Do you mean \`pumpkin\`?`)
            else if (quince >= 1 && quince <= 2) message.say(`Do you mean \`quince\`?`)
            else if (radish >= 1 && radish <= 2) message.say(`Do you mean \`radish\`?`)
            else if (strawberry >= 1 && strawberry <= 2) message.say(`Do you mean \`strawberry\`?`)
            else if (tomato >= 1 && tomato <= 2) message.say(`Do you mean \`tomato\`?`)
            else if (ugli_fruit >= 1 && ugli_fruit <= 2) message.say(`Do you mean \`ugli_fruit\`?`)
            else if (vidalia_onion >= 1 && vidalia_onion <= 2) message.say(`Do you mean \`vidalia_onion\`?`)
            else if (watermelon >= 1 && watermelon <= 2) message.say(`Do you mean \`watermelon\`?`)
            else if (yam >= 1 && yam <= 2) message.say(`Do you mean \`yam\`?`)
            else if (zucchini >= 1 && zucchini <= 2) message.say(`Do you mean \`zucchini\`?`)
            else message.say(`I don't understand.`)






        } catch (err) {

            console.error(err);
            message.say(error_occurred);

        };
    };
};