/**
 *  Checks if the value is a plain-ol'-javascript-object
 *  @example
 *  // returns true
 *  isPojo({})
 * 
 *  // returns false
 *  isPojo(1)
 *  isPojo(null)
 *  isPojo([])
 */

export function isPojo(value: any): boolean {
    return value?.constructor === Object
}

export function containsPojos(arr: any[]): boolean {
    for (const element of arr)
        if (isPojo(element)) return true
    return false
}