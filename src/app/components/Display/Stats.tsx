import {Container} from "@mui/material";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {getShardCount, getUniqueCount} from "../../../lib/util/util.ts";

export default function ItemStats() {

    const timesRolled = useStatisticsStore().totalRolls;
    const totalUniques = getUniqueCount();
    const totalShards = getShardCount();

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((totalShards ?? 1) / totalUniques)
            : totalShards;

    const dropRate = totalUniques / timesRolled; // decimal fraction
    const dropRateInverse = dropRate > 0 ? Math.round(1 / dropRate) : Infinity;

    const currentDryStreak = useStatisticsStore().currentDryStreak;
    const longestDryStreak = useStatisticsStore().longestDryStreak;

    return (
        <Container maxWidth="sm">
            Total uniques: {totalUniques}
            <br/>
            Average shards per drop: {shardsPerDrop}
            <br/>
            Actual drop rate: 1 in {dropRateInverse}
            <br/>
            <br/>
            Current dry streak: {currentDryStreak}
            <br/>
            Longest dry streak: {longestDryStreak}
            <br/>
        </Container>
    );
}