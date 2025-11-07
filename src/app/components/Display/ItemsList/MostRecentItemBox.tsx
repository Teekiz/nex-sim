import Box from "@mui/material/Box";
import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";
import {Typography} from "@mui/material";

interface MostRecentItemBoxProps {
    handleOpen: () => void;
}


export default function MostRecentItemBox({ handleOpen }: MostRecentItemBoxProps) {
    const items = useStatisticsStore().itemLog;

    let mostRecentItem;
    items.length > 0 ? mostRecentItem = items[items.length - 1] : null;

    return (
        <Box onClick={handleOpen}>
            {mostRecentItem !== undefined ? (
                <Typography key={mostRecentItem.id}>
                    {mostRecentItem.name} received at kill count {mostRecentItem.rollCount}.
                </Typography>
            ) : (
                <Typography>
                    No items rolled.
                </Typography>
            )}

        </Box>
    );
}