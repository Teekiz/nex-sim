
import {Divider, Grid} from "@mui/material";
import CollectionLogItem from "./CollectionLogItem.tsx";
import {useItemsStore} from "../../../../stores/itemStore.ts";
import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";
import {getCollectionLogCount} from "../../../../lib/util/util.ts";
import {animated, useSpring} from "@react-spring/web";
import Box from "@mui/material/Box";

interface ModalOpenProps {
    handleOpen: () => void;
}

export default function CollectionLog({ handleOpen }: ModalOpenProps) {
    const items = useItemsStore(state => state.items);
    const timesRolled = useStatisticsStore().totalRolls;

    const [springProps, set] = useSpring(() => ({ transform: 'scale(1)' }));

    function getObtainedColour(): string
    {
        if (getCollectionLogCount() === 0) return "text_red";
        else if (getCollectionLogCount() == items.length) return "text_green";
        else return "text_yellow";
    }

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() => set.start({transform: 'scale(1.1)'})}
            onMouseLeave={() => set.start({transform: 'scale(1)'})}
            onClick={handleOpen}
        >
            <Box maxWidth="sm" className={"collection_log_box"}>
                <Box className={"collection_log_inner_box"}>
                    <b>Nex</b>
                    <p>Obtained: <span className={getObtainedColour()}>{getCollectionLogCount()}/{items.length}</span>
                    </p>
                    <p>Nex kills: <span className={"text_white"}>{timesRolled}</span></p>
                </Box>

                <Divider className={"collection_log_divider"}/>

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
        </animated.div>
    );
}