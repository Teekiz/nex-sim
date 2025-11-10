import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {getShardCount, getUniqueCount} from "../../../lib/util/util.ts";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

export default function ItemStats() {

    const timesRolled = useStatisticsStore().totalRolls;
    const totalUniques = getUniqueCount();
    const totalShards = getShardCount();

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((totalShards ?? 1) / totalUniques)
            : totalShards;

    const dropRate = totalUniques / timesRolled; // decimal fraction
    const dropRateInverse = dropRate > 0 ? Math.round(1 / dropRate) : Infinity;

    const currentDryStreak = useStatisticsStore().currentDryStreak;
    const longestDryStreak = useStatisticsStore().longestDryStreak;

    return (
        <Box display={"flex"} flexDirection="column" alignItems="center" gap={1.5}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Box className={"collection_log_box"}>
                    <Box className={"collection_log_inner_box"} sx={{width: "100px"}}>
                        <p>Total uniques: <span className={"text_white"}>{totalUniques}</span></p>
                    </Box>
                </Box>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Box className={"collection_log_box"}>
                    <Box className={"collection_log_inner_box"} sx={{width: "150px"}}>
                        <p>Current dry streak: <span className={"text_white"}>{currentDryStreak}</span></p>
                    </Box>
                </Box>
                <Box className={"collection_log_box"}>
                <Box className={"collection_log_inner_box"} sx={{width: "150px"}}>
                        <p>Longest dry streak: <span className={"text_white"}>{longestDryStreak}</span></p>
                    </Box>
                </Box>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Box className={"collection_log_box"}>
                    <Box className={"collection_log_inner_box"} sx={{width: "185px"}}>
                        <p>Average shards per drop: <span className={"text_white"}>{shardsPerDrop}</span></p>
                    </Box>
                </Box>
                <Box className={"collection_log_box"}>
                    <Box className={"collection_log_inner_box"} sx={{width: "185px"}}>
                        <p>Actual drop rate: <span className={"text_white"}>1 in {dropRateInverse}</span></p>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}