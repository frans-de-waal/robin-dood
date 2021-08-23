import Shape from './Shape'

export default class Sphere extends Shape {
  radius

  /**
   * Create a new Sphere object.
   *
   * @constructor
   *
   * @param {number} radius The radius of the Sphere (m).
   * @param {string} color The color of the Sphere.
   */
  constructor(radius, color, image = null) {
    super(0.47, color, image)
    this.radius = radius
  }

  /**
   * Get the frontal area for this Sphere.
   *
   * @returns {number} The frontal area of this Sphere.
   */
  get area() {
    return Math.PI * this.radius ** 2
  }

  /**
   * Draw this Sphere on the context at the given position.
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
