import Board from './board'
import Piece from './piece'
import { getElement } from './constants'

function init () {
  modal()
}

let gameConfig = {}

function initGame () {
  let start = Date.now()
  let board = new Board(gameConfig)
  board.drawBoard()

  let piece = new Piece({ board })
  const keyHandler = (event) => {
    if (board.paused && event.keyCode != 13) {
      return
    }

    switch (event.keyCode) {
      case 40:
        piece.down()
        start = Date.now()
        break

      case 39:
        piece.right()
        break

      case 37:
        piece.left()
        break

      case 65:
        piece.rotateAntiClockWise()
        break

      case 68:
        piece.rotateClockWise()
        break

      case 13:
        board.togglePauseResume()
        break
    }
  }

  document.removeEventListener('keydown', keyHandler)
  document.addEventListener('keydown', keyHandler)

  const loop = () => {
    if (!board.paused && (Date.now() - start > board.gameSpeed)) {
      piece.down()
      start = Date.now()
    }

    if (!board.gameOver) {
      window.requestAnimationFrame(loop)
    } else {
      board = null
      piece = null
      getElement('#game-over').classList.remove('hide')
    }
  }

  loop()
}

function configurationHandler () {
  const rows = Number(getElement('#rows').value)
  const columns = Number(getElement('#columns').value)
  const level = getElement('#difficulty-level').value
  const errorContainer = getElement('#error')

  if (!rows || !columns || !level) {
    errorContainer.innerText = 'All fields are required'
    return
  } else if (rows < 4 || columns < 4) {
    errorContainer.innerText = 'Make Sure it is atleast 4 X 4 grid'
    return
  }

  errorContainer.innerText = ''

  getElement('#start-modal').classList.add('hide')
  gameConfig = {
    rows,
    columns,
    level
  }

  initGame()
}

function restartGameHandler () {
  getElement('#game-over').classList.add('hide')
  initGame()
}

function modal () {
  getElement('#start-game').addEventListener('click', configurationHandler)
  getElement('#play-again').addEventListener('click', restartGameHandler)
}

init()