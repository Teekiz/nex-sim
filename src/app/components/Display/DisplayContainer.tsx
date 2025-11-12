import CollectionLog from "./CollectionLog/CollectionLog.tsx";
import ItemStats from "./Stats.tsx";
import {Stack} from "@mui/material";
import MostRecentItemBox from "./ItemsList/MostRecentItemBox.tsx";
import Box from "@mui/material/Box";

export default function DisplayContainer(){

    return (
        <Stack direction="column" alignItems={"center"}>
            <Box className={"display_box"}>
                <CollectionLog/>
                <MostRecentItemBox/>
            </Box>
            <ItemStats/>
        </Stack>
    );
}