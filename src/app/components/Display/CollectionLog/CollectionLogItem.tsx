import type {Item} from "../../../../stores/itemStore.ts";
import Box from "@mui/material/Box";
import ItemImage from "../Shared/ItemImage.tsx";

export default function CollectionLogItem({item}: {item: Item}) {
    return (
        <Box className="collection_log_item_box" sx={({
            position: "relative",
            display: "inline-block",
            width: "32px",
            height: "32px"
        })}>
            <ItemImage name={item.name} imageUrl={item.imageUrl} isGreyedOut={item.quantity === 0}/>

            {item.quantity >= 1 && (
                <span className="collection_log_item_box_quantity">{item.quantity}</span>
            )}
        </Box>
    );
}