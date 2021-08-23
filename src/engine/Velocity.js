import Vector from './Vector'

export default class Velocity extends Vector {
  /**
   * Get the string representation of this Velocity Vector.
   *
   * @returns {string} The string representation of this Velocity Vector.
   */
  toString() {
    return `Velocity [${this.elements.toString()}]`
  }

  /**
   * Add a Velocity to this Velocity.
   *
   * @param {Velocity} velocity The Velocity to add to this Velocity.
   *
   * @returns {Velocity} The resulting Velocity after adding a Velocity to this Velocity.
   */
  add(velocity) {
    return new Velocity(...super.add(velocity).elements)
  }

  /**
   * Subtract a Velocity from this Velocity.
   *
   * @param {Velocity} velocity The Velocity to subtract from this Velocity.
   *
   * @returns {Velocity} The resulting Velocity after subracting a Velocity from this Velocity.
   */
  subtract(velocity) {
    return new Velocity(...super.subtract(velocity).elements)
  }

  /**
   * Multiply this Velocity's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Velocity} This Velocity multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Velocity(...super.multiply(scalar).elements)
  }
}
