import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import { Box, Typography } from "@mui/material";

export default function ItemsReceivedList() {
    const itemsLog = useStatisticsStore().itemLog.slice(-200);
    return (
    <Box sx={{ height: 300, overflowY: 'auto', border: '1px solid grey', p: 1 }}>
        {itemsLog.map((item, index) => (
            <Typography key={item.id || index}>
                {item.name} received at kill count {item.rollCount}.
            </Typography>
        ))}
    </Box>
    );
}