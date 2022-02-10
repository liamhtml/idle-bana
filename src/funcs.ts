/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />
// This states that you are writing code using Pylon types, do not remove it if you want to your code to work!
// imports
import { User, banaKv, upgradeRate, buildings } from './consts';
import { channelId } from './config';

// compression function
export function compress(obj: object) {
  let json = JSON.stringify(obj);
  return btoa(json);
}
// decompression function
export function deCompress(base64: string) {
  let json = atob(base64);
  return JSON.parse(json);
}

// gets user object
export async function getUserObj(id: string) {
  // @ts-ignore
  return deCompress(await banaKv.get<jsonObject>(id));
}

// puts user object to db
export async function putUserObj(id: string, obj: object) {
  await banaKv.put(id, compress(obj));
}

// Checks if the player has played bana before, and if not,
export async function checkForNewPlayer(id: string) {
  // @ts-ignore
  if (!(await banaKv.get<jsonObject>(id))) {
    let userObj = new User(id);
    await putUserObj(id, userObj);
  }
}

export async function calcBps(id: string) {
  await checkForNewPlayer(id);
  let bps = 0;
  let userObj = await getUserObj(id);
  let userBuildings = Object.keys(userObj.buildings);
  for (let i = 0; i < userBuildings.length; i++) {
    let building = userObj.buildings[userBuildings[i]];
    let baseBuildingBps = buildings[userBuildings[i]].baseBpS;
    let numOfBuilding = building.num;
    let totalBuildingBps =
      numOfBuilding * (baseBuildingBps + upgradeRate * building.lvl);
    bps = bps + totalBuildingBps;
  }
  return bps;
}

// number sanitization for buy/sell commands
export function checkNumber(number: number) {
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
export async function calcBuyPrice(
  building: string,
  amount: number,
  id: string
) {
  let basePrice = buildings[building].basePrice;
  let userObj = await getUserObj(id);
  let numOfBuilding = userObj.buildings[building].num;

  for (let i = 0; i < numOfBuilding; i++) {
    basePrice = basePrice * 1.15;
  };
  if (amount == 1) {
    return basePrice;
  } else {
    let price = basePrice;
    let newBasePrice = basePrice;
    for (let i = 1; i < amount; i++) {
      newBasePrice = newBasePrice * 1.15;
      price = price + newBasePrice;
    }
    return price;
  }
}

// calc current building sell price
export async function calcSellPrice(
  building: string,
  amount: number,
  id: string
) {
  let basePrice = buildings[building].basePrice;
  let userObj = await getUserObj(id);
  let numOfBuilding = userObj.buildings[building].num;

  for (let i = 1; i < numOfBuilding; i++) {
    basePrice = basePrice * 1.15;
  };
  if (amount == 1) {
    return basePrice;
  } else {
    let price = basePrice;
    let newBasePrice = basePrice;
    for (let i = 1; i < amount; i++) {
      newBasePrice = newBasePrice / 1.15;
      price = price + newBasePrice;
    }
    return price;
  }
}

export async function checkChannel(currChannel: string) {
  if (await discord.getChannel(channelId)) {
    if (currChannel == channelId) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
