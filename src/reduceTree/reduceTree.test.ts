import { reduceTree } from './reduceTree.ts'
import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"


Deno.test('reduceTree', () => {
    const expected = 12
    const sum = (a: number, b: number) => a + b
    const tree = { a: 2, b: 3, c: 7 }
    const actual = reduceTree(0, sum, tree)
    assertStrictEquals(expected, actual)
})


Deno.test('reduceTree: should pass keys to reducer', () => {
    const expected = {
        'a/b': 1,
        'a/c': 2,
        'a/d/e': 3
    }
    const concatKeys = (acc: object, value: number, keys: string[]) => ({ ...acc, [keys.join('/')]: value })
    const tree = { a: { b: 1, c: 2, d: { e: 3 } } }
    const actual = reduceTree({}, concatKeys, tree)
    assertEquals(expected, actual)
})