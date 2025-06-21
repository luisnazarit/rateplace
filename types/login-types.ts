export const typeKeys = ["company", "user", "admin"] as const;
export type UserType = typeof typeKeys[number];