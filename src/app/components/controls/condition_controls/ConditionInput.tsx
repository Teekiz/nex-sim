import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Tooltip} from "@mui/material";
import {Conditions} from "../../../../lib/enum/conditions.ts";

interface ConditionInputProps {
    condition: Conditions;
    handleConditionChange: (event: SelectChangeEvent) => void;
}

export default function ConditionInput({condition, handleConditionChange}: ConditionInputProps) {
    return (
        <FormControl variant="filled">
            <InputLabel id="condition-select-label">Continue until</InputLabel>
            <Select
                labelId="condition-select-label"
                id="condition-select"
                value={condition.key}
                onChange={handleConditionChange}
                variant="filled"
            >
                {Conditions.values().map(condition => (
                    <MenuItem key={condition.key} value={condition.key}>
                        <Tooltip title={condition.description}>
                            <span>{condition.name}</span>
                        </Tooltip>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}