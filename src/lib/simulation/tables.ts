import {Tables} from "../enum/tables.ts";
import {getUniqueChance} from "../util/util.ts";

export function rollTables(contribution: number, teamsize: number): Tables[]
{
    const tablesToRoll: Tables[] = [];

    if (rollUniqueTable(contribution)){
        tablesToRoll.push(Tables.UNIQUE);
    } else {
        tablesToRoll.push(Tables.COMMON);
    }

    if (rollPetTable(teamsize)){
        tablesToRoll.push(Tables.PET);
    }

    return tablesToRoll
}

function rollUniqueTable(contribution: number): boolean{
    const contributionPercent = contribution * 100;
    const chance = 1 / getUniqueChance(contributionPercent);
    return Math.random() < chance;
}

function rollPetTable(teamsize: number): boolean {
    const chance = 1 / (500 * teamsize);
    return Math.random() < chance;
}


