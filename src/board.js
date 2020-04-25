import { empty, levelGameSpeedMapping, square, getElement } from './constants'

class Board {
  static defaultConfig = {
    rows: 20,
    columns: 10,
    size: 25,
    vacant: empty,
    stroke: 'black',
    gameOver: false,
    gameSpeed: 1000
  }

  constructor (config = {}) {
    const { rows, columns, vacant, size, gameOver, level } = {...Board.defaultConfig, ...config}

    this.rows = rows
    this.columns = columns
    this.vacant = vacant
    this.size = size
    this.gameOver = gameOver
    this.score = 0
    this.paused = false
    this.gameSpeed = this.getGameSpeed(level)

    const canvasEle = getElement('#tetris-game')
    canvasEle.width = columns * size
    canvasEle.height = rows * size

    this.context = canvasEle.getContext('2d')
    this.board = this.constructBoard()
  }

  constructBoard () {
    const board = []
    for (let row = 0; row < this.rows; row++) {
      board[row] = []
      for (let column = 0; column < this.columns; column++) {
        board[row][column] = this.vacant
      }
    }

    return board
  }

  drawBoard () {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        square({
          x: column,
          y: row,
          color: this.board[row][column],
          context: this.context,
          size: this.size
        })
      }
    }
  }

  updateBoard = () => {
    for (let row = 0; row < this.rows; row++) {
      if (this.board[row].every(value => value !== empty)) {
        this.board.splice(row, 1)
        this.updateScore()
        this.board.unshift(new Array(this.columns).fill(empty))
      }
    }

    this.drawBoard()
  }

  getGameSpeed (level) {
    getElement('#current-level').innerText = level

    return levelGameSpeedMapping[level]
  }

  togglePauseResume () {
    this.paused = !this.paused

    getElement('#game-paused').classList[this.paused ? 'remove' : 'add']('hide')
  }

  updateScore () {
    this.score +=1
    getElement('#current-score').innerText = this.score
  }

  getBoard = () => {
    return this.board
  }

  setBoard = (x, y, value) => {
    this.board[x][y] = value
  }

  setGameOver = flag => {
    this.gameOver = flag
  }
}

export default Board
