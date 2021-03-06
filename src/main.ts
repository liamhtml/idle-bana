/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />
// This states that you are writing code using Pylon types, do not remove it if you want to your code to work!
// imports
import { buildings, achievements, priceIncreaseRate } from './consts';
import {
  checkForNewPlayer,
  getUserObj,
  putUserObj,
  calcBps,
  checkNumber,
  calcBuyPrice,
  calcSellPrice,
  checkChannel
} from './funcs';
import { prefix } from './config';

// @ts-ignore
const banaCommands = new discord.command.CommandGroup({
  defaultPrefix: prefix
});

// help command
banaCommands.raw(
  {
    name: 'help',
    aliases: ['h']
  },
  async (message) => {
    if (!await checkChannel(message.channelId)) return;
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
    helpEmbed.addField({
      name: '.sell (.s)',
      value: `sell bulding for bana \nhow use: \`.sell <amount of building> <building type>\`\nu can sell: ${buyOptions}`
    });
    helpEmbed.addField({
      name: '.up (.u)',
      value: `upgrads building with bana!!1! \nhow use: \`.up <building type>\`\nu can upgrade: ${buyOptions}`
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
    if (!await checkChannel(message.channelId)) return;
    await checkForNewPlayer(message.author.id);
    let userObj = await getUserObj(message.author.id);
    if (userObj.lastGrab == 0) {
      userObj.lastGrab = Date.now();
      await putUserObj(message.author.id, userObj);
      userObj = await getUserObj(message.author.id);
    }
    let now = Date.now()
    let timeDiff = (now - userObj.lastGrab) / 1000;
    let grabbedBana = 0;
    if (timeDiff > 30) {
      grabbedBana = 30 * await calcBps(message.author.id);
    } else {
      grabbedBana = timeDiff * await calcBps(message.author.id);
    }

    userObj.lastGrab = now;
    userObj.banaCount += grabbedBana;
    await putUserObj(message.author.id, userObj);

    const embed = new discord.Embed();
    embed.setTitle(`u grab ${parseFloat(grabbedBana.toFixed(2))} bana!!1`);
    embed.setColor(0xf2d70e);
    embed.setThumbnail({
      url: 'https://raw.githubusercontent.com/liamhtml/idle-bana/main/assets/img/bana.png'
    });
    embed.setDescription(`last bana grab was ${parseFloat(timeDiff.toFixed(2))} secon ago\nyuo hav ${parseFloat(userObj.banaCount.toFixed(2))} bana`);
    await message.reply(embed);
  }
);

// profile command
banaCommands.on(
  {
    name: 'profile',
    aliases: ['p']
  },
  (args) => ({
    member: args.guildMemberOptional()
  }),
  async (message, { member }) => {
    if (!await checkChannel(message.channelId)) return;
    await checkForNewPlayer(message.author.id);
    if (member) await checkForNewPlayer(member.user.id);
    // @ts-ignore
    let userObj = await getUserObj(message.author.id) ;
    let user = message.author;
    if (member){
      userObj = await getUserObj(member.user.id) 
      user = member.user;
    }
    // @ts-ignore
    const profileEmbed = new discord.Embed();
    profileEmbed.setTitle(`🍌 ${user.username}'s profile 🍌`);
    profileEmbed.setColor(0xf2d70e);
    profileEmbed.setThumbnail({
      url: user.getAvatarUrl()
    });
    profileEmbed.addField({
      name: '# of bana',
      value: `${parseFloat(userObj.banaCount.toFixed(2))}`,
      inline: true
    });
    profileEmbed.addField({
      name: 'bps',
      value: `${parseFloat((await calcBps(message.author.id)).toFixed(2))}`,
      inline: true
    });
    profileEmbed.addField({
      name: 'achievements',
      value: `${userObj.achievements.length}/${
        Object.keys(achievements).length
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
        // @ts-ignore
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
    if (!await checkChannel(message.channelId)) return;
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
      achStr = 'cringe u got no achevements LLLL';
    }
    achEmbed.setDescription(achStr);

    await message.reply(achEmbed);
  }
);

// choices for buy/sell commands
let convertedChoices = Object.keys(buildings).map((name) => name.toLowerCase());

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
    if (!await checkChannel(message.channelId)) return;
    if (checkNumber(amount) === true) {
      let userObj = await getUserObj(message.author.id);
      building = building.toLowerCase();
      if (!userObj.buildings[building]) {
        userObj.buildings[building] = {
          num: 0,
          lvl: 0
        }
        await putUserObj(message.author.id, userObj);
        userObj = await getUserObj(message.author.id);
      }
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
          `u bought ${amount} ${buildings[building].name}(s) for ${parseFloat(price.toFixed(2))} bana!!`
        );
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
      } else {
        await message.reply(
          // @ts-ignore
          `u cant aford ${amount} ${buildings[building].name}(s) for ${price} bana LLLL`
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
    if (!await checkChannel(message.channelId)) return;
    if (checkNumber(amount) === true) {
      // sell buildings
      let userObj = await getUserObj(message.author.id);
      building = building.toLowerCase();
      if (userObj.buildings[building].num >= amount) {
        let price = await calcSellPrice(building, amount, message.author.id);
        userObj.banaCount = userObj.banaCount + price;
        userObj.buildings[building].num =
          userObj.buildings[building].num - amount;
        await putUserObj(message.author.id, userObj);
        // @ts-ignore
        const sellEmbed = new discord.Embed();
        sellEmbed.setTitle(
          // @ts-ignore
          `sold ${amount} ${buildings[building].name}(s) for ${parseFloat(price.toFixed(2))} bana!!!`
        );
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
      } else {
        await message.reply(
          // @ts-ignore
          `u don have ${amount} ${buildings[building].name}(s) to sell LOSER!!!`
        );
      }
    } else {
      // error
      await message.reply(`Error: ${checkNumber(amount)}`);
    }
  }
);
