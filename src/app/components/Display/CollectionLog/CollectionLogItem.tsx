import {Container} from "@mui/material";
import type {Item} from "../../../../stores/itemStore.ts";

export default function CollectionLogItem({item}: {item: Item}) {
    return (
        <Container>
            {item.quantity}
            <img src={item.imageUrl} alt={item.name + " image"}></img>
        </Container>
    );
}