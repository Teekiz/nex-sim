import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Button} from "@mui/material";
import {simulateDrops} from "../../../lib/simulation/simulator.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {useItemsStore} from "../../../stores/itemStore.ts";

export default function InputBox() {

    const [contribution, setContribution] = useState(0.33);
    const [teamsize, setteamsize] = useState(3);
    const [rolls, setRolls] = useState(10);

    const resetItemsQuantity = useItemsStore().resetQuantity;
    const resetStatistics = useStatisticsStore().resetStatistics;

    const handleRollClick = () => {
        simulateDrops(rolls, teamsize, contribution);
    }

    const handleResetClick = () => {
        resetItemsQuantity();
        resetStatistics();
    }

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" label="Contiribution" variant="outlined" value={contribution} onChange={(e) => setContribution(parseFloat(e.target.value))} type={"number"}/>
                <TextField id="outlined-basic" label="Team size" variant="outlined" value={teamsize} onChange={(e) => setteamsize(Number(e.target.value))} type={"number"}/>
                <TextField id="outlined-basic" label="Number of rolls" variant="outlined" value={rolls} onChange={(e) => setRolls(Number(e.target.value))} type={"number"}/>

                <Button variant="text" onClick={handleRollClick}>Generate Rolls</Button>
                <Button variant="text" onClick={handleResetClick}>Reset</Button>
        </Box>
    );
}