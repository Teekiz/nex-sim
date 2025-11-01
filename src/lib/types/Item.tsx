import {Tables} from "../enum/tables.tsx";

export type Item = {
    itemID: number;
    name: string;
    quantityMin: number;
    quantityMax: number;
    numerator: number;
    denominator: number;
    table: Tables;
}