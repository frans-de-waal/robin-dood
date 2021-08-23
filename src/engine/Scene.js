import Force from './Force'
import Acceleration from './Acceleration'

export default class Scene {
  canvas

  context

  width = 0

  height = 0

  delta = 0.02

  progressEntity = (entity) => {
    // forces
    const totalForce = new Force(0, 0)
    // acceleration
    const a = totalForce
      .multiply(1 / entity.mass)
      // assume gravity
      .add(new Acceleration(0, 9.81))
    // change in velocity
    const dV = a.multiply(this.delta)
    // new velocity
    entity.velocity = entity.velocity.add(dV)
    // change in position
    const dP = entity.velocity.multiply(this.delta)
    // new position
    entity.position = entity.position.add(dP)
  }

  entities = []

  drawInterval

  scale = 50 // pixels per meter

  gridSize = 1 // meters

  constructor(id) {
    this.canvas = document.getElementById(id)
    this.context = this.canvas.getContext('2d')
    this.width = this.canvas.getAttribute('width')
    this.height = this.canvas.getAttribute('height')
  }

  drawGrid = () => {
    const { context, width, height, scale, gridSize } = this
    const size = gridSize * scale // pixels
    context.beginPath()
    for (let x = size; x <= width; x += size) {
      context.moveTo(x, 0)
      context.lineTo(x, height)
    }
    for (let x = size; x <= height; x += size) {
      context.moveTo(0, x)
      context.lineTo(width, x)
    }
    context.strokeStyle = '#DDD'
    context.stroke()
  }

  drawScale = () => {
    const { context, height, scale, gridSize } = this
    const size = gridSize * scale // pixels
    const color = '#E0E'
    // line
    context.beginPath()
    context.moveTo(size, height - 30)
    context.lineTo(size, height - 20)
    context.lineTo(size * 2, height - 20)
    context.lineTo(size * 2, height - 30)
    context.strokeStyle = color
    context.stroke()
    // text
    context.fillStyle = color
    context.font = `18px 'Noto Sans', sans-serif`
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText(`${gridSize} m`, size * 1.5, height - 30)
  }

  drawVector(vector, position, color = 'blue') {
    const headlen = vector.size * 0.25 * this.scale
    const end = position.add(vector)
    const fromx = position.x * this.scale
    const fromy = position.y * this.scale
    const tox = end.x * this.scale
    const toy = end.y * this.scale
    const dx = tox - fromx
    const dy = toy - fromy
    const angle = Math.atan2(dy, dx)
    this.context.strokeStyle = color
    this.context.beginPath()
    this.context.moveTo(fromx, fromy)
    this.context.lineTo(tox, toy)
    this.context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    )
    this.context.moveTo(tox, toy)
    this.context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    )
    this.context.stroke()
  }

  draw = () => {
    const { drawGrid, drawScale, entities } = this
    drawGrid()
    drawScale()
    entities.forEach((entity) => entity.draw(this))
  }

  progress = () => {
    const { entities, progressEntity } = this
    entities.filter((entity) => !entity.fixed).forEach(progressEntity)
  }

  loop = () => {
    const { context, width, height, progress, draw, drawInterval } = this
    try {
      context.clearRect(0, 0, width, height)
      progress()
      draw()
    } catch (error) {
      clearInterval(drawInterval)
      throw error
    }
  }

  clear = () => {
    const { context, width, height } = this
    context.clearRect(0, 0, width, height)
  }

  start = () => {
    this.draw()
    this.drawInterval = setInterval(this.loop, this.delta * 1000)
  }

  stop = () => {
    clearInterval(this.drawInterval)
    this.drawInterval = null
  }
}
