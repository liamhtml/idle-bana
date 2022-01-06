// exports

// imports
import { calcBps } from './bps';
import { checkForNewPlayer } from './user';

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
        await message.reply('it work');
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
        aliases: ['p', 'prof']
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
        aliases: ['a', 'ach']
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
        building: args.string({ choices: ['a'] })
    }),
    async (message, { amount, building }) => {
        await message.reply(`Bought ${amount} ${building}(s).`);
    }
);
