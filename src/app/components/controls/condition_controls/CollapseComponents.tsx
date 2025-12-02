import {Collapse, Stack} from "@mui/material";
import {Conditions} from "../../../../lib/enum/conditions.ts";
import TextField from "@mui/material/TextField";
import ItemsCheckbox from "./ItemsCheckbox.tsx";

interface CollapseComponentsProps {
    condition: Conditions;
    rolls: number;
    setRolls: (number: number) => void;
    selectedItems: number[];
    handleItemSelection: (itemID: number, checked: boolean) => void;
}

export default function CollapseComponents({condition, rolls, setRolls, selectedItems, handleItemSelection}: CollapseComponentsProps) {
    return (
        <Stack useFlexGap={true} width={{xs: "90%", sm: "70%", md: "50%"}} direction="column" alignItems="center" flexWrap={"wrap"} justifyContent={"center"}>
            {/* Number of rolls input */}
            <Collapse in={condition === Conditions.UNTIL_ROLL_COUNT ||
                condition === Conditions.UNTIL_UNIQUE_COUNT ||
                condition === Conditions.UNTIL_SHARD_COUNT}>
                <TextField
                    label={condition.label}
                    variant="filled"
                    size={"small"}
                    value={rolls}
                    onChange={(e) => setRolls(Number(e.target.value))}
                    type={"text"}
                    inputMode={"numeric"}/>
            </Collapse>

            {/* Select item input */}
            <Collapse in={condition === Conditions.UNTIL_SELECTED_ITEMS}>
                <ItemsCheckbox
                    handleSelected={handleItemSelection}
                    selectedIds={selectedItems}/>
            </Collapse>
        </Stack>
    );
}