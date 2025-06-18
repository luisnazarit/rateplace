export const typeKeys = ["company", "client", "admin"] as const;
export type UserType = typeof typeKeys[number];