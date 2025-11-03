//Defines an item that has been rolled, alongside the quantity that was produced from the roll.
export type ItemRoll = {
    id: number;
    name: string;
    quantity: number;
    droppedAt: number;
}