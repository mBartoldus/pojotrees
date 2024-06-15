
import { tryBranches } from './branches.ts'
import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"

Deno.test('tryBranches: should pluck keyed values from plain objects', () => {
    const objs = [
        { a: 0 },
        { a: 1 },
        { a: 2 }
    ]
    const actual = tryBranches('a', ...objs)
    const expected = [0, 1, 2]

    assertEquals(expected, actual)
})

Deno.test('tryBranches: should map non-pojo values unchanged', () => {
    const arbitraryNonPojo = new Set()

    const nonPojos = [0, true, '2', arbitraryNonPojo]
    const actual = tryBranches('a', ...nonPojos)
    const expected = nonPojos

    assertEquals(expected, actual)
})

Deno.test('tryBranches: should map to undefined if keyed value not present in pojo', () => {
    const nums = [{ x: 0 }, { y: 1 }, { z: 1 }]
    const actual = tryBranches('y', ...nums)
    const expected = [undefined, 1, undefined]

    assertEquals(expected, actual)
})