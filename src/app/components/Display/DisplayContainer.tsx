import CollectionLog from "./CollectionLog/CollectionLog.tsx";
import ItemStats from "./Stats.tsx";
import {Stack} from "@mui/material";
import ItemLog from "./ItemsList/ItemLog.tsx";
import Box from "@mui/material/Box";

export default function DisplayContainer(){

    return (
        <Stack direction="column" alignItems={"center"}>
            <Box className={"display_box"}>
                <CollectionLog/>
                <ItemLog/>
            </Box>
            <ItemStats/>
        </Stack>
    );
}