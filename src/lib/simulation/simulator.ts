import {rollTableItems} from "./items.ts";

import {rollTables} from "./tables.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";
import {getShardCount, getUniqueCount} from "../util/util.ts";
import {useItemsStore} from "../../stores/itemStore.ts";
import {Tables} from "../enum/tables.ts";
import {Condition} from "../enum/conditions.ts";
import React from "react";

//A function which simulates the drops. It first rolls to check which tables should be rolled and then will roll until the given condition has been met.
export function simulateDrops({hasSimulationAutoRollStartedRef}: {hasSimulationAutoRollStartedRef: React.RefObject<boolean>}, condition: Condition, teamsize: number, contribution: number, targetRolls?: number, targetIds?: number[], )
{
    const {incrementTotalRolls} = useStatisticsStore.getState();

    //checks to ensure that the target information is provided before rolling the tables.
    if ((condition === Condition.UNTIL_ROLL_COUNT || condition === Condition.UNTIL_SHARD_COUNT || condition === Condition.UNTIL_UNIQUE_COUNT) && targetRolls === undefined) {
        return;
    }

    if (condition === Condition.UNTIL_SELECTED_ITEMS && (targetIds === undefined || targetIds?.length === 0)) {
        return;
    }

    let conditionMet = false;
        function performRoll() {
            switch (condition) {
                case Condition.UNTIL_ROLL_COUNT:
                    conditionMet = conditionalOnRollTarget(targetRolls!);
                    break;
                case Condition.UNTIL_SHARD_COUNT:
                    conditionMet = conditionalOnShardCount(targetRolls!);
                    break;
                case Condition.UNTIL_UNIQUE_COUNT:
                    conditionMet = conditionalOnUniqueCount(targetRolls!);
                    break;
                case Condition.UNTIL_PET_DROP:
                    conditionMet = conditionalOnPetReceived();
                    break;
                case Condition.UNTIL_SELECTED_ITEMS:
                    conditionMet = conditionalOnItemsSelected(targetIds!);
                    break
                case Condition.UNTIL_ALL_ITEMS:
                    conditionMet = conditionalOnAllItems();
                    break;
                default:
                    conditionMet = true;
            }

            if (conditionMet || !hasSimulationAutoRollStartedRef.current) return;

            const tablesToRoll = rollTables(contribution, teamsize);
            tablesToRoll.map(table => rollTableItems(table, contribution));

            incrementTotalRolls();
            setTimeout(performRoll, 50);

        }

        performRoll();
}

//A function to check if the target rolls has been met.
function conditionalOnRollTarget(targetRolls: number): boolean {
    const {totalRolls} = useStatisticsStore.getState();
    return totalRolls >= targetRolls;
}

//A function to check if the target shard count has been met.
function conditionalOnShardCount(targetRolls: number): boolean {
    return getShardCount() >= targetRolls;
}

//A function to check if the target unique count has been met.
function conditionalOnUniqueCount(targetRolls: number): boolean {
    return getUniqueCount() >= targetRolls;
}

//A function to check if a pet has been received.
function conditionalOnPetReceived(): boolean {
    const pet = useItemsStore.getState().items.find(item => item.table === Tables.PET);
    return pet === undefined ? false : pet.quantity >= 1;
}

//A function to check all items selected have been received.
function conditionalOnItemsSelected(ids: number[]): boolean {
    const items = useItemsStore.getState().items;
    for (const id of ids) {
        const item = items.find(item => item.id === id);
        if (!item || item.quantity < 1){
            return false;
        }
    }

    return true;
}

//A function to check all items have been received (excluding common drops).
function conditionalOnAllItems(): boolean {
    const items = useItemsStore.getState().items.filter(item => item.table === Tables.PET || item.table === Tables.UNIQUE);
    for (const item of items) {
        if (item.quantity < 1) return false;
    }
    return true;
}

