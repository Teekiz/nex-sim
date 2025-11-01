export const Tables = {
    UNIQUE: 0,
    COMMON: 1,
    PET: 2,
} as const;

export type Tables = typeof Tables[keyof typeof Tables];