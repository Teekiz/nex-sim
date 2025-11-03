import {useState} from "react";
import type {ItemRow} from "../../lib/types/itemRow.tsx";
import InputBox from "./Controls/InputBox.tsx";
import ItemStats from "./Display/Stats.tsx";
import ItemGridUI from "./Display/ItemGridUI.tsx";

import Nexling from "../../assets/Nexling.png";
import Ancienthilt from "../../assets/Ancienthilt.png";
import Nihilhorn from "../../assets/Nihilhorn.png";
import Zarytevambraces from "../../assets/Zarytevambraces.png";
import Torvafullhelmdamaged from "../../assets/Torvafullhelmdamaged.png";
import Torvaplatebodydamaged from "../../assets/Torvaplatebodydamaged.png";
import Torvaplatelegsdamaged from "../../assets/Torvaplatelegsdamaged.png";
import Nihilshard from "../../assets/Nihilshard.png";
import type {ItemRoll} from "../../lib/types/itemRoll.tsx";

export default function SimulatorUI()
{
    const [totalRolls, setTotalRolls] = useState(0);
    const [items, setItems] = useState<ItemRow[]>([
        { id: 8, name: "Nexling", quantity: 0, image_url: Nexling },
        { id: 6, name: "Ancient hilt", quantity: 0, image_url: Ancienthilt },
        { id: 2, name: "Nihil Horn", quantity: 0, image_url: Nihilhorn },
        { id: 1, name: "Zaryte vambraces", quantity: 0, image_url: Zarytevambraces },
        { id: 3, name: "Torva full helm (damaged)", quantity: 0, image_url: Torvafullhelmdamaged },
        { id: 4, name: "Torva platebody (damaged)", quantity: 0, image_url: Torvaplatebodydamaged },
        { id: 5, name: "Torva platelegs (damaged)", quantity: 0, image_url: Torvaplatelegsdamaged },
        { id: 7, name: "Nihil shard", quantity: 0, image_url: Nihilshard },
    ]);

    const [itemLog, setItemLog] = useState<ItemRoll[]>([]);
    const [longestDryStreak, setLongestDryStreak] = useState(0);
    const [currentDryStreak, setCurrentDryStreak] = useState(0);

    function incrementTotalRows(): void {
        setTotalRolls((prevState) => prevState + 1);
    }

    function onItemRoll(item: ItemRoll) {
        //increments the quantity stored.
        setItems(prev =>
            prev.map(row =>
                row.id === item.id ? { ...row, quantity: row.quantity + item.quantity} : row
            )
        );

        //updates the item logs.
        setItemLog(prevState => [...prevState, item]);
    };

    function updateDryStreak(hasItemDropped: boolean)
    {
        if (hasItemDropped){
            setCurrentDryStreak(0);
        } else {
            setCurrentDryStreak((prevState) => prevState + 1);
        }


        if (currentDryStreak > longestDryStreak){
            setLongestDryStreak(currentDryStreak);
        }
    }



    return (
        <>
            <InputBox incrementTotalRolls={incrementTotalRows} onItemRoll={onItemRoll} updateDryStreak={updateDryStreak}/>
            <ItemGridUI items={items} timesRolled={totalRolls}/>
            <ItemStats items={items} timesRolled={totalRolls}/>
        </>
    );
}