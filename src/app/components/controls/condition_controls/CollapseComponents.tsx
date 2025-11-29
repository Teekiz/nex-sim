import {Box, Collapse, Stack} from "@mui/material";
import {Condition} from "../../../../lib/enum/conditions.ts";
import TextField from "@mui/material/TextField";
import ItemsCheckbox from "./ItemsCheckbox.tsx";

interface CollapseComponentsProps {
    condition: Condition;
    rolls: number;
    setRolls: (number: number) => void;
    selectedItems: number[];
    handleItemSelection: (itemID: number, checked: boolean) => void;
}

export default function CollapseComponents({condition, rolls, setRolls, selectedItems, handleItemSelection}: CollapseComponentsProps) {
    return (
        <Stack useFlexGap={true} width={"100%"} direction="column" alignItems="center" flexWrap={"wrap"} justifyContent={"center"}>
            {/* Number of rolls input */}
            <Box sx={{width: 140}}>
                <Collapse in={condition === Condition.UNTIL_ROLL_COUNT ||
                    condition === Condition.UNTIL_UNIQUE_COUNT ||
                    condition === Condition.UNTIL_SHARD_COUNT}>
                    <TextField
                        label="Number of Rolls"
                        variant="filled"
                        value={rolls}
                        onChange={(e) => setRolls(Number(e.target.value))}
                        type={"text"}
                        inputMode={"numeric"}/>
                </Collapse>
            </Box>

            {/* Select item input */}
            <Box sx={{maxWidth: 500}}>
                <Collapse in={condition === Condition.UNTIL_SELECTED_ITEMS}>
                    <ItemsCheckbox
                        handleSelected={handleItemSelection}
                        selectedIds={selectedItems}/>
                </Collapse>
            </Box>
        </Stack>
    );
}