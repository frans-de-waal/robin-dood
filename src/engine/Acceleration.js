import Vector from './Vector'

export default class Acceleration extends Vector {
  /**
   * Get the string representation of this Acceleration Vector.
   *
   * @returns {string} The string representation of this Acceleration Vector.
   */
  toString() {
    return `Acceleration [${this.elements.toString()}]`
  }

  /**
   * Add a Acceleration to this Acceleration.
   *
   * @param {Acceleration} acceleration The Acceleration to add to this Acceleration.
   *
   * @returns {Acceleration} The resulting Acceleration after adding a Acceleration to this Acceleration.
   */
  add(acceleration) {
    return new Acceleration(...super.add(acceleration).elements)
  }

  /**
   * Subtract a Acceleration from this Acceleration.
   *
   * @param {Acceleration} acceleration The Acceleration to subtract from this Acceleration.
   *
   * @returns {Acceleration} The resulting Acceleration after subracting a Acceleration from this Acceleration.
   */
  subtract(acceleration) {
    return new Acceleration(...super.subtract(acceleration).elements)
  }

  /**
   * Multiply this Acceleration's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Acceleration} This Acceleration multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Acceleration(...super.multiply(scalar).elements)
  }
}
