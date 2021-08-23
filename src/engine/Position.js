import Vector from './Vector'

export default class Position extends Vector {
  /**
   * Get the string representation of this Position Vector.
   *
   * @returns {string} The string representation of this Position Vector.
   */
  toString() {
    return `Position [${this.elements.toString()}]`
  }

  /**
   * Add a Position to this Position.
   *
   * @param {Position} position The Position to add to this Position.
   *
   * @returns {Position} The resulting Position after adding a Position to this Position.
   */
  add(position) {
    return new Position(...super.add(position).elements)
  }

  /**
   * Subtract a Position from this Position.
   *
   * @param {Position} position The Position to subtract from this Position.
   *
   * @returns {Position} The resulting Position after subracting a Position from this Position.
   */
  subtract(position) {
    return new Position(...super.subtract(position).elements)
  }

  /**
   * Multiply this Position's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Position} This Position multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Position(...super.multiply(scalar).elements)
  }
}
