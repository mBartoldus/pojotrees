import { climbTree, climbTrees } from './climbTree.ts'
import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"


Deno.test('climbTree: iterate recursively, yield values (non-wrapped)', ()=>{
    const tree_a = {
        one: 1,
        subtree: {
            two: 2,
            three: 3,
            subtree: {
                four: 4
            }
        }
    }
    const output = [...climbTree(tree_a)]

    assertEquals([1, 2, 3, 4], output)
})

Deno.test('climbTrees: iterate first argument recursively, wrap each yielded value in an array', () => {
    const tree_a = {
        one: 1,
        subtree: {
            two: 2,
            three: 3,
            subtree: {
                four: 4
            }
        }
    }
    const output = [...climbTrees(tree_a)]

    assertEquals([[1], [2], [3], [4]], output)
})


Deno.test('climbTrees: yield arrays of nodes from respective arguments', () => {
    const tree_a = { one: 'a1', two: 'a2', subtree: { three: 'a3' } }
    const tree_b = { one: 'b1', two: 'b2', subtree: { three: 'b3' } }
    const tree_c = { one: 'c1', two: 'c2', subtree: { three: 'c3' } }

    const output = [...climbTrees(tree_a, tree_b, tree_c)]

    assertEquals([
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3']
    ], output)
})

Deno.test('climbTrees: yield any non-POJO value from first argument', () => {
    class CustomClass { }
    const instance = new CustomClass()

    const tree_a = {
        number: 1,
        string: 'hello',
        boolean: true,
        array: [0, 1, 2],
        customClass: instance
    }

    const output = [...climbTrees(tree_a)]

    assertEquals([
        [1],
        ['hello'],
        [true],
        [[0, 1, 2]],
        [instance]
    ], output)
})