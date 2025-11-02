import {useState} from "react";
import type {ItemRow} from "../../lib/types/itemRow.tsx";
import InputBox from "./InputBox.tsx";
import ItemStats from "./Stats.tsx";
import ItemGridUI from "./ImageGrid/ItemGridUI.tsx";

export default function SimulatorUI()
{
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState<ItemRow[]>([
        { id: 8, name: "Nexling", quantity: 0, image_url: "src/assets/Nexling.png" },
        { id: 6, name: "Ancient hilt", quantity: 0, image_url: "src/assets/Ancienthilt.png" },
        { id: 2, name: "Nihil Horn", quantity: 0, image_url: "src/assets/Nihilhorn.png" },
        { id: 1, name: "Zaryte vambraces", quantity: 0, image_url: "src/assets/Zarytevambraces.png" },
        { id: 3, name: "Torva full helm (damaged)", quantity: 0, image_url: "src/assets/Torvafullhelmdamaged.png" },
        { id: 4, name: "Torva platebody (damaged)", quantity: 0, image_url: "src/assets/Torvaplatebodydamaged.png" },
        { id: 5, name: "Torva platelegs (damaged)", quantity: 0, image_url: "src/assets/Torvaplatelegsdamaged.png" },
        { id: 7, name: "Nihil shard", quantity: 0, image_url: "src/assets/Nihilshard.png" },
    ]);

    return (
        <>
            <InputBox setItems={setItems} setRolled={setTotal}/>
            <ItemGridUI items={items} timesRolled={total}/>
            <ItemStats items={items} timesRolled={total}/>
        </>
    );
}