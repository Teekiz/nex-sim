import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import Box from "@mui/material/Box";
import {useItemsStore} from "../../../stores/itemStore.ts";
import {Tables} from "../../../lib/enum/tables.ts";

interface ItemCheckboxProps {
    selectedIds: number[];
    handleSelected: (itemID: number, checked: boolean) => void;
}

export default function ItemsCheckbox({selectedIds, handleSelected}: ItemCheckboxProps) {

    const selectableItems = useItemsStore.getState().items.filter(item => item.table === Tables.UNIQUE || item.table === Tables.PET);

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Select items</FormLabel>
                <FormGroup>
                    {selectableItems.map((item) => (
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={selectedIds.includes(item.id)}
                                    onChange={(_, checked) => handleSelected(item.id, checked)} name="gilad" />
                            }
                            label={item.name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
}