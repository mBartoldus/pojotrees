/**
 *  Pojo == Plain-Ol'-Javascript-Object
 * 
 *  PojoTree == nested object literal
 * 
 *  Properties with ```Object``` as a constructor are also pojos, and therefore are "branches".
 * 
 *  Numbers, strings, arrays, instances of other classes, etc. are "leaves".
 * 
 */

export interface PojoTree<LeafType = any> { [k: string]: LeafType | PojoTree<LeafType> }