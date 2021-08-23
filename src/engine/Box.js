import Shape from './Shape'
import Position from './Position'

export default class Box extends Shape {
  width

  height

  /**
   * Create a new Box object.
   *
   * @constructor
   *
   * @param {string} color The color of the Box.
   */
  constructor(width, height, color, image = null) {
    super(0.6, color, image)
    this.width = width
    this.height = height
  }

  /**
   * Get the frontal area for this Box.
   *
   * @returns {number} The frontal area of this Box.
   */
  get area() {
    return this.width * this.height
  }

  /**
   * Draw this Sphere on the context at the given position.
   *
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    const { context, scale } = scene
    const width = this.width * scale
    const height = this.height * scale
    const halfWidth = width / 2
    const halfHeight = height / 2
    const x = position.x * scale
    const y = position.y * scale
    const corners = [
      new Position(x - halfWidth, y - halfHeight),
      new Position(x + halfWidth, y - halfHeight),
      new Position(x + halfWidth, y + halfHeight),
      new Position(x - halfWidth, y + halfHeight),
    ]
    context.fillStyle = this.color
    context.beginPath()
    context.moveTo(corners[3].x, corners[3].y)
    corners.forEach((cPos) => context.lineTo(cPos.x, cPos.y))
    context.fill()
    context.closePath()
    if (this.image) {
      this.image.width = width
      this.image.height = height
      context.drawImage(
        this.image,
        200,
        45,
        330,
        480,
        corners[0].x,
        corners[0].y,
        width,
        height
      )
    }
  }
}
