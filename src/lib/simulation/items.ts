import {getLcm} from "../util/mathsutility.ts";
import {Tables} from "../enum/tables.ts";
import {useItemsStore} from "../../stores/itemStore.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";

const { updateQuantity } = useItemsStore.getState();
const { resetDryStreak, incrementDryStreak, addItemToItemLog } = useStatisticsStore.getState();

//rolls a given table and updates the quantity.
export function rollTableItems(targetTable: Tables, contribution: number): void{
    const possibleItems = useItemsStore.getState().items.filter((item) => item.table === targetTable);
    const allDenominators = possibleItems.flatMap(item => item.dropRates.map(rate => rate.denominator));

    const commonDenominator = getLcm(allDenominators);

     //creates a copy of the items but with the new value based on the common denominator
    const adjustedItems = possibleItems.map(item => ({
        ...item,
        dropRates: item.dropRates.map(rate => {
            const scaleFactor = commonDenominator / rate.denominator;
            return {
                ...rate,
                numerator: rate.numerator * scaleFactor,
                denominator: commonDenominator,
            };
        }),
    }));

    const totalWeight = adjustedItems.reduce((total, item) => total + item.dropRates.reduce((sum, rate) => sum + rate.numerator, 0), 0);
    //a roll between 0 and common denominator
    const roll = Math.floor(Math.random() * commonDenominator) + 1;

    if (roll > totalWeight) {
        incrementDryStreak();
        return;
    }

    let cumulative = 0;
    for (const item of adjustedItems) {
        for (const rate of item.dropRates) {
            cumulative += rate.numerator;
            if (roll <= cumulative) {
                //rolls between the maximum and minimum values (whole team drop) -
                const quantity = Math.floor(Math.random() * (rate.quantityMax - rate.quantityMin + 1) + rate.quantityMin);
                //rolls between 1 or the scales based on quantity
                const adjustedQuantity = Math.max(1, Math.floor(quantity * contribution));

                updateQuantity(item.id, adjustedQuantity);

                if (item.table === Tables.UNIQUE){
                    resetDryStreak();
                    addItemToItemLog(item.id);
                } else {
                    incrementDryStreak();
                }

                return;
            }
        }
    }

    incrementDryStreak();
}
