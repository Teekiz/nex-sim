import CollectionLog from "./CollectionLog/CollectionLog.tsx";
import ItemStats from "./Stats.tsx";
import ItemsLogModal from "./ItemsList/ItemsLogModal.tsx";
import React from "react";
import {Stack} from "@mui/material";
import MostRecentItemBox from "./ItemsList/MostRecentItemBox.tsx";
import Box from "@mui/material/Box";

export default function DisplayContainer(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack direction="column" alignItems={"center"}>
            <Box>
                <CollectionLog/>
                <MostRecentItemBox handleOpen={handleOpen}/>
            </Box>

            <ItemsLogModal open={open} handleClose={handleClose}/>
            <ItemStats/>
        </Stack>
    );
}