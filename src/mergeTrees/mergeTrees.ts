import { isPojo, containsPojos } from '../PojoTree/isPojo.ts'
import { gatherBranches } from '../branches/branches.ts'

/**
 * Returns a new tree by combining branches of other trees, using a merger function.
 */
export function mergeTrees(
    merger: (leafA: any, leafB: any) => any,
    ...trees: any[]
): any {
    if (trees.length === 1) return trees[0]
    if (!containsPojos(trees)) return trees.reduce(merger)

    const branches: Record<string, any[]> = {}
    for (const tree of trees)
        if (isPojo(tree))
            for (const k in tree)
                branches[k] ??= gatherBranches(k, ...trees)

    const merged: any = {}
    for (const k in branches)
        merged[k] = mergeTrees(merger, ...branches[k])
    return merged
}

/**
 * Returns a new tree whose leaves are combined from the trees given,
 * with latter trees' leaves overwriting earlier ones.
 * 
 * @example
 * overlayTrees({a:1, b:2}, {b:100})
 * // returns {a:1, b:100}
 */
export const overlayTrees = (...trees: any[]): any =>
    mergeTrees((_a, b) => b, ...trees)

/**
 * Returns a new tree whose leaves are the product of the given trees' leaves.
 * Where one tree ends in a leaf and others continue into branches, that leaf will be distributed to leaves along that branch.
 * 
 * @example
 * overlayTrees({a:1, b:2}, {a:10, b:100})
 * // returns {a:10, b:200}
 * 
 * @example
 * overlayTrees({a: 100}, {a:{x:1, y:2}, b: 5})
 * // returns {a:{x:100, y:200}, b: 5}
 */
export const treeProduct = (...factors: any[]): any =>
    mergeTrees((a, b) => a * b, ...factors)