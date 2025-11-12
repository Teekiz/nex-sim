import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import ItemLogItem from "./ItemsLogItem.tsx";


export default function MostRecentItemBox() {
    const itemLog = useStatisticsStore((state) => state.itemLog);

    return (
        <Box className="collection_log_box">
            <Box className="collection_log_inner_box">
                <p>Latest drops:</p>
            </Box>
            <Divider className="collection_log_divider" />

            <Box className="item_log_inner_box">
                <Box className="item_log_scroll_box" >
                    <Box className={"item_log_inner"}>
                    {itemLog.map((item, index) => (
                        <ItemLogItem key={index} item={item} />
                    ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}