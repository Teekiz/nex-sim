import Box from "@mui/material/Box";
import ItemImage from "../Shared/ItemImage.tsx";
import type {ItemLog} from "../../../../stores/statisticsStore.ts";
import {getImageUrl} from "../../../../lib/util/util.ts";

export default function ItemLogItem({item}: {item: ItemLog}) {
    return (
        <Box className="item_log_item_box" sx={({
            position: "relative",
            display: "inline-block",
            width: "32px",
            height: "32px"
        })}>
            <ItemImage name={item.name} imageUrl={getImageUrl(item.id)} isGreyedOut={false}/>
            <span className="item_log_item_box_kc">{item.rollCount}</span>
        </Box>
    );
}