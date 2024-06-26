
import type { PojoTree } from "../PojoTree/PojoTree.ts";
import { isPojo } from "../PojoTree/isPojo.ts";

/**
 * The signature for a function which can be passed to ```reduceTrees```, reducing nested object properties, similar to ```[].reduce```.
 * 
 * The optional third argument of a ```TreeReducer``` is the array of keys mapping the nested property.
 * On an object ```{a:{b:{c:true}}}```, the reducer would be called with ```true``` as the second argument, and ```['a','b','c']``` as the third.
 */
export type TreeReducer = ((acc: any, value: any) => any) | ((acc: any, value: any, keys: string[]) => any)

function _(initial: any, reducer: TreeReducer, tree: PojoTree, keys: string[]) {
    let acc = initial
    for (const [k, v] of Object.entries(tree)) {
        const subkeys = [...keys, k]
        if (isPojo(v)) acc = _(acc, reducer, v, subkeys)
        else acc = reducer(acc, v, subkeys)
    }
    return acc
}

/**
 * Calls the reducer function for the leaves of a ```PojoTree```, returning the accumulated result.
 */
export function reduceTree(initial: any, reducer: TreeReducer, tree: PojoTree): any {
    return _(initial, reducer, tree, [])
}