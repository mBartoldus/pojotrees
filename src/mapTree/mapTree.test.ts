import { mapTree } from './mapTree.ts'
import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts"

Deno.test('mapTree: map values by a given function', () => {
    const initialValues = {
        a: 1,
        subtree: { b: 2 }
    }

    const double = (n: number) => n * 2
    const actual = mapTree(double, initialValues)

    const expected = {
        a: 2,
        subtree: { b: 4 }
    }

    assertEquals(expected, actual)
})

// Deno.test('mapTree: pass rest arguments to callback', () => {
//     const initialValues = {
//         a: 1,
//         subtree: { b: 2 }
//     }

//     const multiply = (x: number, y: number) => x * y
//     const actual = mapTree(multiply, initialValues, 2)

//     const expected = {
//         a: 2,
//         subtree: { b: 4 }
//     }

//     assertEquals(expected, actual)
// })

// Deno.test('mapTree: pass pojo arguments unchanged', () => {
//     const tree1 = {
//         a: 'friend',
//         subtree: { b: 'enemy' }
//     }

//     const prependGreeting = (name: string, greeter: Record<string, string>) => greeter.greeting + name
//     const actual = mapTree(prependGreeting, tree1, { greeting: 'hello, ' })

//     const expected = {
//         a: 'hello, friend',
//         subtree: { b: 'hello, enemy' }
//     }

//     assertEquals(expected, actual)
// })

Deno.test('mapTree: traverse pojotree arguments', () => {

    const inhabitantNames = {
        a: 'earthlings',
        subtree: { b: 'martians' }
    }

    const planets = {
        a: 'earth',
        subtree: { b: 'mars' }
    }

    const areFrom = (inhabitantName: string, planet: string) => inhabitantName + ' are from ' + planet
    const actual = mapTree(areFrom, inhabitantNames, planets)

    const expected = {
        a: 'earthlings are from earth',
        subtree: { b: 'martians are from mars' }
    }

    assertEquals(expected, actual)
})