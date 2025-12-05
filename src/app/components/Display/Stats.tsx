import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {getShardCount, getUniqueCount} from "../../../lib/util/util.ts";
import {Grid, Stack, Typography} from "@mui/material";

export default function ItemStats() {

    const timesRolled = useStatisticsStore().totalRolls;
    const mvpCount = useStatisticsStore().mvpCount;
    const totalUniques = getUniqueCount();
    const totalShards = getShardCount();

    const shardsPerDrop =
        totalUniques > 1
            ? Math.floor((totalShards ?? 1) / totalUniques)
            : totalShards;

    const dropRate = totalUniques / timesRolled; // decimal fraction
    const dropRateInverse = dropRate > 0 ? Math.round(1 / dropRate) : Infinity;
    const mvpChance = Math.round((mvpCount / timesRolled) * 100);
    const currentDryStreak = useStatisticsStore().currentDryStreak;
    const longestDryStreak = useStatisticsStore().longestDryStreak;

    return (
        <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"}>
            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0} justifyContent={"center"}>
                    <Typography variant="body2" fontWeight="bold">Total uniques:</Typography>
                    <Typography variant="body1">{totalUniques}</Typography>
                </Stack>
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0}>
                    <Typography variant="body2" fontWeight="bold">Shards per drop:</Typography>
                    <Typography variant="body1">{shardsPerDrop}</Typography>
                </Stack>
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0}>
                    <Typography variant="body2" fontWeight="bold">Actual drop rate:</Typography>
                    <Typography variant="body1">1 in {dropRateInverse}</Typography>
                </Stack>
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0}>
                    <Typography variant="body2" fontWeight="bold">MVP percentage:</Typography>
                    <Typography variant="body1">{isNaN(mvpChance) ? 100 : mvpChance}%</Typography>
                </Stack>
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0}>
                    <Typography variant="body2" fontWeight="bold">Current dry streak:</Typography>
                    <Typography variant="body1">{currentDryStreak}</Typography>
                </Stack>
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 4}}>
                <Stack direction={"column"} alignItems={"center"} spacing={0}>
                    <Typography variant="body2" fontWeight="bold">Longest dry streak:</Typography>
                    <Typography variant="body1">{longestDryStreak}</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}