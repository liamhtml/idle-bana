/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />

// imports
import { banaKv, buildings, achievements, priceIncreaseRate } from './consts';
import {
    checkForNewPlayer,
    compress,
    deCompress,
    getUserObj,
    putUserObj,
    calcBps
} from './funcs';

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
        const helpEmbed = new discord.Embed();
        helpEmbed.setTitle('🍌 idle bana help 🍌');
        helpEmbed.setColor(0xf2d70e);
        helpEmbed.setDescription(
            'idle bana is a supa epic idle game. yor big gole is colec da most bana. u can increse ur bps (bana per secon) by purchas bulding with bana to produce mor bana. belo are bana comand.'
        );
        helpEmbed.addField({
            name: '.help (.h)',
            value: 'send dis bana help mesage. \nhow use: `.help`',
            inline: false
        });
        helpEmbed.addField({
            name: '.grab (.g)',
            value:
                'grab bana. dependig on ur bps and how long u wait u can get more bana. \nhow use: `.grab`',
            inline: false
        });
        helpEmbed.addField({
            name: '.profile (.p)',
            value:
                'see how many bana u (or someon else) hav, bps, builings an mor \nhow use: `.profile <optional: @user>`',
            inline: false
        });
        helpEmbed.addField({
            name: '.achievements (.a)',
            value: 'see all achivemen u hav \nhow use: `.achievements`',
            inline: false
        });
        helpEmbed.addField({
            name: '.profile (.p)',
            value:
                'see how many bana u hav, bps, builings an mor \nhow use: `.profile <optional: @user>`',
            inline: false
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
            value: `buy building with bana \nhow use: \`.buy <amount of building> <building type>\`\nu can buy: ${buyOptions}`,
            inline: false
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
        let userObj = await getUserObj(message.author.id);
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
            buildingsCountStr = `${buildingsCountStr}${
                buildings[buildingsKeys[i]].name
                }: ${userObj.buildings[buildingsKeys[i]].num}\n`;
        }
        profileEmbed.addField({
            name: '# of buildings',
            value: `${buildingsCountStr}`,
            inline: true
        });
        let buildingsLvlStr = '';
        for (let i = 0; i < buildingsKeys.length; i++) {
            buildingsLvlStr = `${buildingsLvlStr}${
                buildings[buildingsKeys[i]].name
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
        let userObj = await getUserObj(message.author.id);
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

// calc current building buying price
async function calcBuyPrice(building: string, amount: number, id: string) {
    let basePrice = buildings[building].basePrice;
    let price = 0;
    let userObj = await getUserObj(id);
    let numOfBuilding = userObj.buildings[building].num;

    // calc price

    return price;
}

// calc current building sell price
async function calcSellPrice(building: string, amount: number, id: string) {
    let basePrice = buildings[building].basePrice;
    let price = basePrice;
    let userObj = await getUserObj(id);
    let numOfBuilding = userObj.buildings[building].num;

    // calc price

    return price;
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
            let userObj = await getUserObj(message.author.id);
            let price = await calcBuyPrice(building, amount, message.author.id);
            console.log(price);
            if (userObj.banaCount >= price) {
                userObj.banaCount = userObj.banaCount - price;
                userObj.buildings[building].num =
                    userObj.buildings[building].num + amount;
                await putUserObj(message.author.id, userObj);
                const buyEmbed = new discord.Embed();
                buyEmbed.setTitle(
                    `Bought ${amount} ${buildings[building].name}(s) for ${price} bana!`
                );
                buyEmbed.setColor(0xf2d70e);
                buyEmbed.setDescription(`${buildings[building].info}`);
                buyEmbed.setFooter({
                    text: `${buildings[building].desc}`
                });
                buyEmbed.setThumbnail({
                    url: `${buildings[building].icon}`
                });
                await message.reply(buyEmbed);
            } else {
                await message.reply(
                    `You cannot afford this purchase of ${amount} ${buildings[building].name}(s) for ${price} bana.`
                );
            }
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
            let userObj = await getUserObj(message.author.id);
            let price = await calcSellPrice(building, amount, message.author.id);
            if (userObj.buildings[building].num >= amount) {
                userObj.banaCount = userObj.banaCount + price;
                userObj.buildings[building].num =
                    userObj.buildings[building].num - amount;
                await putUserObj(message.author.id, userObj);
                const sellEmbed = new discord.Embed();
                sellEmbed.setTitle(
                    `Sold ${amount} ${buildings[building].name}(s) for ${price} bana!`
                );
                sellEmbed.setColor(0xf2d70e);
                sellEmbed.setDescription(`${buildings[building].info}`);
                sellEmbed.setFooter({
                    text: `${buildings[building].desc}`
                });
                sellEmbed.setThumbnail({
                    url: `${buildings[building].icon}`
                });
                await message.reply(sellEmbed);
            } else {
                await message.reply(
                    `You don't have ${amount} ${buildings[building].name}(s) to sell!`
                );
            }
        } else {
            // error
            await message.reply(`Error: ${checkNumber(amount)}`);
        }
    }
);
