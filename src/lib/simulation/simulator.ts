import {rollTableItems} from "./items.ts";

import {rollTables} from "./tables.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";
import {Conditions} from "../enum/conditions.ts";
import React from "react";
import {checkCondition} from "./conditions.ts";

//A function which simulates the drops. It first rolls to check which tables should be rolled and then will roll until the given condition has been met.
export function simulateDrops({hasSimulationAutoRollStartedRef}: {hasSimulationAutoRollStartedRef: React.RefObject<boolean>}, condition: Conditions, teamsize: number, contributionRange: number[], targetRolls?: number, targetIds?: number[])
{
    const {incrementTotalRolls} = useStatisticsStore.getState();

    //checks to ensure that the target information is provided before rolling the tables.
    if ((condition === Conditions.UNTIL_ROLL_COUNT || condition === Conditions.UNTIL_SHARD_COUNT || condition === Conditions.UNTIL_UNIQUE_COUNT) && targetRolls === undefined) {
        return;
    }

    if (condition === Conditions.UNTIL_SELECTED_ITEMS && (targetIds === undefined || targetIds?.length === 0)) {
        return;
    }

    let conditionMet = false;
        function performRoll() {
            conditionMet = checkCondition(condition, targetRolls, targetIds)
            if (conditionMet || !hasSimulationAutoRollStartedRef.current) return;

            const contribution = rollContributionFromRange(contributionRange);
            const tablesToRoll = rollTables(contribution, teamsize);
            tablesToRoll.map(table => rollTableItems(table, contribution));

            incrementTotalRolls();
            setTimeout(performRoll, 50);

        }

        performRoll();
}

//a function that rolls between the given contribution range and determines the contribution for the roll.
function rollContributionFromRange(contributionRange: number[]): number {
    const contribution = Math.random() * (contributionRange[1] - contributionRange[0]) + contributionRange[0];
    return contribution / 100;
}
