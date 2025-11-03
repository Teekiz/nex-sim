import type {ItemRow} from "../../../lib/types/itemRow.tsx";
import {Container} from "@mui/material";

export default function ItemContainer({item}: {item: ItemRow}) {
    return (
        <Container>
            {item.quantity}
            <img src={item.image_url} alt={item.name + " image"}></img>
        </Container>
    );
}