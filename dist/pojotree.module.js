// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function isPojo(value) {
    return value?.constructor === Object;
}
function containsPojos(arr) {
    for (const element of arr)if (isPojo(element)) return true;
    return false;
}
function tryBranches(key, ...trees) {
    return trees.map((value)=>isPojo(value) ? value[key] : value);
}
function gatherBranches(key, ...trees) {
    const branches = [];
    for (const tree of trees)if (!isPojo(tree)) branches.push(tree);
    else if (key in tree) branches.push(tree[key]);
    return branches;
}
function* climbTree(tree) {
    if (!isPojo(tree)) yield tree;
    else for(const k in tree)yield* climbTree(tree[k]);
}
function* climbTrees(...trees) {
    if (!isPojo(trees[0])) yield trees;
    else for(const k in trees[0]){
        const props = tryBranches(k, ...trees);
        yield* climbTrees(...props);
    }
}
function mapTree(transform, ...trees) {
    if (!isPojo(trees[0])) return transform(...trees);
    const mapped = {};
    for(const key in trees[0]){
        const values = tryBranches(key, ...trees);
        mapped[key] = mapTree(transform, ...values);
    }
    return mapped;
}
function filterTree(condition, tree) {
    if (!isPojo(tree)) return tree;
    const filtered = {};
    for (const [k, v] of Object.entries(tree)){
        if (!isPojo(v)) condition(v) && (filtered[k] = v);
        else {
            const branch = filterTree(condition, v);
            if (Object.keys(branch).length) filtered[k] = branch;
        }
    }
    return filtered;
}
function _(initial, reducer, tree, keys) {
    let acc = initial;
    for (const [k, v] of Object.entries(tree)){
        const subkeys = [
            ...keys,
            k
        ];
        if (isPojo(v)) acc = _(acc, reducer, v, subkeys);
        else acc = reducer(acc, v, subkeys);
    }
    return acc;
}
function reduceTree(initial, reducer, tree) {
    return _(initial, reducer, tree, []);
}
const callFirstArg = (fn, ...args)=>{
    return fn(...args);
};
function doTree(funcTree, ...args) {
    return mapTree(callFirstArg, funcTree, ...args);
}
function mergeTrees(merger, ...trees) {
    if (trees.length === 1) return trees[0];
    if (!containsPojos(trees)) return trees.reduce(merger);
    const branches = {};
    for (const tree of trees)if (isPojo(tree)) for(const k in tree)branches[k] ??= gatherBranches(k, ...trees);
    const merged = {};
    for(const k in branches)merged[k] = mergeTrees(merger, ...branches[k]);
    return merged;
}
const overlayTrees = (...trees)=>mergeTrees((_a, b)=>b, ...trees);
const treeProduct = (...factors)=>mergeTrees((a, b)=>a * b, ...factors);
export { isPojo as isPojo };
export { climbTree as climbTree, climbTrees as climbTrees };
export { mapTree as mapTree };
export { filterTree as filterTree };
export { reduceTree as reduceTree };
export { doTree as doTree };
export { mergeTrees as mergeTrees, overlayTrees as overlayTrees, treeProduct as treeProduct };
