function init() {
  //Q SELECTOR
  const carHorn = document.querySelector('.carHorn')
  const startPopUp = document.querySelector('.start-popup-container')
  const gameOverPopUp = document.querySelector('.gameover-popup-container')
  const winPopUp = document.querySelector('.win-popup-container')
  const startButton = document.querySelector('#start-button')
  const replayButton = document.querySelectorAll('#replay-button')

  //GRID 
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  // LIFE SCORE
  const lives = document.querySelector('.lives-left')
  lives.innerText = 3
  //FROG
  const frogClass = 'frog'
  const frogStartPosition = 94
  let frogCurrentPosition = 94
  //CAR
  const carClass = 'car'
  let carArray = [80, 84, 87]
  //LOG
  const logClass = 'log'
  let logArray = [27, 25, 23, 21]
  //CROC
  const crocClass = 'croc'
  let crocArray = [58, 54, 50]
  //BACKGROUNDS & HOME
  const homeClass = 'home'
  const safeClass = 'safe'
  const riverClass = 'river'
  const obstacleRiverClass = 'obstacleRiver'
  const lilypadClass = 'lily'
  const lilypadArray = [32, 33, 43, 45, 37, 38, 48]
  const rippleClass = 'ripples'
  const rippleArray = [30, 36, 47, 41]


  // FUNCTION TO MAKE GRID AND ADD CLASSES FOR HOME, SAFE SPACES AND RIVER
  function makeGrid() {
    // GRID FORMATION
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i //number of cell is in index
      grid.appendChild(cell)
      cells.push(cell)

      // ADDING BACKGROUND CLASSES
      if (i >= 0 && i <= 9 && i % 3 === 0) {
        cell.classList.add(homeClass)
      } else if (i >= 10 && i <= 19) {
        cell.classList.add(safeClass)
      } else if (i >= 20 && i <= 29) {
        cell.classList.add(obstacleRiverClass)
      } else if (i >= 30 && i <= 49) {
        cell.classList.add(riverClass)
      } else if (i >= 50 && i <= 59) {
        cell.classList.add(obstacleRiverClass)
      } else if (i >= 60 && i <= 79) {
        cell.classList.add(safeClass)
      } else {
        console.log()
      }
    }
  }

  //START FUNCTION: INCLUDES FUNCTIONS FOR GRID, FROG & OBSTACLES WITH SET INTERVAL TIMES
  function startGame() {
    startPopUp.classList.remove('active')
    makeGrid(frogStartPosition)
    addFrog(frogStartPosition)
    addCars()
    addLogs()
    addCrocs()
    addLily()
    addRipple()
    const logTimer = setInterval(moveLogs, 400)
    const carTimer = setInterval(moveCars, 200)
    const crocTimer = setInterval(moveCrocs, 800)
    collision()
  }


  //FUNCTIONS TO ADD & REMOVE FROG, CAR, LOG AND CROC CLASSES (added to html via JS)
  function addFrog(position) {
    cells[position].classList.add(frogClass)
  }
  function removeFrog(position) {
    cells[position].classList.remove(frogClass)
  }
  function addCars() {
    for (let i = 0; i < carArray.length; i++) {
      cells[carArray[i]].classList.add(carClass)
    }
  }
  function removeCars() {
    for (let i = 0; i < carArray.length; i++) {
      cells[carArray[i]].classList.remove(carClass)
    }
  }
  function addLogs() {
    for (let i = 0; i < logArray.length; i++) {
      cells[logArray[i]].classList.add(logClass)
    }
  }
  function removeLogs() {
    for (let i = 0; i < logArray.length; i++) {
      cells[logArray[i]].classList.remove(logClass)
    }
  }
  function addCrocs() {
    for (let i = 0; i < crocArray.length; i++) {
      cells[crocArray[i]].classList.add(crocClass)
    }
  }
  function removeCrocs() {
    for (let i = 0; i < crocArray.length; i++) {
      cells[crocArray[i]].classList.remove(crocClass)
    }
  }
  function addLily() {
    for (let i = 0; i < lilypadArray.length; i++) {
      cells[lilypadArray[i]].classList.add(lilypadClass)
      //remove river
    }
  }
  function addRipple() {
    for (let i = 0; i < rippleArray.length; i++) {
      cells[rippleArray[i]].classList.add(rippleClass)
      //remove river
    }
  }

  //FUNCTION TO MAKE FROG RESPOND TO KEY MOVEMENT BY USER
  function keyMoves(event) {
    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40
    removeFrog(frogCurrentPosition)
    if (key === right && frogCurrentPosition % width !== width - 1) {
      frogCurrentPosition++
    } else if (key === left && frogCurrentPosition % width !== 0) {
      frogCurrentPosition--
    } else if (key === up && frogCurrentPosition >= width) {
      frogCurrentPosition -= width
    } else if (key === down && frogCurrentPosition + width <= cellCount - 1) {
      frogCurrentPosition += width
    } else {
      console.log('not right keys')
    }
    addFrog(frogCurrentPosition)
  }


  //FUNCTIONS FOR OBSTACLE MOVEMENTS
  function moveLogs() {
    removeLogs()
    for (let i = 0; i < logArray.length; i++) {
      if (logArray[i] === 20) {
        logArray[i] = logArray[i] + width
      }
    }
    logArray = logArray.map(log => log - 1)
    addLogs()
    collision()
  }

  function moveCars() {
    removeCars()
    for (let i = 0; i < carArray.length; i++) {
      if (carArray[i] === 80) {
        carArray[i] = carArray[i] + width
      }
    }
    carArray = carArray.map(car => car - 1)
    addCars()
    collision()
  }

  function moveCrocs() {
    removeCrocs()
    for (let i = 0; i < crocArray.length; i++) {
      if (crocArray[i] === 59) {
        crocArray[i] = crocArray[i] - width
      }
    }
    crocArray = crocArray.map(croc => croc + 1)
    addCrocs()
    collision()
  }

  // FUNCTION FOR COLLISION RESPONSES
  //(to make collision code cleaner)
  function collisionResponse() {
    removeFrog(frogCurrentPosition)
    frogCurrentPosition = frogStartPosition
    lives.innerText = (lives.innerText) - 1
    addFrog(frogStartPosition)
    checkGameOver()
  }

  // FUNCTION TO CHECK FOR COLLISIONS 
  function collision() {
    if (cells[frogCurrentPosition].classList.contains('river') &&
      cells[frogCurrentPosition].classList.contains('lily')) {
      console.log('lily safe')
    } else if (cells[frogCurrentPosition].classList.contains('car')) {
      collisionResponse()
      carHorn.play()
      console.log('ran over')
    } else if (cells[frogCurrentPosition].classList.contains('croc')) {
      collisionResponse()
      //add audio
      console.log('youve been eaten')
    } else if (cells[frogCurrentPosition].classList.contains('log')) {
      collisionResponse()
      //add audio
      console.log('battered')
    } else if (cells[frogCurrentPosition].classList.contains('river')) {
      collisionResponse()
      //add audio
      console.log('drowned') 
    } else {
      win()
    }
  }

  //FUNCTION TO REFRESH PAGE EACH TIME REPLAY BUTTON IS CLICKED
  function reloadGame() {
    window.location.reload()
  }

  // FUNCTION TO CHECK LIVES ARE AT 0 -> ENDGAME
  function checkGameOver() {
    if (lives.innerText === '0') {
      gameOverPopUp.classList.add('active')
      console.log('game over')
    } else {
      console.log()
    }
  }

  function win() {
    if (cells[frogCurrentPosition].classList.contains('home')) {
      winPopUp.classList.add('active')
      //pop up you win
    } else {
      console.log()
    }
  }

  // crash css -> gif for each colliion 
  // eventlistener on keyboard to start obstacle movements once space is clicked
  // if frog position === .home position then alert 'you win'

  //GAME STARTS ON BUTTON CLICK
  startButton.addEventListener('click', startGame)

  //GAME RELOADS ON REPLAY BUTTON CLICK
  replayButton.forEach(button => button.addEventListener('click', reloadGame))

  //EVENT LISTENER TO RESPOND TO KEY MOVEMENTS
  document.addEventListener('keydown', keyMoves)
}

window.addEventListener('DOMContentLoaded', init)
