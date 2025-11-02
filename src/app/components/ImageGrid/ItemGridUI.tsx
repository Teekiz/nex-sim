
import type {ItemRow} from "../../../lib/types/itemRow.tsx";
import {Container, Grid} from "@mui/material";
import ItemContainer from "./ItemContainer.tsx";

export default function ItemGridUI({items, timesRolled}: {items: ItemRow[], timesRolled: number}) {
    return (
        <Container maxWidth="sm" className={"collection_container"}>
            Nex kills: {timesRolled}
            <Grid container spacing={0} columns={6}>
                {items.map((item) => (
                    <Grid>
                        <ItemContainer item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}