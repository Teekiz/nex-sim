import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useRef, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {simulateDrops} from "../../../lib/simulation/simulator.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {Condition} from "../../../lib/enum/conditions.ts";
import ItemsCheckbox from "./ItemsCheckbox.tsx";
import {checkCondition} from "../../../lib/simulation/conditions.ts";

export default function InputBox() {

    const [contribution, setContribution] = useState(0.33);
    const [teamsize, setteamsize] = useState(3);
    const [rolls, setRolls] = useState(10);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [condition, setCondition] = useState<Condition>(Condition.UNTIL_ROLL_COUNT);
    const isConditionMet = checkCondition(condition, rolls, selectedItems);

    //these are used to stop and start the roll - controlled by the user
    const [hasSimulationAutoRollStarted, setHasSimulationAutoRollStarted] = useState(false);
    const hasSimulationAutoRollStartedRef = useRef(hasSimulationAutoRollStarted);

    const resetItemsQuantity = useItemsStore().resetQuantity;
    const resetStatistics = useStatisticsStore().resetStatistics;

    const handleRollClick = () => {
        setHasSimulationAutoRolledStarted(true);
        simulateDrops({hasSimulationAutoRollStartedRef}, condition, teamsize, contribution, rolls, selectedItems);
    }

    const handleCancelSim = () => {
        setHasSimulationAutoRolledStarted(false);
    }

    const handleConditionChange = (event: SelectChangeEvent) => {
        setCondition(event.target.value as Condition);
        setHasSimulationAutoRolledStarted(false);
    };

    const handleResetClick = () => {
        resetItemsQuantity();
        resetStatistics();
        handleCancelSim();
    }

    const setHasSimulationAutoRolledStarted = (value: boolean) => {
        setHasSimulationAutoRollStarted(value);
        hasSimulationAutoRollStartedRef.current = value;
    }

    const handleItemSelection = (itemID: number, checked: boolean) => {
        setSelectedItems(prev =>
            checked ? [...prev, itemID] : prev.filter(id => id !== itemID)
        );
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

            <FormControl fullWidth>
                <InputLabel id="condition-select-label">Condition</InputLabel>
                <Select
                    labelId="condition-select-label"
                    id="condition-select"
                    value={condition}
                    label="Condition"
                    onChange={handleConditionChange}
                >
                    {Object.entries(Condition).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {condition === Condition.UNTIL_SELECTED_ITEMS ? (
                <ItemsCheckbox
                    handleSelected={handleItemSelection}
                    selectedIds={selectedItems}
                />
            ) : null}

            <Button
                variant="text"
                onClick={hasSimulationAutoRollStarted && !isConditionMet ? handleCancelSim : handleRollClick}
                disabled={isConditionMet}
            >
                {hasSimulationAutoRollStarted && !isConditionMet ? "Cancel Rolls" : "Generate Rolls"}
            </Button>

            <Button variant="text" onClick={handleResetClick}>Reset</Button>
        </Box>
    );
}