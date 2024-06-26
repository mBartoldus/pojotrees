/**
 * Makes all properties in T optional, deeply
 */
export type DeepPartial<T> = {
    [K in keyof T]?: DeepPartial<T[K]>
}