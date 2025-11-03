import {Tables} from "../enum/tables.tsx";

//Defines an item that can be rolled.
export type Item = {
    itemID: number;
    name: string;
    quantityMin: number;
    quantityMax: number;
    numerator: number;
    denominator: number;
    table: Tables;
}