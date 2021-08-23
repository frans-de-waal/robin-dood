import Vector from './Vector'

export default class Momentum extends Vector {
  /**
   * Get the string representation of this Momentum Vector.
   *
   * @returns {string} The string representation of this Momentum Vector.
   */
  toString() {
    return `Momentum [${this.elements.toString()}]`
  }

  /**
   * Add a Momentum to this Momentum.
   *
   * @param {Momentum} momentum The Momentum to add to this Momentum.
   *
   * @returns {Momentum} The resulting Momentum after adding a Momentum to this Momentum.
   */
  add(momentum) {
    return new Momentum(...super.add(momentum).elements)
  }

  /**
   * Subtract a Momentum from this Momentum.
   *
   * @param {Momentum} momentum The Momentum to subtract from this Momentum.
   *
   * @returns {Momentum} The resulting Momentum after subracting a Momentum from this Momentum.
   */
  subtract(momentum) {
    return new Momentum(...super.subtract(momentum).elements)
  }

  /**
   * Multiply this Momentum's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Momentum} This Momentum multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Momentum(...super.multiply(scalar).elements)
  }
}
