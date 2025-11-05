import {Container} from "@mui/material";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";

export default function ItemStats() {
    const items = useItemsStore(state => state.items);
    const timesRolled = useStatisticsStore().totalRolls;

    const shards = items.find(item => item.id === 8);

    const totalUniques = items
        .filter(item => item.id >= 2 && item.id <= 7)
        .reduce((total, item) => total + item.quantity, 0);

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((shards?.quantity ?? 1) / totalUniques)
            : shards?.quantity ?? 0;

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