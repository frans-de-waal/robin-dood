import Vector from './Vector'

export default class Force extends Vector {
  /**
   * Get the string representation of this Force Vector.
   *
   * @returns {string} The string representation of this Force Vector.
   */
  toString() {
    return `Force [${this.elements.toString()}]`
  }

  /**
   * Add a Force to this Force.
   *
   * @param {Force} force The Force to add to this Force.
   *
   * @returns {Force} The resulting Force after adding a Force to this Force.
   */
  add(force) {
    return new Force(...super.add(force).elements)
  }

  /**
   * Subtract a Force from this Force.
   *
   * @param {Force} force The Force to subtract from this Force.
   *
   * @returns {Force} The resulting Force after subracting a Force from this Force.
   */
  subtract(force) {
    return new Force(...super.subtract(force).elements)
  }

  /**
   * Multiply this Force's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Force} This Force multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Force(...super.multiply(scalar).elements)
  }
}
