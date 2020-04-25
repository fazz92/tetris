export const levelGameSpeedMapping = {
  'I': 1000,
  'II': 900,
  'III': 700,
  'IV': 500,
  'V': 300
}

export const PIECE_O = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]

export const PIECE_Z = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 1, 1]
]

export const PIECE_S = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0]
]

export const PIECE_T = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0]
]

export const PIECE_L = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 0]
]

export const PIECE_J = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 0]
]

export const PIECE_I = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
]

export const empty = 'white'

export const square = ({ x, y, size, color, stroke = 'black', context }) => {
  context.fillStyle = color
  context.fillRect(x * size, y * size, size, size)
  context.strokeStyle = stroke
  context.strokeRect(x * size, y * size, size, size)
}

export const getElement = (selector) => {
  return document.querySelectorAll(selector)[0]
}
