import { PojoTree } from "../PojoTree/PojoTree.ts";
import { isPojo } from "../PojoTree/isPojo.ts";

export function filterTree(condition: (leaf: any) => Boolean, tree: PojoTree): PojoTree {
    if (!isPojo(tree))
        return tree

    const filtered: any = {}
    for (const [k, v] of Object.entries(tree)) {
        if (!isPojo(v)) condition(v) && (filtered[k] = v)
        else {
            const branch = filterTree(condition, v)
            if (Object.keys(branch).length) filtered[k] = branch
        }
    }
    return filtered
}