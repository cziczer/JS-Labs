
/**
 * Module summing 2 numers, x and y from Operation class
 */

/** class representing 2 numbers
 * @constructor
 */
class Operation {
    /**
     * constructor 
     * @param  x is first number
     * @param  y is second number
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
      * @desc Summs two nymber
      * @param x first number
      * @param  y second number
      * @returns {number} Sum of x and y
      */
    sum() {
        return this.x + this.y;
  }
}

export { Operation }