import { mergeTrees, overlayTrees, treeProduct } from './mergeTrees.ts'
import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"

const voidFn = () => { }

Deno.test('mergeTrees: should merge leaves', () => {
    assertEquals(
        mergeTrees(voidFn, { a: 1 }, { b: 2 }),
        { a: 1, b: 2 }
    )

    assertEquals(
        overlayTrees({ a: 1, b: 1 }, { b: 2 }),
        { a: 1, b: 2 }
    )

    assertEquals(
        treeProduct({ a: 6, b: 4 }, { a: 2, b: 4, c: 20 }),
        { a: 12, b: 16, c: 20 }
    )
})

Deno.test('mergeTrees: should merge branches', () => {
    const tree1 = {
        a: { a: 1 },
        b: { b: 2 }
    }
    const tree2 = {
        a: { b: 3 },
        b: { a: 4 }
    }

    const expected = {
        a: { a: 1, b: 3 },
        b: { a: 4, b: 2 }
    }
    const actual = mergeTrees(voidFn, tree1, tree2)
    assertEquals(actual, expected)
})

Deno.test('treeProduct: should be distributive and commutative', () => {

    const actual = treeProduct({
        a: 10,
        b: { x: 10, y: 100 }
    }, {
        a: { x: 0.5, y: 0.1 },
        b: 2
    })

    const expected = { a: { x: 5, y: 1 }, b: { x: 20, y: 200 } }

    assertEquals(actual, expected)
})