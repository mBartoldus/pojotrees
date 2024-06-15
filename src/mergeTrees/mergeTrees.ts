import { isPojo, containsPojos } from '../PojoTree/isPojo.ts'
import { gatherBranches } from '../branches/branches.ts'

export function mergeTrees(
    merger: (leafA: any, leafB: any) => any,
    ...trees: any[]
) {
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

export const overlayTrees = (...trees: any[]) =>
    mergeTrees((_a, b) => b, ...trees)

export const treeProduct = (...factors: any[]) =>
    mergeTrees((a, b) => a * b, ...factors)