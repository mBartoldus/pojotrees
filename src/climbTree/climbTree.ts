import { PojoTree } from '../PojoTree/PojoTree.ts'
import { isPojo } from '../PojoTree/isPojo.ts'
import { tryBranches } from '../branches/branches.ts'

/**
 *  Yields each leaf of a ```PojoTree```.
*/

export function* climbTree(tree: PojoTree): Generator<any> {
    if (!isPojo(tree)) yield tree
    else for (const k in tree) yield* climbTree(tree[k])
}

/**
 *  Traverses the first argument for leaves,
 *  yielding tuples of equivalently hashed entries from respective arguments
*/

export function* climbTrees(...trees: PojoTree[]): Generator<any[]> {
    if (!isPojo(trees[0])) yield trees
    else for (const k in trees[0]) {
        const props = tryBranches(k, ...trees)
        yield* climbTrees(...props)
    }
}