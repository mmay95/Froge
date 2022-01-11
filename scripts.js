// create div, assign class, get div from dom & append new grid size to it
// variables for cell size and count 
// create loop for grid -> innertext and add into empty array
// create a start button -> eventlistener that triggers frogstart function and makes it appear on grid
// create frog start & frog current position
// create function to make grid which loops till cell size number specified
// frog added function -> makes frog appear in specified area with a classList.add 
// frog left function -> classList.remove
// create event listeners for key movements -> keyCode for up down left and right or even a spacebar key to jump straight up
// create function with if statement for each direction
// make sure frog cant move beyond grid
// create obstacles for frog via classList.add
// car and logs must be animated and move across grid cells right -> left
// setInterval to move objects across -> carAdd() carLeave()
// create function that involves alert message of 'game over' if frog hits obstacle  statment that


function init() {
  //Q SELECTOR
  const carHorn = document.querySelector('.carHorn')
  
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
  const lilypadClass = 'lily'
  const lilypadArray = [32, 33, 43, 45, 37, 38, 48]


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
      } else if (i >= 30 && i <= 49) {
        cell.classList.add(riverClass)
      } else if (i >= 60 && i <= 79) {
        cell.classList.add(safeClass)
      } else {
        console.log('tile colours done')
      }
    }
  }


  //START FUNCTION: INCLUDES FUNCTIONS FOR GRID, FROG & OBSTACLES WITH SET INTERVAL TIMES
  function startGame() {
    makeGrid(frogStartPosition)
    addFrog(frogStartPosition)
    addCars()
    addLogs()
    addCrocs()
    addLily()
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

  function collision() {
    //if statement -> if frog reaches obstacle1 then add class 'crash croc', 'crash car', 'crash river' 
    // crash css -> gif for each collision 
    if (cells[frogCurrentPosition].classList.contains('car')) {
      removeFrog(frogCurrentPosition)
      frogCurrentPosition = frogStartPosition
      carHorn.play()
      lives.innerText = (lives.innerText) - 1
      addFrog(frogStartPosition)
      console.log('ran over')
    } else if (cells[frogCurrentPosition].classList.contains('croc')) {
      removeFrog(frogCurrentPosition)
      frogCurrentPosition = frogStartPosition
      // audio.play()
      lives.innerText = (lives.innerText) - 1
      addFrog(frogStartPosition)
      console.log('youve been eaten')
    } else if (cells[frogCurrentPosition].classList.contains('log')) {
      removeFrog(frogCurrentPosition)
      frogCurrentPosition = frogStartPosition
      // audio.play()
      lives.innerText = (lives.innerText) - 1
      addFrog(frogStartPosition)
      console.log('battered')
    } else {
      console.log()
    }
    // if frog reaches log, move with log?
    // if lives.innerText === 0 then popup & restart
  }
  // collision()

  // if statment for when log or car touches frog -> game over alert -> if frogPosition === carPosition || logPosition {window alert game over? or score -10}
  // eventlistener on keyboard to start obstacle movements once space is clicked
  // if frog position === .home position then alert 'you win'
  // alert message if user lands on section that isnt home

  document.addEventListener('keydown', keyMoves)
  //CALL STARTGAME FUNCTION
  startGame()
}

window.addEventListener('DOMContentLoaded', init)