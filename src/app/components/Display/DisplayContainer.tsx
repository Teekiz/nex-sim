import ItemGridUI from "./ItemGridUI.tsx";
import ItemStats from "./Stats.tsx";
import ItemsReceivedModal from "./ItemsList/ItemsReceivedModal.tsx";
import MostRecentItemBox from "./ItemsList/MostRecentItemBox.tsx";
import React from "react";

export default function DisplayContainer(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ItemGridUI/>
            <ItemStats/>
            <MostRecentItemBox handleOpen={handleOpen} />
            <ItemsReceivedModal open={open} handleClose={handleClose} />
        </>
    );
}