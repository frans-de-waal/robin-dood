import Position from './Position'
import Velocity from './Velocity'
import Force from './Force'
import { id } from './Utils'

/**
 * A 2D particle object with mass, shape, position and velocity.
 *
 * @class
 */
export default class Particle {
  id

  mass

  shape

  position

  velocity

  fixed = false

  /**
   * Create and initialise a new Particle by defining it's mass and shape,
   * and optionally it's initial position and velocity.
   *
   * @constructor
   *
   * @param {number} mass Mass of the Particle (kg).
   * @param {Shape} shape The shape of the Particle.
   * @param {Position} position Initial position of the Particle.
   * @param {Velocity} velocity Initial velocity of the Particle.
   * @param {boolean} fixed Whether the Particle can move or not.
   */
  constructor({
    mass,
    shape,
    position = new Position(0, 0),
    velocity = new Velocity(0, 0),
    fixed = false,
  }) {
    this.id = id()
    this.mass = mass
    this.shape = shape
    this.position = position
    this.velocity = velocity
    this.fixed = fixed
  }

  /**
   * Return a string representation of properties of a Particle.
   *
   * @returns {string} String representation of properties of a Particle
   */
  toString() {
    return JSON.stringify({
      mass: this.mass,
      shape: this.shape,
      position: `${this.position}`,
      velocity: `${this.velocity}`,
    })
  }

  /**
   * Calculate the drag of this Particle.
   *
   * @see https://en.wikipedia.org/wiki/Drag_equation
   *
   * @param {number} density The density of the scene material.
   * @returns {Force} The drag force for this Particle in the given scene material.
   */
  drag = (density) => {
    const vector = this.velocity
      .power(2)
      .multiply(-0.5 * density * this.shape.dragCoefficient * this.shape.area)
    return new Force(vector.x, vector.y)
  }

  /**
   * Draw this Particle on a scene.
   *
   * @param {Scene} scene The Scene to draw this Particle's shape on.
   */
  draw(scene) {
    this.shape.draw(scene, this.position)
  }

  /**
   * Get the kinetic energy (J) for this Particle, given it's mass (kg) and velocity (m/s).
   *
   * @see https://en.wikipedia.org/wiki/Kinetic_energy
   *
   * @returns {number} The kinetic energy for this particle (J)
   */
  get kineticEnergy() {
    return 0.5 * this.mass * this.velocity.size ** 2
  }

  /**
   * Get the momentum  for this Particle, given it's mass (kg) and velocity (m/s).
   *
   * @see https://en.wikipedia.org/wiki/Momentum
   *
   * @returns {Momentum} The Momentum Vector for this particle (kg*m/s).
   */
  // get momentum() { // TODO
  //   return null
  // }

  /**
   *
   */
  get left() {
    return this.position.x - this.shape.width / 2
  }

  /**
   *
   */
  get top() {
    return this.position.y - this.shape.height / 2
  }

  /**
   *
   */
  get right() {
    return this.position.x + this.shape.width / 2
  }

  /**
   *
   */
  get bottom() {
    return this.position.y + this.shape.height / 2
  }

  /**
   *
   */
  get topLeft() {
    return new Position(this.left, this.top)
  }

  /**
   *
   */
  get topRight() {
    return new Position(this.right, this.top)
  }

  /**
   *
   */
  get bottomLeft() {
    return new Position(this.left, this.bottom)
  }

  /**
   *
   */
  get bottomRight() {
    return new Position(this.right, this.bottom)
  }

  /**
   *
   */
  get corners() {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft]
  }
}
