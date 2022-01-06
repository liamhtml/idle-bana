//------GENERAL------//

// @ts-ignore
export const banaKv = new pylon.KVNamespace('bana db');

//------BUILDINGS------//

// building data
export const buildings = {
    monke: {
        name: 'worker monke',
        desc: 'pay bana? good deal. monke will collec banas.',
        info: 'finds {b} bana every 10 seconds.',
        basePrice: 10,
        baseBpS: 0.1,
        req: 0,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/monke.png'
    },
    tree: {
        name: 'bana tree',
        desc: 'a somewhat profitable bana tree.',
        info: 'grows {b} bana every second.',
        basePrice: 120,
        baseBpS: 1,
        req: 25,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/tree.png'
    },
    farm: {
        name: 'bana farm',
        desc: 'bana is agiculture revoltion now.',
        info: 'produces {b} bana every second.',
        basePrice: 720,
        baseBpS: 6,
        req: 40,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/farm.png'
    },
    market: {
        name: 'bana market',
        desc: 'exchange useless money for useful bana.',
        info: 'purchases {b} bana every second.',
        basePrice: 5000,
        baseBpS: 50,
        req: 250,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/market.png'
    },
    magnet: {
        name: 'bana magnet',
        desc: 'attract banas with beeg magnet.',
        info: 'collects {b} bana every second.',
        basePrice: 60000,
        baseBpS: 600,
        req: 3000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/magnet.png'
    },
    fracker: {
        name: 'bana fracker',
        desc: 'pump bana from deep out of the ground.',
        info: 'pumps {b} bana every second.',
        basePrice: 180000,
        baseBpS: 1400,
        req: 8000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/fracker.png'
    },
    forge: {
        name: 'bana forge',
        desc: 'an bana forge. turn bana ores into banas.',
        info: 'manufactur {b} every second.',
        basePrice: 150000,
        baseBpS: 100,
        req: 50000,
        icon: ''
    },
    factory: {
        name: 'bana factory',
        desc: 'utilize combined power of monke and machine.',
        info: 'creates {b} bana every second.',
        basePrice: 1300000,
        baseBpS: 9000,
        req: 500000,
        icon: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/factory.png'
    },
    generatorer: {
        name: 'bana generatorer',
        desc:
            'a bana generatorer. genorat bana volts into bana. this won be good for the econome.',
        info: 'manufactur {b} bana every second.',
        basePrice: 1500000,
        baseBpS: 400,
        req: 500000,
        icon: ''
    },
    supercompoper: {
        name: 'bana supercompoper',
        desc:
            'a bana supercompoper. it calculate bana into existance with gforse rtx 420.',
        info: 'thonks {b} bana into existance every secon.',
        basePrice: 3000000,
        baseBpS: 1200,
        req: 500000,
        icon: ''
    },
    singularity: {
        name: 'bana singularity',
        desc: 'the bana singularty. an manevolent bana being.',
        info: 'sumons {b} bana into our dimenson every secon from bana dimeson.',
        basePrice: 80000000,
        baseBpS: 5000,
        req: 80000000,
        icon: ''
    },
    megaBana: {
        name: 'mega bana',
        desc: 'bana make life good. mega bana make life mega good.',
        info: 'wills {b} bana into existance every second.',
        basePrice: 300000000,
        baseBpS: 18000,
        req: 80000000,
        icon: ''
    }
};

// price * 1.15 = new price
export const priceIncreaseRate = 1.15;

// building upgrade rate - meaning that each upgrade increases the BpS of a building by x bana.
export const upgradeRate = 2;

//------ACHIEVEMENTS------//

// all achievements
export const achievements = {
    // bana count related achievements
    'Mmm bana': {
        desc: 'so it begins. | have 1 bana',
        req: function (userObj) { return userObj.banaCount == 1},
        icon: ''
    },
    'what happened': {
        desc: 'how did you do that | have bana <0',
        req: function (userObj) { return userObj.banaCount < 0 },
        icon: ''
    },
    'yumy bana': {
        desc: 'oh yea bana time | have 50 bana',
        req: function (userObj) { return userObj.banaCount == 50 },
        icon: ''
    },
    'funy number': {
        desc: 'lolmao | have 69 bana',
        req: function (userObj) { return userObj.banaCount == 69 },
        icon: ''
    },
    'bana man taly hal': {
        desc: 'gime dubl & a bonus one | have 100 bana',
        req: function (userObj) { return userObj.banaCount == 100 },
        icon: ''
    },
    'hehe funier number': {
        desc: 'roflmao | have 420 bana',
        req: function (userObj) { return userObj.banaCount == 100 },
        icon: ''
    },
    'bana expert': {
        desc: 'heres ur bana phd | have 1,000 bana',
        req: function (userObj) { return userObj.banaCount == 1000 },
        icon: ''
    },
    'hehe funiest number': {
        desc: 'roflmalol😂😁 | have 69,420 bana',
        req: function (userObj) { return userObj.banaCount == 69420 },
        icon: ''
    },
    'banainator': {
        desc: 'aaaaaaaa so many bana | have 100,000 bana',
        req: function (userObj) { return userObj.banaCount == 100000 },
        icon: ''
    },
    'get a life': {
        desc: 'why are you still doing this go outside or something | have 1 million bana',
        req: function (userObj) { return userObj.banaCount == 1000000 },
        icon: ''
    },
    'haker': {
        desc:
            "Look how impressed we all are. You have the most digital bananas in a Discord 'idle banana' game because you used your awesome hacker skills. We're all so proud. | have 1 trillion bana",
        req: function (userObj) { return userObj.banaCount == 1000000000000 },
        icon: ''
    },
    // building related achievements
        // monke achievements
        'pick bana; life good': {
            desc: 'they probly dont have souls | have 1 worker monke',
            req: function (userObj) { 
                return userObj.buildings.monke.num == 1 
            },
            icon: ''
        },
        'jungle gang': {
            desc: 'oo oo aa aa | have 100 worker monke',
            req: function (userObj) {
                return userObj.buildings.monke.num == 100
            },
            icon: ''
        },
        'this one\'s for harambe': {
            desc: 'rip | have 1000 worker monke',
            req: function (userObj) {
                return userObj.buildings.monke.num == 1000
            },
            icon: ''
        },
        // tree achievements
        'here he come with som fo me': {
            desc: 'freshly taken from bana tree | have 1 bana tree',
            req: function (userObj) {
                if (userObj.buildings.tree) {
                    return userObj.buildings.tree.num == 1
                } else {
                    return false;
                }
            },
            icon: ''
        },
        '#temtres': {
            desc: 'mrbest | have 100 bana tree',
            req: function (userObj) {
                if (userObj.buildings.tree) {
                    return userObj.buildings.tree.num == 100
                } else {
                    return false;
                }
            },
            icon: ''
        },
        'arborist': {
            desc: 'wow u rely like trees | have 1000 bana tree',
            req: function (userObj) {
                if (userObj.buildings.tree) {
                    return userObj.buildings.tree.num == 1000
                } else {
                    return false;
                }
            },
            icon: ''
        },
};
