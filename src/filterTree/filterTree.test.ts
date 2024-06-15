import { filterTree } from './filterTree.ts'
import { assertEquals } from 'https://deno.land/std@0.209.0/assert/mod.ts'

Deno.test('filterTree: should return a copy of tree with filtered leaves', () => {
    const tree = {
        a: 1,
        b: {
            c: 100,
            d: 2
        }
    }
    const actual = filterTree(n => n < 100, tree)
    const expected = { a: 1, b: { d: 2 } }
    assertEquals(actual, expected)
})

Deno.test('filterTree: should remove unnecessary branches', () => {
    const tree = {
        a: 1,
        b: {
            c: 100,
        }
    }
    const actual = filterTree(n => n < 100, tree)
    const expected = { a: 1 }
    assertEquals(actual, expected)
})

Deno.test('filterTree: should return non-pojos unfiltered', () => {
    const array = [0, 1, 2]
    const actual = filterTree(n => n < 2, array)
    assertEquals(actual, [0, 1, 2])
})