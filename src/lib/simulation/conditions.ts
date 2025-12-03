import {getShardCount, getUniqueCount} from "../util/util.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";
import {useItemsStore} from "../../stores/itemStore.ts";
import {Tables} from "../enum/tables.ts";
import {Conditions} from "../enum/conditions.ts";

//A function to check if the target rolls has been met.
export function checkCondition(condition: Conditions,  targetRolls?: number, targetIds?: number[]) {
    switch (condition) {
        case Conditions.UNTIL_ROLL_COUNT:
            return conditionalOnRollTarget(targetRolls!);
        case Conditions.UNTIL_SHARD_COUNT:
             return conditionalOnShardCount(targetRolls!);
        case Conditions.UNTIL_UNIQUE_COUNT:
             return conditionalOnUniqueCount(targetRolls!);
        case Conditions.UNTIL_PET_DROP:
            return conditionalOnPetReceived();
        case Conditions.UNTIL_SELECTED_ITEMS:
            return conditionalOnItemsSelected(targetIds!);
        case Conditions.UNTIL_ALL_ITEMS:
            return conditionalOnAllItems();
        default:
            return true;
    }
}

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
