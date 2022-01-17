// exports

// imports
import { banaKv, buildings, achievements } from './consts';
import { checkForNewPlayer, compress, deCompress, getUserObj, putUserObj, calcBps } from './funcs';

// @ts-ignore
const banaCommands = new discord.command.CommandGroup({
    defaultPrefix: '.'
});

// help command
banaCommands.raw(
    {
        name: 'help',
        aliases: ['h']
    },
    async (message) => {
        // @ts-ignore
        const helpEmbed = new discord.Embed();
        helpEmbed.setTitle('🍌 idle bana help 🍌');
        helpEmbed.setColor(0xf2d70e);
        helpEmbed.setDescription(
            'idle bana is a supa epic idle game. yor big gole is colec da most bana. u can increse ur bps (bana per secon) by purchas bulding with bana to produce mor bana. belo are bana comand.'
        );
        helpEmbed.addField({
            name: '.help (.h)',
            value: 'send dis bana help mesage. \nhow use: `.help`'
        });
        helpEmbed.addField({
            name: '.grab (.g)',
            value:
                'grab bana. dependig on ur bps and how long u wait u can get more bana. \nhow use: `.grab`'
        });
        helpEmbed.addField({
            name: '.profile (.p)',
            value:
                'see how many bana u (or someon else) hav, bps, builings an mor \nhow use: `.profile <optional: @user>`'
        });
        helpEmbed.addField({
            name: '.achievements (.a)',
            value: 'see all achivemen u hav \nhow use: `.achievements`'
        });
        helpEmbed.addField({
            name: '.profile (.p)',
            value:
                'see how many bana u hav, bps, builings an mor \nhow use: `.profile <optional: @user>`'
        });
        let buildingsKeys = Object.keys(buildings);
        let buyOptions = '';
        for (let i = 0; i < buildingsKeys.length; i++) {
            if (i == 0) {
                buyOptions = `${buyOptions} \`${buildingsKeys[i]}\``;
            } else {
                buyOptions = `${buyOptions}, \`${buildingsKeys[i]}\``;
            }
        }
        helpEmbed.addField({
            name: '.buy (.b)',
            value: `buy building with bana \nhow use: \`.buy <amount of building> <building type>\`\nu can buy: ${buyOptions}`
        });

        await message.reply(helpEmbed);
    }
);

// grab command
banaCommands.raw(
    {
        name: 'grab',
        aliases: ['g']
    },
    async (message) => {
        await message.reply('it work');
    }
);

// profile command
banaCommands.raw(
    {
        name: 'profile',
        aliases: ['p']
    },
    async (message) => {
        await checkForNewPlayer(message.author.id);
        // @ts-ignore
        let userObj = await getUserObj(message.author.id);
        // @ts-ignore
        const profileEmbed = new discord.Embed();
        profileEmbed.setTitle(`🍌 ${message.author.username}'s profile 🍌`);
        profileEmbed.setColor(0xf2d70e);
        profileEmbed.setThumbnail({
            url: message.author.getAvatarUrl()
        });
        profileEmbed.addField({
            name: '# of bana',
            value: `${userObj.banaCount}`,
            inline: true
        });
        profileEmbed.addField({
            name: 'bps',
            value: `${await calcBps(message.author.id)}`,
            inline: true
        });
        profileEmbed.addField({
            name: 'achievements',
            value: `${userObj.achievements.length}/${Object.keys(achievements).length
                }`,
            inline: true
        });
        let buildingsKeys = Object.keys(userObj.buildings);
        let buildingsCountStr = '';
        for (let i = 0; i < buildingsKeys.length; i++) {
            buildingsCountStr = `${buildingsCountStr}${buildings[buildingsKeys[i]].name
                }: ${userObj.buildings[buildingsKeys[i]].num}\n`;
        }
        profileEmbed.addField({
            name: '# of buildings',
            value: `${buildingsCountStr}`,
            inline: true
        });
        let buildingsLvlStr = '';
        for (let i = 0; i < buildingsKeys.length; i++) {
            buildingsLvlStr = `${buildingsLvlStr}${buildings[buildingsKeys[i]].name
                }: ${userObj.buildings[buildingsKeys[i]].lvl}\n`;
        }
        profileEmbed.addField({
            name: 'building lvls',
            value: `${buildingsLvlStr}`,
            inline: true
        });

        await message.reply(profileEmbed);
    }
);

// achievements command
banaCommands.raw(
    {
        name: 'achievements',
        aliases: ['a']
    },
    async (message) => {
        await checkForNewPlayer(message.author.id);
        // @ts-ignore
        let userObj = await getUserObj(message.author.id);
        // @ts-ignore
        const achEmbed = new discord.Embed();
        achEmbed.setTitle(`${message.author.username}'s achievements`);
        achEmbed.setColor(0xf2d70e);
        achEmbed.setThumbnail({
            url: message.author.getAvatarUrl()
        });
        let achStr = '';
        let achKeys = userObj.achievements;
        for (let i = 0; i < achKeys.length; i++) {
            if (i == 0) {
                achStr = `${achKeys[i]}`;
            } else {
                achStr = `${achStr}, ${achKeys[i]}`;
            }
        }
        if (achStr.length == 0) {
            achStr = 'You have completed no achievements yet.';
        }
        achEmbed.setDescription(achStr);

        await message.reply(achEmbed);
    }
);

// choices for buy/sell commands
let convertedChoices = Object.keys(buildings).map((name) => name.toLowerCase());

// number sanitization for buy/sell commands
function checkNumber(number: number) {
    // check if positive
    if (number > 0) {
        // check if integer
        if (Number.isInteger(number)) {
            return true;
        } else {
            return 'Not an integer.';
        }
    } else {
        return 'Not a positive number.';
    }
}

// buy building command
banaCommands.on(
    {
        name: 'buy',
        aliases: ['b']
    },
    (args) => ({
        amount: args.number(),
        building: args.string({ choices: convertedChoices })
    }),
    async (message, { amount, building }) => {
        if (checkNumber(amount) === true) {
            // buy building
            await message.reply(`Bought ${amount} ${building}(s).`);
        } else {
            // error
            await message.reply(`Error: ${checkNumber(amount)}`);
        }
    }
);

// sell building command
banaCommands.on(
    {
        name: 'sell',
        aliases: ['s']
    },
    (args) => ({
        amount: args.number(),
        building: args.string({ choices: convertedChoices })
    }),
    async (message, { amount, building }) => {
        if (checkNumber(amount) === true) {
            // sell buildings
            await message.reply(`Sold ${amount} ${building}(s).`);
        } else {
            // error
            await message.reply(`Error: ${checkNumber(amount)}`);
        }
    }
);
