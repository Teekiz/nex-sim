
import {Container, Grid} from "@mui/material";
import ItemContainer from "./ItemContainer.tsx";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";

export default function ItemGridUI() {
    const items = useItemsStore(state => state.items);
    const timesRolled = useStatisticsStore().totalRolls;

    return (
        <Container maxWidth="sm" className={"collection_container"}>
            Nex kills: {timesRolled}
            <Grid container spacing={0} columns={6}>
                {items.map((item) => (
                    <Grid key={item.id}>
                        <ItemContainer item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}