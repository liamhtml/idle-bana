// exports

// imports
import { calcBps } from './bps';
import { checkForNewPlayer } from './user';
import { buildings } from './consts';

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
        helpEmbed.setColor(0xefcc1a);
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
        await message.reply(`Current BpS: ${await calcBps(message.author.id)}`);
    }
);

// achievements command
banaCommands.raw(
    {
        name: 'achievements',
        aliases: ['a']
    },
    async (message) => {
        await message.reply('it work');
    }
);

// buy building command
banaCommands.on(
    {
        name: 'buy',
        aliases: ['b']
    },
    (args) => ({
        amount: args.integer(),
        building: args.string({ choices: Object.keys(buildings) })
    }),
    async (message, { amount, building }) => {
        await message.reply(`Bought ${amount} ${building}(s).`);
    }
);
