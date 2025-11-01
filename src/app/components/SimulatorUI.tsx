import {useState} from "react";
import ItemGrid from "./ItemGrid.tsx";
import type {ItemRow} from "../../lib/types/itemRow.tsx";
import InputBox from "./InputBox.tsx";
import ItemStats from "./Stats.tsx";

export default function SimulatorUI()
{
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState<ItemRow[]>([
        { id: 1, name: "Zaryte vambraces", quantity: 0 },
        { id: 2, name: "Nihil Horn", quantity: 0 },
        { id: 3, name: "Torva full helm (damaged)", quantity: 0 },
        { id: 4, name: "Torva platebody (damaged)", quantity: 0 },
        { id: 5, name: "Torva platelegs (damaged)", quantity: 0 },
        { id: 6, name: "Ancient hilt", quantity: 0 },
        { id: 7, name: "Nihil shard", quantity: 0 },
        { id: 8, name: "Nexling", quantity: 0 },
    ]);

    return (
        <>
            <InputBox setItems={setItems} setRolled={setTotal}/>
            <ItemGrid items={items} timesRolled={total}/>
            <ItemStats items={items}/>
        </>
    );
}