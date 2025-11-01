import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Button} from "@mui/material";
import type {ItemRow} from "../../lib/types/itemRow.tsx";
import {simulateDrops} from "../../lib/simulator.ts";

interface InputBoxProps {
    setItems: React.Dispatch<React.SetStateAction<ItemRow[]>>;
    setRolled: React.Dispatch<React.SetStateAction<number>>;
}

export default function InputBox({setItems, setRolled}: InputBoxProps) {

    const [contribution, setContribution] = useState(0.33);
    const [teamsize, setteamsize] = useState(3);
    const [rolls, setRolls] = useState(10);

    const handleButtonClick = () => {
        const result = simulateDrops(rolls, teamsize, contribution);
        result.map(item => incrementQuantity(item.itemID, item.quantity))
        setRolled(prevState => prevState + rolls);
    }

    const incrementQuantity = (id: number, quantity: number) => {
        setItems(prev =>
            prev.map(row =>
                row.id === id ? { ...row, quantity: row.quantity + quantity } : row
            )
        );
    };

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" label="Contiribution" variant="outlined" value={contribution} onChange={(e) => setContribution(parseFloat(e.target.value))} type={"number"}/>
                <TextField id="outlined-basic" label="Team size" variant="outlined" value={teamsize} onChange={(e) => setteamsize(Number(e.target.value))} type={"number"}/>
                <TextField id="outlined-basic" label="Number of rolls" variant="outlined" value={rolls} onChange={(e) => setRolls(Number(e.target.value))} type={"number"}/>

                <Button variant="text" onClick={handleButtonClick}>Generate Rolls</Button>
        </Box>
    );
}