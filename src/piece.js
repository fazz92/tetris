import Pieces from './pieces'
import { empty, square, getElement } from './constants'

class Piece extends Pieces {
  constructor (config = {}) {
    super(config)

    this.init(this.getRandomPiece())
  }

  init ({ component, color }) {
    this.dimension = component.length
    this.x = Math.floor((this.columns / 2) - (this.dimension / 2))
    this.y = -2
    this.component = component
    this.color = color

    this.nextComponent = this.getRandomPiece()
    this.updateNextComponent()
  }

  updateNextComponent () {
    if (this.nextComponent) {
      getElement('#next-tile').innerText = this.nextComponent.name
    }
  }

  fill (color) {
    for (let row = 0; row < this.dimension; row++) {
      for (let column = 0; column < this.dimension; column++) {
        if (this.component[row][column]) {
          square({
            x: this.x + column,
            y: this.y + row,
            size: this.size,
            color,
            context: this.context
          })
        }
      }
    }
  }

  drawPiece () {
    this.fill(this.color)
  }

  undrawPiece () {
    this.fill(empty)
  }

  left () {
    if (!this.boundary(-1, 0, this.component)) {
      this.undrawPiece()
      this.x--
      this.drawPiece()
    }
  }

  right () {
    if (!this.boundary(1, 0, this.component)) {
      this.undrawPiece()
      this.x++
      this.drawPiece()
    }
  }

  down () {
    if (!this.boundary(0, 1, this.component)) {
      this.undrawPiece()
      this.y++
      this.drawPiece()
    } else {
      this.placeOnBoard()
      this.init(this.nextComponent)
    }
  }

  getNextPattern (clockWise = false) {
    const transformedPattern = []
    const currentDimension = this.dimension

    for (let row = 0; row < currentDimension; row++) {
      transformedPattern[row] = transformedPattern[row] || (new Array(currentDimension).fill(0))

      for (let column = 0; column < currentDimension; column++) {
        transformedPattern[row][column] = clockWise ? this.component[currentDimension - 1 - column][row] : this.component[column][currentDimension - 1 - row]
      }
    }

    return transformedPattern
  }

  correction () {
    const elementCenter = this.x + Math.floor(this.dimension / 2)
    this.offset = 0

    if (elementCenter === this.columns - 1) {
      this.offset = -1
    } else if (elementCenter === 0) {
      this.offset = 1
    }
  }

  rotateAntiClockWise () {
    const nextPattern = this.getNextPattern()

    this.correction()
    if (!this.boundary(this.offset, 0, nextPattern)) {
      this.undrawPiece()
      this.x += this.offset
      this.component = nextPattern
      this.drawPiece()
    }
  }

  rotateClockWise () {
    const nextPattern = this.getNextPattern(true)

    this.correction()

    if (!this.boundary(this.offset, 0, nextPattern)) {
      this.undrawPiece()
      this.x += this.offset
      this.component = nextPattern
      this.drawPiece()
    }
  }

  placeOnBoard () {
    for (let row = 0; row < this.dimension; row++) {
      for (let column = 0; column < this.dimension; column++) {
        if (this.component[row][column]) {
          const translatedX = this.x + column
          const translatedY = this.y + row

          if (translatedY < 0) {
            this.setGameOver(true)
            break
          }

          this.setBoard(translatedY, translatedX, this.color)
        }
      }
    }

    this.updateBoard()
  }

  boundary (x, y, component) {
    const board = this.getBoard()

    for (let row = 0; row < this.dimension; row++) {
      for (let column = 0; column < this.dimension; column++) {

        if (component[row][column]) {
          const translatedX = this.x + column + x
          const translatedY = this.y + row + y

          if (translatedY < 0) {
            continue
          }

          if (translatedY >= this.rows || translatedX >= this.columns || translatedX < 0) {
            return true
          }

          if (board[translatedY][translatedX] !== empty) {
            return true
          } 
        }
      }
    }

    return false
  }
}

export default Piece