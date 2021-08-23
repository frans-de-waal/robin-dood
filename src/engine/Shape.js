export default class Shape {
  dragCoefficient

  color

  image

  /**
   * Create a new Shape object.
   *
   * @constructor
   *
   * @param {number} dragCoefficient The drag coefficient of the Shape.
   * @param {string} color The color of the Shape.
   */
  constructor(dragCoefficient, color, image = null) {
    this.dragCoefficient = dragCoefficient
    this.color = color
    this.image = image
  }
}
