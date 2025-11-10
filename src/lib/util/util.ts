import {type Item, useItemsStore} from "../../stores/itemStore.ts";

function getItems(): Item[] {
    return useItemsStore.getState().items;
}

export function getShardCount(): number {
    const shards = getItems().find(item => item.id === 8);
    return shards == undefined ? 0 : shards.quantity;
}

export function getUniqueCount(): number {
    return getItems()
        .filter(item => item.id <= 7)
        .reduce((total, item) => total + item.quantity, 0);
}

export function getCollectionLogCount(): number {
    return getItems()
        .filter(item => item.quantity >= 1)
        .length;
}

export function getImageUrl(itemID: number): string {
    const item = getItems().find(item => item.id === itemID);
    return item === undefined ? "" : item.imageUrl;
}