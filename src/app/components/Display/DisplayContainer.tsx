import CollectionLog from "./CollectionLog/CollectionLog.tsx";
import ItemStats from "./Stats.tsx";
import {Grid} from "@mui/material";
import ItemLog from "./ItemsList/ItemLog.tsx";

export default function DisplayContainer(){

    return (
            <Grid container direction={"column"} alignItems={"center"} justifyContent="center" spacing={1} sx={{marginTop: 2}}>
                <Grid size={{xs: 12, sm: 10, md: 7, lg: 5}}>
                    <CollectionLog/>
                </Grid>

                <Grid size={{xs: 12, sm: 10, md: 7, lg: 5}}>
                    <ItemLog/>
                </Grid>

                <Grid size={{xs: 12, sm: 10, md: 7, lg: 5}}>
                    <ItemStats/>
                </Grid>
            </Grid>
    );
}