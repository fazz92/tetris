import { PIECE_O, PIECE_I, PIECE_J, PIECE_T, PIECE_S, PIECE_Z, PIECE_L, getElement } from './constants'

class Pieces {
  static defaultConfig = {
    size: 25,
    pieces: {
      O: {
        name: 'O',
        color: 'red',
        component: PIECE_O
      },
      I: {
        name: 'I',
        color: 'blue',
        component: PIECE_I
      },
      J: {
        name: 'J',
        color: 'green',
        component: PIECE_J
      },
      T: {
        name: 'T',
        color: 'yellow',
        component: PIECE_T
      },
      S: {
        name: 'S',
        color: 'orange',
        component: PIECE_S
      },
      Z: {
        name: 'Z',
        color: 'magenta',
        component: PIECE_Z
      },
      L: {
        name: 'L',
        color: 'aqua',
        component: PIECE_L
      }
    }
  }

  constructor (config = {}) {
    const { size, pieces, board } = {...Pieces.defaultConfig, ...config}

    const canvasEle = getElement('#tetris-game')
    this.context = canvasEle.getContext('2d')
    this.size = size
    this.pieces = pieces
    this.setBoardApisAndConfigs(board)
  }

  setBoardApisAndConfigs (board) {
    this.getBoard = board.getBoard
    this.setBoard = board.setBoard
    this.setGameOver = board.setGameOver
    this.updateBoard = board.updateBoard

    this.rows = board.rows
    this.columns = board.columns
  }

  getRandomPiece () {
    const keys = Object.keys(this.pieces)
    const random = Math.floor(Math.random() * keys.length)
    
    return this.pieces[keys[random]]
  }
}

export default Pieces
