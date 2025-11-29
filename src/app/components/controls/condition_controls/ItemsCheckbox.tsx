import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@mui/material";
import {useItemsStore} from "../../../../stores/itemStore.ts";
import {Tables} from "../../../../lib/enum/tables.ts";

interface ItemCheckboxProps {
    selectedIds: number[];
    handleSelected: (itemID: number, checked: boolean) => void;
}

export default function ItemsCheckbox({selectedIds, handleSelected}: ItemCheckboxProps) {

    const selectableItems = useItemsStore.getState().items.filter(item => item.table === Tables.UNIQUE || item.table === Tables.PET);

    //todo - make the dropdown hidable
    return (
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" sx={{fontFamily: "RunescapeBold", fontSize: 16}}>Select items</FormLabel>
                <FormGroup>
                    <Grid container spacing={1} columns={{xs: 1, sm: 2}} alignSelf={"center"} sx={{border: "1px solid white", borderRadius: "4px", padding: "10px"}}>
                        {selectableItems.map((item) => (
                            <Grid size={1} key={item.id}>
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={selectedIds.includes(item.id)}
                                            onChange={(_, checked) => handleSelected(item.id, checked)} name="gilad" />
                                    }
                                    label={item.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormGroup>
            </FormControl>
    );
}