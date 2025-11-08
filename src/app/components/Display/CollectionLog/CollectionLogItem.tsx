import type {Item} from "../../../../stores/itemStore.ts";
import Box from "@mui/material/Box";

export default function CollectionLogItem({item}: {item: Item}) {
    return (
        <Box className="collection_log_item_box" sx={({
            position: "relative",
            height: "32px",
            width: "32px",
            display: "inline-block"
        })}>
            <img
                src={item.imageUrl}
                alt={item.name + " image"}
                style={{display: "block"}}
                className={item.quantity === 0 ? "image_greyed_out" : ""}
            />

            {item.quantity >= 1 && (
                <span className="collection_log_item_box_quantity">{item.quantity}</span>
            )}
        </Box>
    );
}