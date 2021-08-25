import Shape from './Shape'

export default class Frisbee extends Shape {
  radius

  /**
   * Create a new Frisbee object.
   *
   * @constructor
   *
   * @param {number} radius The radius of the Frisbee (m).
   * @param {string} color The color of the Frisbee.
   */
  constructor({ radius, color, dragCoefficient = 0.08, image = null }) {
    super(dragCoefficient, color, image)
    this.radius = radius
  }

  /**
   * Get the frontal area for this Frisbee.
   *
   * @returns {number} The frontal area of this Frisbee.
   */
  get area() {
    return Math.PI * this.radius ** 2
  }

  /**
   * Draw this Frisbee on the context at the given position.
   *
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    const { context, scale } = scene
    context.fillStyle = this.color
    context.beginPath()
    context.arc(
      position.x * scale,
      position.y * scale,
      this.radius * scale,
      0,
      Math.PI * 2,
      true
    )
    context.fill()
    context.closePath()
  }

  get width() {
    return this.radius * 2
  }

  get height() {
    return this.radius * 2
  }
}
