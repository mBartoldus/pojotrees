# About

This library provides functions and generators for mapping and iterating nested objects.
Since "Pojo" stands for "Plain Ol' Javascript Object", a PojoTree would be a tree
whose branches are Pojos. JSON files are PojoTrees. Anything constructed from
object literals {} is a PojoTree.

Anything without 'Object' as its constructor is NOT a Pojo, and is instead
treated as a leaf. This includes:

- numbers
- strings
- arrays
- class instances

> The functions mergeTrees, overlayTrees, and treeProduct traverse the leaves of all arguments.
> Where a leaf in one tree corresponds to a branch in another,
> that leaf will be distributed as an argument to the function calls along the equivalent branch.

> The functions mapTree, doTrees, and climbTrees will also distribute leaves along branches,
> but will only look for a tree structure which follows that of the first tree argument.

# Examples

```
const mappedTree = mapTree(transform, tree)
// returns {
//      a: transform(tree.a),
//      b: transform(tree.b),
//      c: transform(tree.c)
// }
```

If multiple arguments are passed to mapTree, they are passed to the transforming
function following the PojoTree structure of the first argument.

```
const mappedTrees = mapTree(transform, ...trees)
// returns {
//      a: transform(trees[0].a, trees[1].a)
//      b: transform(trees[0].b, trees[1].b),
//      c: transform(trees[0].c, trees[1].c)
// }
```

The returned PojoTree will only follow the structure of the first argument.
Where leaves in latter arguments correspond to branches in the first
argument, those leaves will be distributed.

```
const mappedTreeAndLeaf = mapTree(transform, tree, leaf)
// returns {
//      a: transform(tree.a, leaf),
//      b: transform(tree.b, leaf),
//      c: transform(tree.c, leaf)
// }
```

The function doTree calls a tree of functions. The result is a tree whose leaves
are the return value of calling the function tree's leaves on the arguments' leaves.

```
const done = doTree(funcTree, arg)
// returns {
//      a: funcTree.a(arg.a),
//      b: funcTree.b(arg.b),
//      b: funcTree.c(arg.c)
// }
```

This climbTree generator yields leaves, while climbTrees yields arrays of leaves

```
for(const leaf of climbTree(tree))
// yields tree.a, tree.b, tree.c

for(const leaves of climbTrees(trees))
// yields [trees[0].a, trees[1].a], [trees[0].b, trees[1].b]
```

# Build

> Deno bundle has been deprecated, this command will need to be replaced sometime soon.

```
deno bundle src/mod.ts dist/pojotree.module.js
```

# Test

```
deno test
```