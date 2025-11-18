import TextField from '@mui/material/TextField';
import {useRef, useState} from "react";
import {
    Button,
    Grid,
    type SelectChangeEvent,
    Stack
} from "@mui/material";
import {simulateDrops} from "../../../lib/simulation/simulator.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {Condition} from "../../../lib/enum/conditions.ts";
import {checkCondition} from "../../../lib/simulation/conditions.ts";
import ContributionInput from "./ContributionInput.tsx";
import ConditionInput from "./condition_controls/ConditionInput.tsx";
import CollapseComponents from "./condition_controls/CollapseComponents.tsx";

export default function InputBox() {

    const [contributionRange, setContributionRange] = useState<number[]>([33.3, 40.0]);
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
        simulateDrops({hasSimulationAutoRollStartedRef}, condition, teamsize, contributionRange, rolls, selectedItems);
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

    const isButtonConditionMet = (): boolean => {
        return hasSimulationAutoRollStarted && !isConditionMet;
    }

    return (
            <Stack spacing={3} alignItems={"center"} alignContent={"flex-end"}>
                {/* Contribution + Team Size (same row) */}
                <Grid container direction={"row"} spacing={3} width={"100%"} justifyContent={"center"} alignItems={"flex-start"} flexWrap={"wrap"}>
                    <Grid className={"input_wrapper_1"} sx={{width: 140}}>
                        <TextField id="outlined-basic" label="Team size" variant="filled" value={teamsize} onChange={(e) => setteamsize(Number(e.target.value))} type={"text"} inputMode={"numeric"}/>
                    </Grid>
                    <Grid className={"input_wrapper_2"} sx={{width: 500}}>
                        <ContributionInput contribution={contributionRange} setContribution={setContributionRange}></ContributionInput>
                    </Grid>
                    <Grid className={"input_wrapper_3"} sx={{width: 140}}>
                        <ConditionInput condition={condition} handleConditionChange={handleConditionChange}></ConditionInput>
                    </Grid>
                </Grid>


                {/* Condition-specific inputs */}
                <CollapseComponents selectedItems={selectedItems} handleItemSelection={handleItemSelection} condition={condition} rolls={rolls} setRolls={setRolls}></CollapseComponents>

                {/* Buttons */}
                <Stack direction="row" spacing={2} justifyContent="center" width={400}>
                <Button
                        variant="text"
                        onClick={isButtonConditionMet() ? handleCancelSim : handleRollClick}
                        disabled={isConditionMet}
                        sx={{backgroundColor: isButtonConditionMet() ? "red" : "forestgreen"}}
                    >
                        {isButtonConditionMet() ? "Cancel Rolls" : "Generate Rolls"}
                    </Button>
                    <Button variant="text" onClick={handleResetClick} sx={{backgroundColor: "#FFA500"}}>Reset</Button>
                </Stack>
            </Stack>
    );
}