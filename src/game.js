import {
  Acceleration,
  Particle,
  Position,
  Scene,
  Sphere,
  Vector,
  Velocity,
  oneDimensionalCollision,
  randomColor,
} from './engine'

let scene = null

const INITIAL_STATE = () => [
  new Particle(
    10,
    new Sphere(0.5, randomColor()),
    new Position(1, 1),
    new Velocity(4, 0)
  ),
  new Particle(
    0.4,
    new Sphere(0.2, randomColor()),
    new Position(6, 1),
    new Velocity(-4, 0)
  ),
]

export function setup() {
  const bounciness = 0.95
  const density = 1.2
  let mouse = new Position(0, 0)
  let mouseStart = new Position(0, 0)
  let dragging = false
  const gravity = new Acceleration(0, 9.81)
  scene = new Scene('canvas')
  scene.delta = 0.01 // seconds per tick
  scene.scale = 100 // pixels per meter
  scene.entities = INITIAL_STATE()

  scene.progressEntity = (entity, index) => {
    // forces
    const totalForce = entity.drag(density)
    // acceleration
    const a = totalForce.multiply(1 / entity.mass).add(gravity)
    // change in velocity
    const dV = a.multiply(scene.delta)
    // new velocity
    entity.velocity = entity.velocity.add(dV)
    // change in position
    const dP = entity.velocity.multiply(scene.delta)
    // new position
    entity.position = entity.position.add(dP)

    // detect collision with the sides of the box
    if (
      entity.position.y - entity.shape.radius <= 0 ||
      entity.position.y + entity.shape.radius >= scene.height / scene.scale
    ) {
      entity.velocity = new Velocity(
        entity.velocity.x,
        entity.velocity.y * -1 * bounciness
      )
      if (
        entity.position.y + entity.shape.radius >=
        scene.height / scene.scale
      ) {
        entity.position = new Position(
          entity.position.x,
          scene.height / scene.scale - entity.shape.radius
        )
      } else {
        entity.position = new Position(
          entity.position.x,
          0 + entity.shape.radius
        )
      }
    }
    if (
      entity.position.x - entity.shape.radius <= 0 ||
      entity.position.x + entity.shape.radius >= scene.width / scene.scale
    ) {
      entity.velocity = new Velocity(
        entity.velocity.x * -1 * bounciness,
        entity.velocity.y
      )
      if (
        entity.position.x + entity.shape.radius >=
        scene.width / scene.scale
      ) {
        entity.position = new Position(
          scene.width / scene.scale - entity.shape.radius,
          entity.position.y
        )
      } else {
        entity.position = new Position(
          0 + entity.shape.radius,
          entity.position.y
        )
      }
    }

    // detect collisions with other balls
    const otherEntities = [...scene.entities]
    otherEntities.splice(index, 1)
    otherEntities.forEach((collisionEntity) => {
      const relation = collisionEntity.position.subtract(entity.position)
      const n = relation.normal
      const distance = relation.size
      const overlap =
        entity.shape.radius + collisionEntity.shape.radius - distance
      if (overlap >= 0) {
        // scene.stop();

        // move to initial touch positions
        collisionEntity.position = collisionEntity.position.add(
          n.multiply(overlap / 2)
        )
        entity.position = entity.position.subtract(n.multiply(overlap / 2))

        /**
         * Resolve the collisions
         * @see https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf
         */

        // find the collision surface normal and tangent unit vectors
        const t = new Vector(-n.y, n.x)

        // find the normal and tangent components of the two entity velocities before collision
        const vi1 = entity.velocity
        const vi2 = collisionEntity.velocity
        const vi1n = vi1.dot(n)
        const vi1t = vi1.dot(t)
        const vi2n = vi2.dot(n)
        const vi2t = vi2.dot(t)

        // find the new tengential velocities after collision
        const vp1t = vi1t
        const vp2t = vi2t

        // find the new normal velocities after collision
        const vp1n =
          oneDimensionalCollision(
            vi1n,
            vi2n,
            entity.mass,
            collisionEntity.mass
          ) * bounciness
        const vp2n =
          oneDimensionalCollision(
            vi2n,
            vi1n,
            collisionEntity.mass,
            entity.mass
          ) * bounciness

        // convert the scalar normal and tangent (post collision) velocities to vectors
        const vp1nVector = n.multiply(vp1n)
        const vp1tVector = t.multiply(vp1t)
        const vp2nVector = n.multiply(vp2n)
        const vp2tVector = t.multiply(vp2t)

        // final velocities for each entity
        entity.velocity = vp1nVector.add(vp1tVector)
        collisionEntity.velocity = vp2nVector.add(vp2tVector)
      }
    })
  }

  scene.draw = () => {
    scene.drawGrid()
    scene.entities.forEach((entity) => {
      entity.draw(scene)
      scene.drawVector(entity.velocity.multiply(0.5), entity.position, 'red')
    })
    scene.drawScale()
  }

  scene.canvas.addEventListener('mousemove', (event) => {
    const canvasRect = scene.canvas.getBoundingClientRect()
    mouse = new Position(
      event.clientX - canvasRect.left,
      event.clientY - canvasRect.top
    )
  })
  scene.canvas.addEventListener('mousedown', (event) => {
    const canvasRect = scene.canvas.getBoundingClientRect()
    mouseStart = new Position(
      event.clientX - canvasRect.left,
      event.clientY - canvasRect.top
    )
    dragging = true
  })
  scene.canvas.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false
      const radius = Math.random() * 0.3 + 0.2
      const mass = (4 / 3) * Math.PI * radius ** 3 * 4
      scene.entities.push(
        new Particle(
          mass,
          new Sphere(radius, randomColor()),
          mouseStart.multiply(1 / scene.scale),
          mouse.subtract(mouseStart).multiply(10 / scene.scale)
        )
      )
    }
  })
}

export function start() {
  scene.start()
}

export function stop() {
  scene.stop()
}

export function reset() {
  scene.stop()
  scene.entities = INITIAL_STATE()
  scene.clear()
  scene.draw()
}
