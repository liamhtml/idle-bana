/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />
// This states that you are writing code using Pylon types, do not remove it if you want to your code to work!
//------CONFIG------//

// default command prefix
export const prefix = '.';

// default bot channel. if left blank, the bot will work in any channel
export const channelId = '928453364096860260';


//------GENERAL------//

// bana kv
export const banaKv = new pylon.KVNamespace('bana db');

// user class
export class User {
  id: string;
  banaCount: number;
  lastGrab: number;
  buildings: object;
  achievements: [];

  constructor(id: string) {
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
export const buildings = {
  monke: {
    name: 'worker monke',
    desc: 'pay bana? good deal. monke will collec banas.',
    info: 'finds 1 bana every 10 seconds.',
    basePrice: 10,
    baseBpS: 0.1,
    req: 0,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/monke.png'
  },
  tree: {
    name: 'bana tree',
    desc: 'a somewhat profitable bana tree.',
    info: 'grows 1 bana every second.',
    basePrice: 120,
    baseBpS: 1,
    req: 25,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/tree.png'
  },
  farm: {
    name: 'bana farm',
    desc: 'bana is agiculture revoltion now.',
    info: 'produces 6 bana every second.',
    basePrice: 720,
    baseBpS: 6,
    req: 40,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/farm.png'
  },
  market: {
    name: 'bana market',
    desc: 'exchange useless money for useful bana.',
    info: 'purchases 50 bana every second.',
    basePrice: 5000,
    baseBpS: 50,
    req: 250,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/market.png'
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
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/magnet.png'
  },
  fracker: {
    name: 'bana fracker',
    desc: 'pump bana from deep out of the ground.',
    info: 'pumps 1,400 bana every second.',
    basePrice: 180000,
    baseBpS: 1400,
    req: 8000,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/fracker.png'
  },
  factory: {
    name: 'bana factory',
    desc: 'utilize combined power of monke and machine.',
    info: 'creates 9,000 bana every second.',
    basePrice: 1300000,
    baseBpS: 9000,
    req: 500000,
    icon:
      'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/factory.png'
  },
  generatorer: {
    name: 'bana generatorer',
    desc:
      'a bana generatorer. genorat bana volts into bana. this won be good for the econome.',
    info: 'manufactur 20,000 bana every second.',
    basePrice: 1500000,
    baseBpS: 20000,
    req: 5000000,
    icon: ''
  },
  supercompoper: {
    name: 'bana supercompoper',
    desc:
      'a bana supercompoper. it calculate bana into existance with gforse rtx 420.',
    info: 'thonks 100,000 bana into existance every secon.',
    basePrice: 3000000,
    baseBpS: 100000,
    req: 500000,
    icon: ''
  },
  singularity: {
    name: 'bana singularity',
    desc: 'the bana singularty. an manevolent bana being.',
    info:
      'sumons 1,000,000 bana into our dimenson every secon from bana dimeson.',
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
    req: function(userObj: any) {
      return userObj.banaCount == 1;
    },
    icon: ''
  },
  'what happened': {
    desc: 'how did you do that | have <0 bana',
    req: function(userObj: any) {
      return userObj.banaCount < 0;
    },
    icon: ''
  },
  'yumy bana': {
    desc: 'oh yea bana time | have 50 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 50;
    },
    icon: ''
  },
  'funy number': {
    desc: 'lolmao | have 69 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 69;
    },
    icon: ''
  },
  'bana man taly hal': {
    desc: 'gime dubl & a bonus one | have 100 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 100;
    },
    icon: ''
  },
  'hehe funier number': {
    desc: 'roflmao | have 420 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 100;
    },
    icon: ''
  },
  'bana expert': {
    desc: 'heres ur bana phd | have 1,000 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 1000;
    },
    icon: ''
  },
  'hehe funiest number': {
    desc: 'roflmalol😂😁 | have 69,420 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 69420;
    },
    icon: ''
  },
  banainator: {
    desc: 'aaaaaaaa so many bana | have 100,000 bana',
    req: function(userObj: any) {
      return userObj.banaCount == 100000;
    },
    icon: ''
  },
  'get a life': {
    desc:
      'why are you still doing this go outside or something | have 1 million bana',
    req: function(userObj: any) {
      return userObj.banaCount == 1000000;
    },
    icon: ''
  },
  haker: {
    desc:
      "Look how impressed we all are. You have the most digital bananas in a Discord 'idle banana' game because you used your awesome hacker skills. We're all so proud. | have 1 trillion bana",
    req: function(userObj: any) {
      return userObj.banaCount == 1000000000000;
    },
    icon: ''
  },
  // building related achievements
  // monke achievements
  'pick bana; life good': {
    desc: 'they probly dont have souls | have 1 worker monke',
    req: function(userObj: any) {
      return userObj.buildings.monke.num == 1;
    },
    icon: ''
  },
  'jungle gang': {
    desc: 'oo oo aa aa | have 100 worker monke',
    req: function(userObj: any) {
      return userObj.buildings.monke.num == 100;
    },
    icon: ''
  },
  "this one's for harambe": {
    desc: 'rip | have 1000 worker monke',
    req: function(userObj: any) {
      return userObj.buildings.monke.num == 1000;
    },
    icon: ''
  },
  // tree achievements
  'here he come with som fo me': {
    desc: 'freshly taken from bana tree | have 1 bana tree',
    req: function(userObj: any) {
      if (userObj.buildings.tree) {
        return userObj.buildings.tree.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  '#temtres': {
    desc: 'mrbest | have 100 bana tree',
    req: function(userObj: any) {
      if (userObj.buildings.tree) {
        return userObj.buildings.tree.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  arborist: {
    desc: 'wow u rely like trees | have 1000 bana tree',
    req: function(userObj: any) {
      if (userObj.buildings.tree) {
        return userObj.buildings.tree.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // farm achievements
  'it aint much': {
    desc: 'but its honest bana | have 1 bana farm',
    req: function(userObj: any) {
      if (userObj.buildings.farm) {
        return userObj.buildings.farm.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'green thumb': {
    desc: 'if u like farms so much y dont u mary it | have 100 bana farm',
    req: function(userObj: any) {
      if (userObj.buildings.farm) {
        return userObj.buildings.farm.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'old macdonald': {
    desc: 'and on that farm he had bana | have 1000 bana farm',
    req: function(userObj: any) {
      if (userObj.buildings.farm) {
        return userObj.buildings.farm.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // market achievements
  'bana stonks': {
    desc: '🔺 +999.99 $BANA | have 1 bana market',
    req: function(userObj: any) {
      if (userObj.buildings.market) {
        return userObj.buildings.market.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'shopping district': {
    desc: 'jk cus then there would be no economy | have 100 bana market',
    req: function(userObj: any) {
      if (userObj.buildings.market) {
        return userObj.buildings.market.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'trade hub': {
    desc:
      'mone is the root of all evil. so just have bana instead | have 1000 bana market',
    req: function(userObj: any) {
      if (userObj.buildings.market) {
        return userObj.buildings.market.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // magnet achievements
  '*magneting noises*': {
    desc:
      'if oposites atract than no wonder ur mom is so hot | have 1 bana magnet',
    req: function(userObj: any) {
      if (userObj.buildings.magnet) {
        return userObj.buildings.magnet.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  magneto: {
    desc: 'plese don sue us fox network | have 100 bana magnet',
    req: function(userObj: any) {
      if (userObj.buildings.magnet) {
        return userObj.buildings.magnet.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'refrigerator artist': {
    desc: 'moms gona love this one | have 1000 bana magnet',
    req: function(userObj: any) {
      if (userObj.buildings.magnet) {
        return userObj.buildings.magnet.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // fracker achievements
  'yellow energy': {
    desc: 'who needs fossil fuels | have 1 bana fracker',
    req: function(userObj: any) {
      if (userObj.buildings.fracker) {
        return userObj.buildings.fracker.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  motherfracker: {
    desc: 'get it cus get it ha lol | have 100 bana fracker',
    req: function(userObj: any) {
      if (userObj.buildings.fracker) {
        return userObj.buildings.fracker.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  planetcide: {
    desc:
      'the earth warms now due to its proximity to hell. your sins have brought it here. | have 1000 bana fracker',
    req: function(userObj: any) {
      if (userObj.buildings.fracker) {
        return userObj.buildings.fracker.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // forge achievements
  forge1: {
    desc: 'forge1 | have 1 bana forge',
    req: function(userObj: any) {
      if (userObj.buildings.forge) {
        return userObj.buildings.forge.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  forge2: {
    desc: 'forge2 | have 100 bana forge',
    req: function(userObj: any) {
      if (userObj.buildings.forge) {
        return userObj.buildings.forge.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  forge3: {
    desc: 'forge3 | have 1000 bana forge',
    req: function(userObj: any) {
      if (userObj.buildings.forge) {
        return userObj.buildings.forge.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // factory achievements
  'the industrial revolution is here': {
    desc: 'now we have as embly line for manfactor bana | have 1 bana factory',
    req: function(userObj: any) {
      if (userObj.buildings.factory) {
        return userObj.buildings.factory.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  factory2: {
    desc: 'factory2 | have 100 bana factory',
    req: function(userObj: any) {
      if (userObj.buildings.factory) {
        return userObj.buildings.factory.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  sweatshoper: {
    desc: 'what is a businis ethic | have 1000 bana factory',
    req: function(userObj: any) {
      if (userObj.buildings.factory) {
        return userObj.buildings.factory.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // generatorer achievements
  generatorer1: {
    desc: 'generatorer1 | have 1 bana generatorer',
    req: function(userObj: any) {
      if (userObj.buildings.generatorer) {
        return userObj.buildings.generatorer.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  generatorer2: {
    desc: 'generatorer2 | have 100 bana generatorer',
    req: function(userObj: any) {
      if (userObj.buildings.generatorer) {
        return userObj.buildings.generatorer.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  generatorer3: {
    desc: 'generatorer3 | have 1000 bana generatorer',
    req: function(userObj: any) {
      if (userObj.buildings.generatorer) {
        return userObj.buildings.generatorer.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // supercompoper achievements
  'nasa burglar': {
    desc: 'lets hope they dont notice its missing | have 1 bana supercompoper',
    req: function(userObj: any) {
      if (userObj.buildings.supercompoper) {
        return userObj.buildings.supercompoper.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'rtx on': {
    desc: '99999tb ram | have 100 bana supercompoper',
    req: function(userObj: any) {
      if (userObj.buildings.supercompoper) {
        return userObj.buildings.supercompoper.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'true artificial intellygents': {
    desc:
      'ai has calculated the purpose of life (√64+∑/∞ = bana) | have 1000 bana supercompoper',
    req: function(userObj: any) {
      if (userObj.buildings.supercompoper) {
        return userObj.buildings.supercompoper.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // singularity achievements
  'you divided zero by zero': {
    desc:
      'finally after years the bana molla cule has been split | have 1 bana singularity',
    req: function(userObj: any) {
      if (userObj.buildings.singularity) {
        return userObj.buildings.singularity.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  singularity2: {
    desc: 'singularity2 | have 100 bana singularity',
    req: function(userObj: any) {
      if (userObj.buildings.singularity) {
        return userObj.buildings.singularity.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  singularity3: {
    desc: 'singularity3 | have 1000 bana singularity',
    req: function(userObj: any) {
      if (userObj.buildings.singularity) {
        return userObj.buildings.singularity.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  },
  // mega bana achievements
  'big bana energy': {
    desc: 'have 1 mega bana',
    req: function(userObj: any) {
      if (userObj.buildings.megaBana) {
        return userObj.buildings.megaBana.num == 1;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'i like big bana an i canot lie': {
    desc: 'u oder broders shuld al die | have 100 mega bana',
    req: function(userObj: any) {
      if (userObj.buildings.megaBana) {
        return userObj.buildings.megaBana.num == 100;
      } else {
        return false;
      }
    },
    icon: ''
  },
  'absolute gamer': {
    desc: 'hes fr goted im ngl | have 1000 mega bana',
    req: function(userObj: any) {
      if (userObj.buildings.megaBana) {
        return userObj.buildings.megaBana.num == 1000;
      } else {
        return false;
      }
    },
    icon: ''
  }
};
