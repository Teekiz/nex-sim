import {rollTableItems} from "./items.ts";

import {rollTables} from "./tables.ts";
import {useStatisticsStore} from "../../stores/statisticsStore.ts";
import {Conditions} from "../enum/conditions.ts";
import React from "react";
import {checkCondition} from "./conditions.ts";

//A function which simulates the drops. It first rolls to check which tables should be rolled and then will roll until the given condition has been met.
export function simulateDrops({hasSimulationAutoRollStartedRef}: {hasSimulationAutoRollStartedRef: React.RefObject<boolean>}, condition: Conditions, teamsize: number, contributionRange: number[], targetRolls?: number, targetIds?: number[])
{
    const {incrementTotalRolls, incrementMvpCount} = useStatisticsStore.getState();

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

            //adds a 10% bonus if the player is the mvp.
            const isMvp = isPlayerMvp(contribution, teamsize);
            const mvpBonus = isMvp ? 1.1 : 1.0;
            const contributionWithBonus = contribution * mvpBonus;

            const tablesToRoll = rollTables(contributionWithBonus, teamsize);
            tablesToRoll.map(table => rollTableItems(table, contributionWithBonus));

            incrementTotalRolls();
            if (isMvp) incrementMvpCount();
            setTimeout(performRoll, 50);
        }

        performRoll();
}

//a function that rolls between the given contribution range and determines the contribution for the roll.
function rollContributionFromRange(contributionRange: number[]): number {
    const contribution = Math.random() * (contributionRange[1] - contributionRange[0]) + contributionRange[0];
    return contribution / 100;
}

function isPlayerMvp(contribution: number, teamSize: number): boolean {
    //player must at least do their fair share of the contribution before becoming mvp.
    if (contribution <= 1 / teamSize){
        return false;
    }
    //if the player is in a duo and has the highest share, then they're automatically the mvp.
    if (teamSize == 2 && contribution > 0.5) {
        return true;
    }

    //Dirichlet distribution - chance of other players getting mvp.
    const otherPlayersMVPChance = Math.pow(1 - contribution, teamSize - 1);

    //if the random number is larger than the other players chance, the player is the MVP.
    return Math.random() > otherPlayersMVPChance;
}
