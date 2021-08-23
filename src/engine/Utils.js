export function randomColor(transparency = 'FF') {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}${transparency}`
}

export function id() {
  return Math.random().toString(36).substr(2, 9)
}

export function oneDimensionalCollision(v1, v2, m1, m2) {
  return (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2)
}
