import { isPojo } from '../PojoTree/isPojo.ts'

/**
    plucks keyed values from pojo arguments

    non-pojo arguments are passed unchanged

    pojos without given key are mapped to undefined
*/

export function tryBranches(key: string | number, ...trees: any[]) {
    return trees.map(value => isPojo(value) ? value[key] : value)
}


/**
 *  collects keyed values from pojo arguments
 * 
 *  non-pojo arguments are passed unchanged
 * 
 *  pojos without given key are not included in the return value
 */


export function gatherBranches(key: string | number, ...trees: any[]) {
    const branches = []
    for (const tree of trees)
        if (!isPojo(tree)) branches.push(tree)
        else if (key in tree) branches.push(tree[key])
    return branches
}