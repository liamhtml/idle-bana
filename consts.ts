//------GENERAL------//


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
        icon: '',
    },
    tree: {
        name: 'bana tree',
        desc: 'a somewhat profitable bana tree.',
        info: 'grows {b} bana every second.',
        basePrice: 120,
        baseBpS: 1,
        req: 25,
        icon: '',
    },
    farm: {
        name: 'bana farm',
        desc: 'bana is agiculture revoltion now.',
        info: 'produces {b} bana every second.',
        basePrice: 720,
        baseBpS: 6,
        req: 40,
        icon: '',
    },
    market: {
        name: 'bana market',
        desc: 'exchange useless money for useful bana.',
        info: 'purchases {b} bana every second.',
        basePrice: 5000,
        baseBpS: 50,
        req: 250,
        icon: '',
    },
    magnet: {
        name: 'bana magnet',
        desc: 'attract banas with beeg magnet.',
        info: 'collects {b} bana every second.',
        basePrice: 60000,
        baseBpS: 600,
        req: 3000,
        icon: '',
    },
    fracker: {
        name: 'bana fracker',
        desc: 'pump bana from deep out of the ground.',
        info: 'pumps {b} bana every second.',
        basePrice: 180000,
        baseBpS: 1400,
        req: 8000,
        icon: '',
    },
    forge: {
        name: 'bana forge',
        desc: 'an bana forge. turn bana ores into banas.',
        info: 'manufactur {b} every second.',
        basePrice: 150000,
        baseBpS: 100,
        req: 50000,
        icon: '',
    },
    factory: {
        name: 'bana factory',
        desc: 'utilize combined power of monke and machine.',
        info: 'creates {b} bana every second.',
        basePrice: 1300000,
        baseBpS: 9000,
        req: 500000,
        icon: '',
    },
    generatorer: {
        name: 'bana generatorer',
        desc: 'a bana generatorer. genorat bana volts into bana. this won be good for the econome.',
        info: 'manufactur {b} bana every second.',
        basePrice: 1500000,
        baseBpS: 400,
        req: 500000,
        icon: '',
    },
    supercompoper: {
        name: 'bana supercompoper',
        desc: 'a bana supercompoper. it calculate bana into existance with gforse rtx 420.',
        info: 'thonks {b} bana into existance every secon.',
        basePrice: 3000000,
        baseBpS: 1200,
        req: 500000,
        icon: '',
    },
    singularity: {
        name: 'bana singularity',
        desc: 'the bana singularty. an manevolent bana being.',
        info: 'sumons {b} bana into our dimenson every secon from bana dimeson.',
        basePrice: 80000000,
        baseBpS: 5000,
        req: 80000000,
        icon: '',
    },
    megaBana: {
        name: 'mega bana',
        desc: 'bana make life good. mega bana make life mega good.',
        info: 'wills {b} bana into existance every second.',
        basePrice: 300000000,
        baseBpS: 18000,
        req: 80000000,
        icon: '',
    },
};

// price * 1.15 = new price
export const priceIncreaseRate = 1.15;

//------ACHIEVEMENTS------//

// all achievements
export const achievements = {
    'Mmm bana': {
        desc: 'so it begins.',
        req: 'userObj.banaCount > 0',
        icon: ''
    },
    'yumy bana': {
        desc: 'oh yea bana time',
        req: 'userObj.banaCount > 49',
        icon: ''
    },
    'bana man taly hal': {
        desc: 'gime dubl & a bonus one',
        req: 'userObj.banaCount > 99',
        icon: ''
    },
    'bana expert': {
        desc: 'heres ur bana phd',
        req: 'userObj.banaCount > 999',
        icon: ''
    },
    'banainator': {
        desc: 'aaaaaaaa so many bana',
        req: 'userObj.banaCount > 99999',
        icon: ''
    },
    'get a life': {
        desc: 'why are you still doing this go outside or something',
        req: 'userObj.banaCount > 999999',
        icon: ''
    },
    'haker': {
        desc: 'Look how impressed we all are. You have the most digital bananas in a Discord \'idle banana\' game because you used your awesome hacker skills. We\'re all so proud.',
        req: 'userObj.banaCount > 999999999998',
        icon: ''
    },
}