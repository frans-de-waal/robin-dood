import Position from './Position'
import { id, KEY_CODES } from './Utils'
import Velocity from './Velocity'

/**
 * A controlled entity.
 *
 * @class
 */
export default class Actor {
  id

  shape

  position

  speed

  controls

  activeControls

  constructor({ shape, position = new Position(0, 0), speed = 5 }) {
    this.id = id()
    this.shape = shape
    this.position = position
    this.speed = speed
    this.controls = [
      {
        key: KEY_CODES.KEY_W,
        effect: new Velocity(0, -1),
      },
      {
        key: KEY_CODES.KEY_A,
        effect: new Velocity(-1, 0),
      },
      {
        key: KEY_CODES.KEY_S,
        effect: new Velocity(0, 1),
      },
      {
        key: KEY_CODES.KEY_D,
        effect: new Velocity(1, 0),
      },
    ]
    this.activeControls = new Set()
    this.registerControls()
  }

  /**
   * Get the total velocity based on controller inputs
   *
   * @returns {Velocity}
   */
  get velocity() {
    const velocity = Array.from(this.activeControls).reduce(
      (totalVelocity, key) => {
        const control = this.controls.find(
          ({ key: controlKey }) => `${controlKey}` === `${key}`
        )
        return totalVelocity.add(control.effect)
      },
      new Velocity(0, 0)
    )
    return velocity.normal.multiply(this.speed)
  }

  registerControls() {
    this.controls.forEach(({ key }) => {
      window.addEventListener('keydown', ({ keyCode }) => {
        if (`${keyCode}` === `${key}`) {
          if (!this.activeControls.has(key)) {
            this.activeControls.add(key)
          }
        }
      })

      window.addEventListener('keyup', ({ keyCode }) => {
        if (`${keyCode}` === `${key}`) {
          if (this.activeControls.has(key)) {
            this.activeControls.delete(key)
          }
        }
      })
    })
  }

  progress(delta) {
    // change in position
    const dP = this.velocity.multiply(delta)
    // new position
    this.position = this.position.add(dP)
  }

  /**
   * Draw this Particle on a scene.
   *
   * @param {Scene} scene The Scene to draw this Particle's shape on.
   */
  draw(scene) {
    this.shape.draw(scene, this.position)
  }
}
