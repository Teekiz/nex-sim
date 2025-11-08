
import {Divider, Grid} from "@mui/material";
import CollectionLogItem from "./CollectionLogItem.tsx";
import {useItemsStore} from "../../../../stores/itemStore.ts";
import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";
import {getCollectionLogCount} from "../../../../lib/util/util.ts";
import Box from "@mui/material/Box";

export default function CollectionLog() {
    const items = useItemsStore(state => state.items);
    const timesRolled = useStatisticsStore().totalRolls;

    function getObtainedColour(): string
    {
        if (getCollectionLogCount() === 0) return "text_red";
        else if (getCollectionLogCount() == items.length) return "text_green";
        else return "text_yellow";
    }

    return (
        <Box maxWidth="sm" className={"collection_log_box"}>
            <Box className={"collection_log_inner_box"}>
                <b>Nex</b>
                <p>Obtained: <span className={getObtainedColour()}>{getCollectionLogCount()}/{items.length}</span></p>
                <p>Nex kills: <span className={"text_white"}>{timesRolled}</span></p>
            </Box>

            <Divider className={"collection_log_divider"} />

            <Box className={"collection_log_inner_box"}>
                <Grid container spacing={1} columns={6}>
                    {items.map((item) => (
                        <Grid key={item.id} size={1}>
                            <CollectionLogItem item={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}