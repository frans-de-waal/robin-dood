/**
 * An n-dimensional vector.
 *
 * An 2 or more dimensional vector with various operations.
 *
 * @class Vector
 */
export default class Vector {
  elements = []

  /**
   * Create a new Vector object.
   *
   * Create and initialise a new Vector by defining it's elements.
   *
   * @constructor
   *
   * @param {...number} elements The elements of the Vector.
   */
  constructor(...elements) {
    this.elements = elements
  }

  /**
   * Calculate the determinant for two Vectors.
   *
   * @static
   *
   * @param {Vector} a The first Vector.
   * @param {Vector} b The second Vector.
   *
   * @returns {number} The determinant of the two vectors.
   */
  static determinant(a, b) {
    return a.x * b.y - a.y * b.x
  }

  /**
   * Add a Vector to this Vector.
   *
   * @param {Vector} vector The Vector to add to this Vector.
   *
   * @returns {Vector} The resulting Vector after adding a Vector to this Vector.
   */
  add(vector) {
    return new Vector(
      ...this.elements.map((element, index) => element + vector.elements[index])
    )
  }

  /**
   * Subtract a Vector from this Vector.
   *
   * @param {Vector} vector The Vector to subtract from this Vector.
   *
   * @returns {Vector} The resulting Vector after subracting a Vector from this Vector.
   */
  subtract(vector) {
    return new Vector(
      ...this.elements.map((element, index) => element - vector.elements[index])
    )
  }

  /**
   * Multiply this Vector's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Vector} This Vector multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Vector(...this.elements.map((element) => element * scalar))
  }

  /**
   * Calculate the dot product of this Vector and another Vector.
   *
   * @param {Vector} vector The other Vector.
   *
   * @returns {number} The dot product of this Vector and another Vector.
   */
  dot(vector) {
    return this.elements.reduce(
      (carry, element, index) => carry + element * vector.elements[index],
      0
    )
  }

  /**
   * Calculate the cross product of this Vector and another Vector.
   *
   * @param {Vector} vector The other Vector.
   *
   * @returns {Vector} The cross product of this Vector and another Vector.
   */
  cross(vector) {
    const a = this.elements
    const b = vector.elements
    return new Vector(
      Vector.determinant([a[1], a[2]], [b[1], b[2]]),
      -Vector.determinant([a[0], a[2]], [b[0], b[2]]),
      Vector.determinant([a[0], a[1]], [b[0], b[1]])
    )
  }

  /**
   * Get the string representation of this Vector.
   *
   * @returns {string} The string representation of this Vector.
   */
  toString() {
    return `Vector: [${this.elements.toString()}]`
  }

  /**
   * Get the size of this Vector.
   *
   * @returns {number} The size of this Vector.
   */
  get size() {
    return Math.sqrt(
      this.elements.reduce((total, element) => total + element ** 2, 0)
    )
  }

  /**
   * Get the X value of this Vector.
   *
   * @returns {number} The X value of this Vector.
   */
  get x() {
    return this.elements[0]
  }

  /**
   * Get the Y value of this Vector.
   *
   * @returns {number} The Y value of this Vector.
   */
  get y() {
    return this.elements[1]
  }

  /**
   * Get the Z value of this Vector.
   *
   * @returns {number} The Z value of this Vector.
   */
  get z() {
    return this.elements[2]
  }

  /**
   * Get the normal Vector of this Vector.
   *
   * @returns {Vector} The normal Vector of this Vector.
   */
  get normal() {
    if (this.size === 0 || this.size === 1) {
      return this
    }
    return this.multiply(1 / this.size)
  }

  /**
   * Rise this Vector's size to the power.
   *
   * @param {number} power The power to rise this Vector's size.
   *
   * @returns {Vector} This Vector with its size risen to the power.
   */
  power(power) {
    return this.normal.multiply(this.size ** power)
  }
}
