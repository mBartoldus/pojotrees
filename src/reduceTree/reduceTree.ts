
import type { PojoTree } from "../PojoTree/PojoTree.ts";
import { isPojo } from "../PojoTree/isPojo.ts";

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

export function reduceTree(initial: any, reducer: TreeReducer, tree: PojoTree): any {
    return _(initial, reducer, tree, [])
}