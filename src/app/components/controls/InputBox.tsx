import TextField from '@mui/material/TextField';
import {useEffect, useRef, useState} from "react";
import {
    Button,
    Grid,
    type SelectChangeEvent,
    Stack, Tooltip
} from "@mui/material";
import {simulateDrops} from "../../../lib/simulation/simulator.ts";
import {useStatisticsStore} from "../../../stores/statisticsStore.ts";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {Conditions} from "../../../lib/enum/conditions.ts";
import {checkCondition} from "../../../lib/simulation/conditions.ts";
import ContributionInput from "./ContributionInput.tsx";
import ConditionInput from "./condition_controls/ConditionInput.tsx";
import CollapseComponents from "./condition_controls/CollapseComponents.tsx";

export default function InputBox() {

    const [contributionRange, setContributionRange] = useState<number[]>([33.3, 40.0]);
    const [teamsize, setteamsize] = useState(3);
    const [rolls, setRolls] = useState(10);
    const [selectedItems, setSelectedItems] = useState<number[]>([1,2,3,4,5,6,7]);

    const [condition, setCondition] = useState<Conditions>(Conditions.UNTIL_ROLL_COUNT);
    const isConditionMet = checkCondition(condition, rolls, selectedItems);

    //these are used to stop and start the roll - controlled by the user
    const [hasSimulationAutoRollStarted, setHasSimulationAutoRollStarted] = useState(false);
    const hasSimulationAutoRollStartedRef = useRef(hasSimulationAutoRollStarted);

    const resetItemsQuantity = useItemsStore().resetQuantity;
    const resetStatistics = useStatisticsStore().resetStatistics;

    useEffect(() => {
        if (isConditionMet) {
            handleCancelSim();
        }
    }, [isConditionMet])

    const handleRollClick = () => {
        setHasSimulationAutoRolledStarted(true);
        simulateDrops({hasSimulationAutoRollStartedRef}, condition, teamsize, contributionRange, rolls, selectedItems);
    }

    const handleCancelSim = () => {
        setHasSimulationAutoRolledStarted(false);
    }

    const handleConditionChange = (event: SelectChangeEvent) => {
        const key = event.target.value;
        const condition = Conditions.getConditionFromKey(key);

        if (condition){
            setCondition(condition);
            setHasSimulationAutoRolledStarted(false);
        }
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
            <Stack spacing={1} rowGap={1} alignItems={"center"} alignContent={"flex-end"}>
                <Grid container direction={"row"} spacing={3} width={"100%"} justifyContent={"center"} alignItems={"flex-start"} flexWrap={"wrap"}>
                    <Grid size={{xs: 12, sm: 10, md: 8, lg: 6}}>
                        <ContributionInput contribution={contributionRange} setContribution={setContributionRange}></ContributionInput>
                    </Grid>
                </Grid>

                <Grid container direction={"row"} spacing={3} width={"100%"} justifyContent={"center"} alignItems={"flex-start"} flexWrap={"wrap"}>
                    <Grid size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                        <Tooltip title={"The number of people in your team (1-60)."}>
                            <TextField id="outlined-basic"
                                       label="Team size"
                                       variant="filled"
                                       value={teamsize} onChange={(e) => setteamsize(Number(e.target.value))}
                                       type={"text"}
                                       inputMode={"numeric"}
                                       slotProps={{
                                           input: {
                                               inputProps: {
                                                   min: 1,
                                                   max: 60,
                                                   step: 1,
                                                   type: 'number',
                                                   'aria-labelledby': 'input-slider',
                                               },
                                           },
                                       }}
                            />
                        </Tooltip>
                    </Grid>

                    <Grid size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                        <ConditionInput condition={condition} handleConditionChange={handleConditionChange}></ConditionInput>
                    </Grid>
                </Grid>


                {/* Condition-specific inputs */}
                <CollapseComponents selectedItems={selectedItems} handleItemSelection={handleItemSelection} condition={condition} rolls={rolls} setRolls={setRolls}></CollapseComponents>

                {/* Buttons */}
                <Stack direction="row"
                       spacing={{xs: 1, sm: 2, md: 2, lg: 3, xl: 4}}
                       justifyContent="center"
                       minWidth={200}>
                <Button
                        variant="text"
                        onClick={isButtonConditionMet() ? handleCancelSim : handleRollClick}
                        disabled={isConditionMet}
                        sx={{backgroundColor: isButtonConditionMet() ? "red" : "forestgreen"}}
                    >
                        {isButtonConditionMet() ? "Stop" : "Start"}
                    </Button>
                    <Button variant="text" onClick={handleResetClick} sx={{backgroundColor: "#FFA500"}}>Reset</Button>
                </Stack>
            </Stack>
    );
}