import { PojoTree } from '../PojoTree/PojoTree.ts'
import { isPojo } from '../PojoTree/isPojo.ts'
import { tryBranches } from '../branches/branches.ts'

/*
    mapTree
    maps following the leaves of the first tree given
    passing similarly-keyed nodes as arguments to given transform
    see: 'pluckBranches' for further detail
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



