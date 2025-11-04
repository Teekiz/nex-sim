import {rollTableItems} from "./items.ts";

import {rollTables} from "./tables.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";

export function simulateDrops(rolls: number, teamsize: number, contribution: number)
{
    const {incrementTotalRolls} = useStatisticsStore.getState();

    while (rolls > 0) {
        const tablesToRoll = rollTables(contribution, teamsize);

        tablesToRoll.map(table => rollTableItems(table, contribution));
        incrementTotalRolls();
        rolls--;
    }
}