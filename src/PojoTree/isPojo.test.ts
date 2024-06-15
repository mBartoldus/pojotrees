import { isPojo } from './isPojo.ts'

Deno.test("isPojo: should return true for a plain-ol'-javascript-object", () => {
    const pojo = {}
    if (!isPojo(pojo)) throw 'how did i mess this one up'
})

function assertNotPojo(value: any) { if (isPojo(value)) throw 'false positive'}

Deno.test('isPojo: should return false for non-object primitives', () => {
    const nonObjects = ['string', true, 12345, /./]
    nonObjects.forEach(assertNotPojo)
})

Deno.test('isPojo: should return false for arrays and class instances', () => {
    const nonPojoObjs = [[], new Set(), new WeakMap(), new Float32Array()]
    nonPojoObjs.forEach(assertNotPojo)
})