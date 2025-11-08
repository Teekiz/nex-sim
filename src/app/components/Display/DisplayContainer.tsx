import CollectionLog from "./CollectionLog/CollectionLog.tsx";
import ItemStats from "./Stats.tsx";
import ItemsLogModal from "./ItemsList/ItemsLogModal.tsx";
import React from "react";
import {Stack} from "@mui/material";

export default function DisplayContainer(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack direction="column">
            <CollectionLog handleOpen={handleOpen}/>
            <ItemStats/>
            <ItemsLogModal open={open} handleClose={handleClose} />
        </Stack>
    );
}