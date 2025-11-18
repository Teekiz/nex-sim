import Box from "@mui/material/Box";
import {Collapse} from "@mui/material";
import {Condition} from "../../../../lib/enum/conditions.ts";
import TextField from "@mui/material/TextField";
import ItemsCheckbox from "../ItemsCheckbox.tsx";

interface CollapseComponentsProps {
    condition: Condition;
    rolls: number;
    setRolls: (number: number) => void;
    selectedItems: number[];
    handleItemSelection: (itemID: number, checked: boolean) => void;
}

export default function CollapseComponents({condition, rolls, setRolls, selectedItems, handleItemSelection}: CollapseComponentsProps) {
    return (
        <><Box sx={{display: "contents"}}>
            <Collapse in={condition === Condition.UNTIL_ROLL_COUNT ||
                condition === Condition.UNTIL_UNIQUE_COUNT ||
                condition === Condition.UNTIL_SHARD_COUNT}>
                <Box sx={{mt: 2}}>
                    <TextField
                        label="Number of Rolls"
                        variant="filled"
                        value={rolls}
                        onChange={(e) => setRolls(Number(e.target.value))}
                        type={"text"}
                        inputMode={"numeric"}/>
                </Box>
            </Collapse>
        </Box><Box sx={{display: "contents"}}>
            <Collapse in={condition === Condition.UNTIL_SELECTED_ITEMS}>
                <Box sx={{mt: 2}}>
                    <ItemsCheckbox
                        handleSelected={handleItemSelection}
                        selectedIds={selectedItems}/>
                </Box>
            </Collapse>
        </Box></>
    );
}