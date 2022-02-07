/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />
// This states that you are writing code using Pylon types, do not remove it if you want to your code to work!
//------CONFIG------//
// default command prefix
const prefix = '.';
//------GENERAL------//
// bana kv
const banaKv = new pylon.KVNamespace('bana db');
// user class
class User {
    constructor(id) {
        this.id = id;
        this.banaCount = 0;
        this.lastGrab = 0;
        this.buildings = {
            monke: {
                num: 1,
                lvl: 0
            }
        };
        this.achievements = [];
    }
}
//------BUILDINGS------//
// building data
const buildings = {
    monke: {
        name: 'worker monke',
        desc: 'pay bana? good deal. monke will collec banas.',
        info: 'finds 1 bana every 10 seconds.',
        basePrice: 10,
        baseBpS: 0.1,
        req: 0,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/monke.png'
    },
    tree: {
        name: 'bana tree',
        desc: 'a somewhat profitable bana tree.',
        info: 'grows 1 bana every second.',
        basePrice: 120,
        baseBpS: 1,
        req: 25,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/tree.png'
    },
    farm: {
        name: 'bana farm',
        desc: 'bana is agiculture revoltion now.',
        info: 'produces 6 bana every second.',
        basePrice: 720,
        baseBpS: 6,
        req: 40,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/farm.png'
    },
    market: {
        name: 'bana market',
        desc: 'exchange useless money for useful bana.',
        info: 'purchases 50 bana every second.',
        basePrice: 5000,
        baseBpS: 50,
        req: 250,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/market.png'
    },
    forge: {
        name: 'bana forge',
        desc: 'an bana forge. turn bana ores into banas.',
        info: 'manufactur 100 every second.',
        basePrice: 150000,
        baseBpS: 100,
        req: 1000,
        icon: ''
    },
    magnet: {
        name: 'bana magnet',
        desc: 'attract banas with beeg magnet.',
        info: 'collects 600 bana every second.',
        basePrice: 60000,
        baseBpS: 600,
        req: 3000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/magnet.png'
    },
    fracker: {
        name: 'bana fracker',
        desc: 'pump bana from deep out of the ground.',
        info: 'pumps 1,400 bana every second.',
        basePrice: 180000,
        baseBpS: 1400,
        req: 8000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/fracker.png'
    },
    factory: {
        name: 'bana factory',
        desc: 'utilize combined power of monke and machine.',
        info: 'creates 9,000 bana every second.',
        basePrice: 1300000,
        baseBpS: 9000,
        req: 500000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/factory.png'
    },
    generatorer: {
        name: 'bana generatorer',
        desc: 'a bana generatorer. genorat bana volts into bana. this won be good for the econome.',
        info: 'manufactur 20,000 bana every second.',
        basePrice: 1500000,
        baseBpS: 20000,
        req: 5000000,
        icon: ''
    },
    supercompoper: {
        name: 'bana supercompoper',
        desc: 'a bana supercompoper. it calculate bana into existance with gforse rtx 420.',
        info: 'thonks 100,000 bana into existance every secon.',
        basePrice: 3000000,
        baseBpS: 100000,
        req: 500000,
        icon: ''
    },
    singularity: {
        name: 'bana singularity',
        desc: 'the bana singularty. an manevolent bana being.',
        info: 'sumons 1,000,000 bana into our dimenson every secon from bana dimeson.',
        basePrice: 80000000,
        baseBpS: 1000000,
        req: 80000000,
        icon: ''
    },
    megaBana: {
        name: 'mega bana',
        desc: 'bana make life good. mega bana make life mega good.',
        info: 'wills 10,000,000 bana into existance every second.',
        basePrice: 300000000,
        baseBpS: 10000000,
        req: 80000000,
        icon: ''
    }
};
// building upgrade rate - meaning that each upgrade increases the BpS of a building by x bana.
const upgradeRate = 2;
//------ACHIEVEMENTS------//
// all achievements
const achievements = {
    // bana count related achievements
    'Mmm bana': {
        desc: 'so it begins. | have 1 bana',
        req: function (userObj) {
            return userObj.banaCount == 1;
        },
        icon: ''
    },
    'what happened': {
        desc: 'how did you do that | have <0 bana',
        req: function (userObj) {
            return userObj.banaCount < 0;
        },
        icon: ''
    },
    'yumy bana': {
        desc: 'oh yea bana time | have 50 bana',
        req: function (userObj) {
            return userObj.banaCount == 50;
        },
        icon: ''
    },
    'funy number': {
        desc: 'lolmao | have 69 bana',
        req: function (userObj) {
            return userObj.banaCount == 69;
        },
        icon: ''
    },
    'bana man taly hal': {
        desc: 'gime dubl & a bonus one | have 100 bana',
        req: function (userObj) {
            return userObj.banaCount == 100;
        },
        icon: ''
    },
    'hehe funier number': {
        desc: 'roflmao | have 420 bana',
        req: function (userObj) {
            return userObj.banaCount == 100;
        },
        icon: ''
    },
    'bana expert': {
        desc: 'heres ur bana phd | have 1,000 bana',
        req: function (userObj) {
            return userObj.banaCount == 1000;
        },
        icon: ''
    },
    'hehe funiest number': {
        desc: 'roflmalol😂😁 | have 69,420 bana',
        req: function (userObj) {
            return userObj.banaCount == 69420;
        },
        icon: ''
    },
    banainator: {
        desc: 'aaaaaaaa so many bana | have 100,000 bana',
        req: function (userObj) {
            return userObj.banaCount == 100000;
        },
        icon: ''
    },
    'get a life': {
        desc: 'why are you still doing this go outside or something | have 1 million bana',
        req: function (userObj) {
            return userObj.banaCount == 1000000;
        },
        icon: ''
    },
    haker: {
        desc: "Look how impressed we all are. You have the most digital bananas in a Discord 'idle banana' game because you used your awesome hacker skills. We're all so proud. | have 1 trillion bana",
        req: function (userObj) {
            return userObj.banaCount == 1000000000000;
        },
        icon: ''
    },
    // building related achievements
    // monke achievements
    'pick bana; life good': {
        desc: 'they probly dont have souls | have 1 worker monke',
        req: function (userObj) {
            return userObj.buildings.monke.num == 1;
        },
        icon: ''
    },
    'jungle gang': {
        desc: 'oo oo aa aa | have 100 worker monke',
        req: function (userObj) {
            return userObj.buildings.monke.num == 100;
        },
        icon: ''
    },
    "this one's for harambe": {
        desc: 'rip | have 1000 worker monke',
        req: function (userObj) {
            return userObj.buildings.monke.num == 1000;
        },
        icon: ''
    },
    // tree achievements
    'here he come with som fo me': {
        desc: 'freshly taken from bana tree | have 1 bana tree',
        req: function (userObj) {
            if (userObj.buildings.tree) {
                return userObj.buildings.tree.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    '#temtres': {
        desc: 'mrbest | have 100 bana tree',
        req: function (userObj) {
            if (userObj.buildings.tree) {
                return userObj.buildings.tree.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    arborist: {
        desc: 'wow u rely like trees | have 1000 bana tree',
        req: function (userObj) {
            if (userObj.buildings.tree) {
                return userObj.buildings.tree.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // farm achievements
    'it aint much': {
        desc: 'but its honest bana | have 1 bana farm',
        req: function (userObj) {
            if (userObj.buildings.farm) {
                return userObj.buildings.farm.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'green thumb': {
        desc: 'if u like farms so much y dont u mary it | have 100 bana farm',
        req: function (userObj) {
            if (userObj.buildings.farm) {
                return userObj.buildings.farm.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'old macdonald': {
        desc: 'and on that farm he had bana | have 1000 bana farm',
        req: function (userObj) {
            if (userObj.buildings.farm) {
                return userObj.buildings.farm.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // market achievements
    'bana stonks': {
        desc: '🔺 +999.99 $BANA | have 1 bana market',
        req: function (userObj) {
            if (userObj.buildings.market) {
                return userObj.buildings.market.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'shopping district': {
        desc: 'jk cus then there would be no economy | have 100 bana market',
        req: function (userObj) {
            if (userObj.buildings.market) {
                return userObj.buildings.market.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'trade hub': {
        desc: 'mone is the root of all evil. so just have bana instead | have 1000 bana market',
        req: function (userObj) {
            if (userObj.buildings.market) {
                return userObj.buildings.market.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // magnet achievements
    '*magneting noises*': {
        desc: 'if oposites atract than no wonder ur mom is so hot | have 1 bana magnet',
        req: function (userObj) {
            if (userObj.buildings.magnet) {
                return userObj.buildings.magnet.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    magneto: {
        desc: 'plese don sue us fox network | have 100 bana magnet',
        req: function (userObj) {
            if (userObj.buildings.magnet) {
                return userObj.buildings.magnet.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'refrigerator artist': {
        desc: 'moms gona love this one | have 1000 bana magnet',
        req: function (userObj) {
            if (userObj.buildings.magnet) {
                return userObj.buildings.magnet.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // fracker achievements
    'yellow energy': {
        desc: 'who needs fossil fuels | have 1 bana fracker',
        req: function (userObj) {
            if (userObj.buildings.fracker) {
                return userObj.buildings.fracker.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    motherfracker: {
        desc: 'get it cus get it ha lol | have 100 bana fracker',
        req: function (userObj) {
            if (userObj.buildings.fracker) {
                return userObj.buildings.fracker.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    planetcide: {
        desc: 'the earth warms now due to its proximity to hell. your sins have brought it here. | have 1000 bana fracker',
        req: function (userObj) {
            if (userObj.buildings.fracker) {
                return userObj.buildings.fracker.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // forge achievements
    forge1: {
        desc: 'forge1 | have 1 bana forge',
        req: function (userObj) {
            if (userObj.buildings.forge) {
                return userObj.buildings.forge.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    forge2: {
        desc: 'forge2 | have 100 bana forge',
        req: function (userObj) {
            if (userObj.buildings.forge) {
                return userObj.buildings.forge.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    forge3: {
        desc: 'forge3 | have 1000 bana forge',
        req: function (userObj) {
            if (userObj.buildings.forge) {
                return userObj.buildings.forge.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // factory achievements
    'the industrial revolution is here': {
        desc: 'now we have as embly line for manfactor bana | have 1 bana factory',
        req: function (userObj) {
            if (userObj.buildings.factory) {
                return userObj.buildings.factory.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    factory2: {
        desc: 'factory2 | have 100 bana factory',
        req: function (userObj) {
            if (userObj.buildings.factory) {
                return userObj.buildings.factory.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    sweatshoper: {
        desc: 'what is a businis ethic | have 1000 bana factory',
        req: function (userObj) {
            if (userObj.buildings.factory) {
                return userObj.buildings.factory.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // generatorer achievements
    generatorer1: {
        desc: 'generatorer1 | have 1 bana generatorer',
        req: function (userObj) {
            if (userObj.buildings.generatorer) {
                return userObj.buildings.generatorer.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    generatorer2: {
        desc: 'generatorer2 | have 100 bana generatorer',
        req: function (userObj) {
            if (userObj.buildings.generatorer) {
                return userObj.buildings.generatorer.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    generatorer3: {
        desc: 'generatorer3 | have 1000 bana generatorer',
        req: function (userObj) {
            if (userObj.buildings.generatorer) {
                return userObj.buildings.generatorer.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // supercompoper achievements
    'nasa burglar': {
        desc: 'lets hope they dont notice its missing | have 1 bana supercompoper',
        req: function (userObj) {
            if (userObj.buildings.supercompoper) {
                return userObj.buildings.supercompoper.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'rtx on': {
        desc: '99999tb ram | have 100 bana supercompoper',
        req: function (userObj) {
            if (userObj.buildings.supercompoper) {
                return userObj.buildings.supercompoper.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'true artificial intellygents': {
        desc: 'ai has calculated the purpose of life (√64+∑/∞ = bana) | have 1000 bana supercompoper',
        req: function (userObj) {
            if (userObj.buildings.supercompoper) {
                return userObj.buildings.supercompoper.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // singularity achievements
    'you divided zero by zero': {
        desc: 'finally after years the bana molla cule has been split | have 1 bana singularity',
        req: function (userObj) {
            if (userObj.buildings.singularity) {
                return userObj.buildings.singularity.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    singularity2: {
        desc: 'singularity2 | have 100 bana singularity',
        req: function (userObj) {
            if (userObj.buildings.singularity) {
                return userObj.buildings.singularity.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    singularity3: {
        desc: 'singularity3 | have 1000 bana singularity',
        req: function (userObj) {
            if (userObj.buildings.singularity) {
                return userObj.buildings.singularity.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    // mega bana achievements
    'big bana energy': {
        desc: 'have 1 mega bana',
        req: function (userObj) {
            if (userObj.buildings.megaBana) {
                return userObj.buildings.megaBana.num == 1;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'i like big bana an i canot lie': {
        desc: 'u oder broders shuld al die | have 100 mega bana',
        req: function (userObj) {
            if (userObj.buildings.megaBana) {
                return userObj.buildings.megaBana.num == 100;
            }
            else {
                return false;
            }
        },
        icon: ''
    },
    'absolute gamer': {
        desc: 'hes fr goted im ngl | have 1000 mega bana',
        req: function (userObj) {
            if (userObj.buildings.megaBana) {
                return userObj.buildings.megaBana.num == 1000;
            }
            else {
                return false;
            }
        },
        icon: ''
    }
};

/// <reference types="@pylonbot/runtime" />
// compression function
function compress(obj) {
    let json = JSON.stringify(obj);
    return btoa(json);
}
// decompression function
function deCompress(base64) {
    let json = atob(base64);
    return JSON.parse(json);
}
// gets user object
async function getUserObj(id) {
    // @ts-ignore
    return deCompress(await banaKv.get(id));
}
// puts user object to db
async function putUserObj(id, obj) {
    await banaKv.put(id, compress(obj));
}
// Checks if the player has played bana before, and if not,
async function checkForNewPlayer(id) {
    // @ts-ignore
    if (!(await banaKv.get(id))) {
        let userObj = new User(id);
        await putUserObj(id, userObj);
    }
}
async function calcBps(id) {
    await checkForNewPlayer(id);
    let bps = 0;
    // @ts-ignore
    let userObj = await getUserObj(id);
    let userBuildings = Object.keys(userObj.buildings);
    for (let i = 0; i < userBuildings.length; i++) {
        let building = userObj.buildings[userBuildings[i]];
        // @ts-ignore
        let baseBuildingBps = buildings[userBuildings[i]].baseBpS;
        let numOfBuilding = building.num;
        let totalBuildingBps = numOfBuilding * (baseBuildingBps + upgradeRate * building.lvl);
        bps = bps + totalBuildingBps;
    }
    return bps;
}

/// <reference types="@pylonbot/runtime" />
// @ts-ignore
const banaCommands = new discord.command.CommandGroup({
    defaultPrefix: prefix
});
// help command
banaCommands.raw({
    name: 'help',
    aliases: ['h']
}, async (message) => {
    // @ts-ignore
    const helpEmbed = new discord.Embed();
    helpEmbed.setTitle('🍌 idle bana help 🍌');
    helpEmbed.setColor(0xf2d70e);
    helpEmbed.setDescription('idle bana is a supa epic idle game. yor big gole is colec da most bana. u can increse ur bps (bana per secon) by purchas bulding with bana to produce mor bana. belo are bana comand.');
    helpEmbed.addField({
        name: '.help (.h)',
        value: 'send dis bana help mesage. \nhow use: `.help`'
    });
    helpEmbed.addField({
        name: '.grab (.g)',
        value: 'grab bana. dependig on ur bps and how long u wait u can get more bana. \nhow use: `.grab`'
    });
    helpEmbed.addField({
        name: '.profile (.p)',
        value: 'see how many bana u (or someon else) hav, bps, builings an mor \nhow use: `.profile <optional: @user>`'
    });
    helpEmbed.addField({
        name: '.achievements (.a)',
        value: 'see all achivemen u hav \nhow use: `.achievements`'
    });
    helpEmbed.addField({
        name: '.profile (.p)',
        value: 'see how many bana u hav, bps, builings an mor \nhow use: `.profile <optional: @user>`'
    });
    let buildingsKeys = Object.keys(buildings);
    let buyOptions = '';
    for (let i = 0; i < buildingsKeys.length; i++) {
        if (i == 0) {
            buyOptions = `${buyOptions} \`${buildingsKeys[i]}\``;
        }
        else {
            buyOptions = `${buyOptions}, \`${buildingsKeys[i]}\``;
        }
    }
    helpEmbed.addField({
        name: '.buy (.b)',
        value: `buy building with bana \nhow use: \`.buy <amount of building> <building type>\`\nu can buy: ${buyOptions}`
    });
    await message.reply(helpEmbed);
});
// grab command
banaCommands.raw({
    name: 'grab',
    aliases: ['g']
}, async (message) => {
    await message.reply('it work');
});
// profile command
banaCommands.raw({
    name: 'profile',
    aliases: ['p']
}, async (message) => {
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
        value: `${userObj.achievements.length}/${Object.keys(achievements).length}`,
        inline: true
    });
    let buildingsKeys = Object.keys(userObj.buildings);
    let buildingsCountStr = '';
    for (let i = 0; i < buildingsKeys.length; i++) {
        buildingsCountStr = `${buildingsCountStr}${
        // @ts-ignore
        buildings[buildingsKeys[i]].name}: ${userObj.buildings[buildingsKeys[i]].num}\n`;
    }
    profileEmbed.addField({
        name: '# of buildings',
        value: `${buildingsCountStr}`,
        inline: true
    });
    let buildingsLvlStr = '';
    for (let i = 0; i < buildingsKeys.length; i++) {
        buildingsLvlStr = `${buildingsLvlStr}${
        // @ts-ignore
        buildings[buildingsKeys[i]].name}: ${userObj.buildings[buildingsKeys[i]].lvl}\n`;
    }
    profileEmbed.addField({
        name: 'building lvls',
        value: `${buildingsLvlStr}`,
        inline: true
    });
    await message.reply(profileEmbed);
});
// achievements command
banaCommands.raw({
    name: 'achievements',
    aliases: ['a']
}, async (message) => {
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
        }
        else {
            achStr = `${achStr}, ${achKeys[i]}`;
        }
    }
    if (achStr.length == 0) {
        achStr = 'You have completed no achievements yet.';
    }
    achEmbed.setDescription(achStr);
    await message.reply(achEmbed);
});
// choices for buy/sell commands
let convertedChoices = Object.keys(buildings).map((name) => name.toLowerCase());
// number sanitization for buy/sell commands
function checkNumber(number) {
    // check if positive
    if (number > 0) {
        // check if integer
        if (Number.isInteger(number)) {
            return true;
        }
        else {
            return 'Not an integer.';
        }
    }
    else {
        return 'Not a positive number.';
    }
}
// calc current building buying price
async function calcBuyPrice(building, amount, id) {
    // @ts-ignore
    buildings[building].basePrice;
    let price = 0;
    let userObj = await getUserObj(id);
    userObj.buildings[building].num;
    // calc price
    return price;
}
// calc current building sell price
async function calcSellPrice(building, amount, id) {
    // @ts-ignore
    let basePrice = buildings[building].basePrice;
    let price = basePrice;
    let userObj = await getUserObj(id);
    userObj.buildings[building].num;
    // calc price
    return price;
}
// buy building command
banaCommands.on({
    name: 'buy',
    aliases: ['b']
}, (args) => ({
    amount: args.number(),
    building: args.string({ choices: convertedChoices })
}), async (message, { amount, building }) => {
    if (checkNumber(amount) === true) {
        let userObj = await getUserObj(message.author.id);
        let price = await calcBuyPrice(building, amount, message.author.id);
        if (userObj.banaCount >= price) {
            userObj.banaCount = userObj.banaCount - price;
            userObj.buildings[building].num =
                userObj.buildings[building].num + amount;
            await putUserObj(message.author.id, userObj);
            // @ts-ignore
            const buyEmbed = new discord.Embed();
            buyEmbed.setTitle(
            // @ts-ignore
            `Bought ${amount} ${buildings[building].name}(s) for ${price} bana!`);
            buyEmbed.setColor(0xf2d70e);
            // @ts-ignore
            buyEmbed.setDescription(`${buildings[building].info}`);
            buyEmbed.setFooter({
                // @ts-ignore
                text: `${buildings[building].desc}`
            });
            buyEmbed.setThumbnail({
                // @ts-ignore
                url: `${buildings[building].icon}`
            });
            await message.reply(buyEmbed);
        }
        else {
            await message.reply(
            // @ts-ignore
            `You cannot afford this purchase of ${amount} ${buildings[building].name}(s) for ${price} bana.`);
        }
    }
    else {
        // error
        await message.reply(`Error: ${checkNumber(amount)}`);
    }
});
// sell building command
banaCommands.on({
    name: 'sell',
    aliases: ['s']
}, (args) => ({
    amount: args.number(),
    building: args.string({ choices: convertedChoices })
}), async (message, { amount, building }) => {
    if (checkNumber(amount) === true) {
        // sell buildings
        let userObj = await getUserObj(message.author.id);
        let price = await calcSellPrice(building, amount, message.author.id);
        if (userObj.buildings[building].num >= amount) {
            userObj.banaCount = userObj.banaCount + price;
            userObj.buildings[building].num =
                userObj.buildings[building].num - amount;
            await putUserObj(message.author.id, userObj);
            // @ts-ignore
            const sellEmbed = new discord.Embed();
            sellEmbed.setTitle(
            // @ts-ignore
            `Sold ${amount} ${buildings[building].name}(s) for ${price} bana!`);
            sellEmbed.setColor(0xf2d70e);
            // @ts-ignore
            sellEmbed.setDescription(`${buildings[building].info}`);
            sellEmbed.setFooter({
                // @ts-ignore
                text: `${buildings[building].desc}`
            });
            sellEmbed.setThumbnail({
                // @ts-ignore
                url: `${buildings[building].icon}`
            });
            await message.reply(sellEmbed);
        }
        else {
            await message.reply(
            // @ts-ignore
            `You don't have ${amount} ${buildings[building].name}(s) to sell!`);
        }
    }
    else {
        // error
        await message.reply(`Error: ${checkNumber(amount)}`);
    }
});
