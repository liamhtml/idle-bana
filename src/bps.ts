import { banaKv } from './consts';
import { buildings } from './consts';
import { upgradeRate } from './consts';

export async function calcBps(id: string) {
    let bps = 0;
    // @ts-ignore
    let userObj = await banaKv.get<jsonObj>(id);
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
