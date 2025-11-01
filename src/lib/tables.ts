import {Tables} from "./enum/tables.tsx";

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
    const chance = (1/43) * contribution;
    return Math.random() < chance;
}

function rollPetTable(teamsize: number): boolean {
    const chance = (1/43) * teamsize;
    return Math.random() < chance;
}


