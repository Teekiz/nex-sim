import type {ItemRow} from "../../lib/types/itemRow.tsx";
import {Container} from "@mui/material";

export default function ItemStats({items}: {items: ItemRow[]}) {

    const shards = items.find(item => item.id === 7);

    const totalUniques = items
        .filter(item => item.id >= 1 && item.id <= 6)
        .reduce((total, item) => total + item.quantity, 0);

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((shards?.quantity ?? 1) / totalUniques)
            : shards?.quantity ?? 0;

    return (
        <Container maxWidth="sm">
            Total uniques: {totalUniques}
            <br />
            Average shards per drop: {shardsPerDrop}
        </Container>
    );
}