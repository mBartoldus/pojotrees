
import { doTree } from './doTree.ts'
import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"

Deno.test('doTree', () => {
    const funcTree = {
        a(n: number) { return `a${n}` },
        b(n: number) { return `b${n}` }
    }

    const actual = doTree(funcTree, 100)

    const expected = {
        a: 'a100',
        b: 'b100'
    }

    assertEquals(expected, actual)
})


Deno.test('doTree', () => {
    const funcTree = {
        a: (x: number, y: number) => x + y,
        b: (x: number, y: number) => x * y
    }
    const x = { a: 1, b: 2 }
    const y = { a: 10, b: 20 }

    assertEquals(doTree(funcTree, x, y), { a: 11, b: 40 })
})