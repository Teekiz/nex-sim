import {rollTableItems} from "./items.ts";
import type {ItemRoll} from "./types/ItemRoll.tsx";

import {rollTables} from "./tables.ts";

export function simulateDrops(rolls: number, teamsize: number, contribution: number): ItemRoll[]{
    let itemRolls: ItemRoll[] = [];

    while (rolls > 0) {
        const tablesToRoll = rollTables(contribution, teamsize);

        const newItems = tablesToRoll
            .map(table => rollTableItems(table))
            .filter((item): item is ItemRoll => item !== null);

        for (const item of newItems) {
            itemRolls = updateQuantity(itemRolls, item, contribution);
        }

        rolls--;
    }
    return itemRolls;
}

function updateQuantity(existingRolls: ItemRoll[], newItem: ItemRoll, contribution: number): ItemRoll[] {
    const existingIndex = existingRolls.findIndex(item => item.itemID === newItem.itemID);
    const adjustedQuantity =
        newItem.quantity === 1
            ? newItem.quantity
            : Math.max(1, Math.floor(newItem.quantity * contribution));

    if (existingIndex !== -1) {
        const updated = [...existingRolls];
        updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + adjustedQuantity,
        };
        return updated;
    } else {
        return [...existingRolls, { ...newItem, quantity: adjustedQuantity }];
    }
}