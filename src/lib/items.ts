import {getLcm} from "./util/mathsutility.ts";
import {Tables} from "./enum/tables.tsx";
import type {Item} from "./types/item.tsx";
import type {ItemRoll} from "./types/itemRoll.tsx";

export function getItems(): readonly Item[] {
    return [
        {itemID: 1, name: "Zaryte vambraces", numerator: 3, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 2, name: "Nihil horn", numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 3, name: "Torva full helm (damaged)", numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 4, name: "Torva platebody (damaged)", numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 5, name: "Torva platelegs (damaged)", numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 6, name: "Ancient hilt", numerator: 1, denominator: 12, quantityMin: 1, quantityMax: 1, table: Tables.UNIQUE},
        {itemID: 7, name: "Nihil shard", numerator: 5, denominator: 82,  quantityMin: 80, quantityMax: 85, table: Tables.COMMON},
        {itemID: 7, name: "Nihil shard", numerator: 8, denominator: 209,  quantityMin: 85, quantityMax: 95, table: Tables.COMMON},
        {itemID: 8, name: "Nexling", numerator: 1, denominator: 1, quantityMin: 1, quantityMax: 1, table: Tables.PET}
    ];
}

export function rollTableItems(targetTable: Tables, currentTotal: number): ItemRoll | null{
     const possibleItems = getItems().filter((item) => item.table === targetTable);
     const commonDenominator = getLcm(possibleItems.map(item => item.denominator));

     //creates a copy of the items but with the new value based on the common denominator
     const adjustedItems = possibleItems.map(item => {
        const scaleFactor = commonDenominator / item.denominator;
        return {
            ...item,
            numerator: item.numerator * scaleFactor,
            denominator: commonDenominator,
        };
    });

     const totalWeight = adjustedItems.reduce((total, item) => total + item.numerator, 0);
     //a roll between 0 and common denominator
     const roll = Math.floor(Math.random() * commonDenominator) + 1;

    //if a roll is outside the valued items, roll nothing (other item)
    if (roll > totalWeight) {
        return null;
    }

    let cumulative = 0;
    for (const item of adjustedItems) {
        cumulative += item.numerator;
        if (roll <= cumulative)
        {
            return {
                id: item.itemID,
                name: item.name,
                //rolls between the maximum and minimum values (whole team drop)
                quantity: Math.floor(Math.random() * (item.quantityMax - item.quantityMin + 1) + item.quantityMin),
                droppedAt: currentTotal
            }
        }
    }

     return null;
}