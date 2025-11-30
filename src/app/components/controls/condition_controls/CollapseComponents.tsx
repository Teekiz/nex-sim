import {Collapse, Stack} from "@mui/material";
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
        <Stack useFlexGap={true} width={{xs: "90%", sm: "70%", md: "50%"}} direction="column" alignItems="center" flexWrap={"wrap"} justifyContent={"center"}>
            {/* Number of rolls input */}
            <Collapse in={condition === Condition.UNTIL_ROLL_COUNT ||
                condition === Condition.UNTIL_UNIQUE_COUNT ||
                condition === Condition.UNTIL_SHARD_COUNT}>
                <TextField
                    label="Number of Rolls"
                    variant="filled"
                    size={"small"}
                    value={rolls}
                    onChange={(e) => setRolls(Number(e.target.value))}
                    type={"text"}
                    inputMode={"numeric"}/>
            </Collapse>

            {/* Select item input */}
            <Collapse in={condition === Condition.UNTIL_SELECTED_ITEMS}>
                <ItemsCheckbox
                    handleSelected={handleItemSelection}
                    selectedIds={selectedItems}/>
            </Collapse>
        </Stack>
    );
}