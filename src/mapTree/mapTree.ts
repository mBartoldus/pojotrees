import { PojoTree } from '../PojoTree/PojoTree.ts'
import { isPojo } from '../PojoTree/isPojo.ts'
import { tryBranches } from '../branches/branches.ts'

/**
 * Maps the leaves of the first argument,
 * passing similarly-keyed leaves and branches from following arguments to the given transform function.
 */
export function mapTree(transform: Function, ...trees: any[]): any {
    if (!isPojo(trees[0])) return transform(...trees)
    const mapped: PojoTree = {}
    for (const key in trees[0]) {
        const values = tryBranches(key, ...trees)
        mapped[key] = mapTree(transform, ...values)
    }
    return mapped
}



