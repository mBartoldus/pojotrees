import { PojoTree } from '../PojoTree/PojoTree.ts'
import { mapTree } from '../mapTree/mapTree.ts'

const callFirstArg = (fn: Function, ...args: any[]) => {
    return fn(...args)
}

/**
 *  Calls a tree of functions with provided arguments.
 *  Pojo arguments will be assumed to be trees,
 *  calling leaves of the function-tree with leaves of the argument-trees.
 *  If no equivalent leaf is on the argument-tree, the agument will be ```undefined```.
 *  If the argument-tree ends in a leaf where the function-tree continues as a branch,
 *  that leaf will be passed as an argument to all leaves on that branch.
 * 
 *  @returns { PojoTree }
 *  a new tree whose leaves are the outputs of those function calls.
 *  @example
 *  // returns { a: 20 }
 *  doTree({ a: x => x * 2 }, 10)
 * 
 *  @example
 *  const funcTree = {
 *      a: (x, y) => x + y,
 *      b: (x, y) => x * y
 *  }
 *  const x = { a: 1, b: 2 }
 *  const y = { a: 10, b: 20 }
 * 
 *  //returns { a: 11, b: 40 }
 *  doTree(funcTree, x, y)
 * 
*/
export function doTree(funcTree: PojoTree<Function>, ...args: any[]): PojoTree {
    return mapTree(callFirstArg, funcTree, ...args)
}