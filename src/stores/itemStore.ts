import {create} from 'zustand'
import {Tables} from "../lib/enum/tables.ts";

import Nexling from "../assets/Images/Nexling.png";
import Ancienthilt from "../assets/Images/Ancienthilt.png";
import Nihilhorn from "../assets/Images/Nihilhorn.png";
import Zarytevambraces from "../assets/Images/Zarytevambraces.png";
import Torvafullhelmdamaged from "../assets/Images/Torvafullhelmdamaged.png";
import Torvaplatebodydamaged from "../assets/Images/Torvaplatebodydamaged.png";
import Torvaplatelegsdamaged from "../assets/Images/Torvaplatelegsdamaged.png";
import Nihilshard from "../assets/Images/Nihilshard.png";

export type Item = {
    id: number;
    name: string;
    quantity: number;
    dropRates: ItemSourceData[];
    table: Tables;
    imageUrl: string
}

//stores the drop table data for the item (or multiple if there are different rates)
export type ItemSourceData = {
    quantityMin: number;
    quantityMax: number;
    numerator: number;
    denominator: number;
}

interface ItemStore {
    items: Item[];
    updateQuantity: (itemID: number, quantity: number) => void;
    resetQuantity: () => void;
}

export const useItemsStore = create<ItemStore>((set) => ({
    items: [
        {id: 1, name: "Nexling", dropRates: [{numerator: 1, denominator: 1, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.PET, imageUrl: Nexling},
        {id: 2, name: "Ancient hilt", dropRates: [{numerator: 1, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Ancienthilt},
        {id: 3, name: "Nihil horn", dropRates: [{numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Nihilhorn},
        {id: 4, name: "Zaryte vambraces", dropRates: [{numerator: 3, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Zarytevambraces},
        {id: 5, name: "Torva full helm (damaged)", dropRates: [{numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Torvafullhelmdamaged},
        {id: 6, name: "Torva platebody (damaged)", dropRates: [{numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Torvaplatebodydamaged},
        {id: 7, name: "Torva platelegs (damaged)", dropRates: [{numerator: 2, denominator: 12, quantityMin: 1, quantityMax: 1}], quantity: 0, table: Tables.UNIQUE, imageUrl: Torvaplatelegsdamaged},
        {id: 8, name: "Nihil shard",  dropRates: [
            {numerator: 5, denominator: 82, quantityMin: 80, quantityMax: 85},
            {numerator: 8, denominator: 209,  quantityMin: 85, quantityMax: 95}], quantity: 0, table: Tables.COMMON, imageUrl: Nihilshard},
    ],

    updateQuantity: (itemID, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === itemID
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ),
        })),

    resetQuantity: () => {
        set((state) => ({
            items: state.items.map((item) => ({
                ...item, quantity: 0
            }))
        }))
    }
}));