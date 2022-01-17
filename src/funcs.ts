// imports
import { User, banaKv, upgradeRate, buildings } from './consts';

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
    // @ts-ignore
    let userObj = await getUserObj(id);
    let userBuildings = Object.keys(userObj.buildings);
    for (let i = 0; i < userBuildings.length; i++) {
        let building = userObj.buildings[userBuildings[i]];
        // @ts-ignore
        let baseBuildingBps = buildings[userBuildings[i]].baseBpS;
        let numOfBuilding = building.num;
        let totalBuildingBps =
            numOfBuilding * (baseBuildingBps + upgradeRate * building.lvl);
        bps = bps + totalBuildingBps;
    }
    return bps;
}
