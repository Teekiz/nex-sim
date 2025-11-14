import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {Condition} from "../../../../lib/enum/conditions.ts";

interface ConditionInputProps {
    condition: Condition;
    handleConditionChange: (event: SelectChangeEvent) => void;
}

export default function ConditionInput({condition, handleConditionChange}: ConditionInputProps) {
    return (
        <FormControl variant="filled" sx={{ minWidth: 225 }}>
            <InputLabel id="condition-select-label">Simulation Condition</InputLabel>
            <Select
                labelId="condition-select-label"
                id="condition-select"
                value={condition}
                onChange={handleConditionChange}
                variant="filled"
                sx={{ minWidth: 225 }}
            >
                {Object.entries(Condition).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

}