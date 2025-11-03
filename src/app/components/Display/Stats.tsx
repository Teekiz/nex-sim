import type {ItemRow} from "../../../lib/types/itemRow.tsx";
import {Container} from "@mui/material";

export default function ItemStats({items, timesRolled}: {items: ItemRow[], timesRolled: number}) {

    const shards = items.find(item => item.id === 7);

    const totalUniques = items
        .filter(item => item.id >= 1 && item.id <= 6)
        .reduce((total, item) => total + item.quantity, 0);

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((shards?.quantity ?? 1) / totalUniques)
            : shards?.quantity ?? 0;

    const dropRate = totalUniques / timesRolled; // decimal fraction
    const dropRateInverse = dropRate > 0 ? Math.round(1 / dropRate) : Infinity;

    return (
        <Container maxWidth="sm">
            Total uniques: {totalUniques}
            <br />
            Average shards per drop: {shardsPerDrop}
            <br />
            Actual drop rate: 1 in {dropRateInverse}
        </Container>
    );
}