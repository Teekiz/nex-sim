import TextField from '@mui/material/TextField';
import {useRef, useState} from "react";
import {
    Button,
    Container,
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
        <Container maxWidth="md">
            <Stack spacing={4} alignItems={"center"}>

                <ContributionInput contribution={contributionRange} setContribution={setContributionRange}></ContributionInput>

                {/* Contribution + Team Size (same row) */}
                    <Stack direction={"row"} spacing={3} width={"100%"} justifyContent={"center"}>
                        <TextField id="outlined-basic" label="Team size" variant="outlined" value={teamsize} onChange={(e) => setteamsize(Number(e.target.value))} type={"number"}/>
                        <ConditionInput condition={condition} handleConditionChange={handleConditionChange}></ConditionInput>
                    </Stack>

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
        </Container>
    );
}