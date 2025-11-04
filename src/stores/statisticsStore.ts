import {create} from 'zustand'

type statisticsStore = {
    totalRolls: number;
    longestDryStreak: number;
    currentDryStreak: number;
    itemLog: itemLog[];

    incrementTotalRolls: () => void;
    addItemToItemLog: (id: number) => void;
    incrementDryStreak: () => void;
    resetDryStreak: () => void;
    resetStatistics: () => void;
}

type itemLog = {
    id: number;
    rollCount: number;
}

export const useStatisticsStore = create<statisticsStore>((set) => ({
    totalRolls: 0,
    longestDryStreak: 0,
    currentDryStreak: 0,
    itemLog: [],

    incrementTotalRolls: () =>
        set((state) => ({
            totalRolls: state.totalRolls + 1,
        })),

    addItemToItemLog: (id: number) =>
        set((state) => ({
            itemLog: [...state.itemLog, { id, rollCount: state.totalRolls }],
        })),

    incrementDryStreak: () =>
        set((state) => {
            const newDryStreak = state.currentDryStreak + 1;
            const newLongest =
                newDryStreak > state.longestDryStreak
                    ? newDryStreak
                    : state.longestDryStreak;

            return {
                currentDryStreak: newDryStreak,
                longestDryStreak: newLongest,
            };
        }),

    resetDryStreak: () =>
        set(() => ({
            currentDryStreak: 0,
        })),

    resetStatistics: () => set(() => ({
        totalRolls: 0,
        currentDryStreak: 0,
        longestDryStreak: 0,
        itemLog: []
    }))
}));