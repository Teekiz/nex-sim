import {Tables} from "../enum/tables.ts";

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
    const rolls = Math.ceil(43 * (100 / contributionPercent));
    const chance = 1 / rolls;

    return Math.random() < chance;
}

function rollPetTable(teamsize: number): boolean {
    const chance = 1 / (500 * teamsize);
    return Math.random() < chance;
}


