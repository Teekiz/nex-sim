export class Conditions {
    static readonly UNTIL_ROLL_COUNT = new Conditions("UNTIL_ROLL_COUNT", "Kill count", "Drops will continued to be rolled until the count is met.", "Target kill count");
    static readonly UNTIL_SHARD_COUNT = new Conditions("UNTIL_SHARD_COUNT", "Shards received", "Drops will continued to be rolled until the count is met.", "Target shards");
    static readonly UNTIL_UNIQUE_COUNT = new Conditions("UNTIL_UNIQUE_COUNT", "Uniques received", "Drops will continued to be rolled until the count is met.", "Target uniques");
    static readonly UNTIL_PET_DROP = new Conditions("UNTIL_PET_DROP", "Pet drop", "Drops will until a pet has been rolled", "");
    static readonly UNTIL_SELECTED_ITEMS = new Conditions("UNTIL_SELECTED_ITEMS", "Selected items", "Drops will continue to be rolled until at least one of every selected item has been dropped.", "");
    static readonly UNTIL_ALL_ITEMS = new Conditions("UNTIL_ALL_ITEMS", "Green logged", "Drops will continue to be rolled until at least one of every item has been dropped.", "");

    private constructor(public readonly key: string, public readonly name: string,
                        public readonly description: string, public readonly label: string) {
    }

    static values(): Conditions[] {
        return [
            Conditions.UNTIL_ROLL_COUNT,
            Conditions.UNTIL_SHARD_COUNT,
            Conditions.UNTIL_UNIQUE_COUNT,
            Conditions.UNTIL_PET_DROP,
            Conditions.UNTIL_SELECTED_ITEMS,
            Conditions.UNTIL_ALL_ITEMS,
        ];
    }

    static getConditionFromKey(key: string): Conditions | undefined {
        return Conditions.values().find(condition => condition.key === key);
    }
}