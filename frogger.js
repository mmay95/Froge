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

  //grid 

  // load page -? 
  // endgame display 



  //Elements 
  // .grid 
  const grid = document.querySelector('.grid')
  const size = 10
  const cellCount = size * size
  const cells = []

  //frog
  const frogClass = 'frog'
  let frogStart = 94
  let frogPosition = 0

  //car
  const carClass = 'car'
  let carStart = 0
  let carPosition = 0

  //log

  const logClass = 'log'
  let logStart = 0
  let logPosition = 0

  // function add/remove frog
  function addFrog(position) {
    console.log('checking frog position ->', position)
    cells[position].classList.add(frogClass)
  }
  function removeFrog(position) {
    cells[position].classList.remove(frogClass)
  }
  // function add/remove car
  function addCar(position) {
    console.log('checking car position ->', position)
    cells[position].classList.add(carClass)
  }
  function removeCar(position) {
    cells[position].classList.remove(carClass)
  }
  // function add/remove logs
  function addLog(position) {
    console.log('checking log position ->', position)
    cells[position].classList.add(logClass)
  }
  function removeLog(position) {
    cells[position].classList.remove(logClass)
  }

  //function make grid

  function theGrid(frogStart) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i //number of cell is in index
      grid.appendChild(cell)
      cells.push(cell)
    }
    addFrog(frogStart)
    obstacles()
  }

  // function for key movements to manipulate frog jumps
  function keyMoves(event) {
    const key = event.keycode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    console.log('frogs position -->', frogPosition)
    removeFrog(frogPosition)

    // if statments for keys
    //define positions
    if (key === right && frogPosition % size !== size - 1) { 
      frogPosition++ 
    } else if (key === left && frogPosition % size !== 0) { 
      frogPosition-- 
    } else if (key === up && frogPosition >= size) { 
      frogPosition -= size 
    } else if (key === down && frogPosition + size <= cellCount - 1) { 
      frogPosition += size 
    } else {
      console.log('not right keys') 
    }
    addFrog(frogPosition)
    win()
    lose()
  }

  

  // if statement added for each key 
  // end on removing frog function
  // outside of if statment -> add frog to new position
  // if frog position === .home position then alert 'you win'

  
  // function for obstacle movements
  function obstacles(){
    addLog(28)
    addCar(78)

    
  }
  // setInterval for regular movement across screen (can maybe use this to later create harder levels at faster speeds)
  // car and logs will move one cell left every second 
  // will need add carleave and logleave and then readd car and log to next cell
  // once all logs and cars have moved one cell left, they shoul reappear at beginning cell to create illusion of continuous movement 
  // if statment for when log or car touches frog -> game over alert -> if frogPosition === carPosition || logPosition {window alert game over? or score -10}
  // eventlistner on start button with key movement function 
  // eventlistener on keyboard to start obstacle movements once space is clicked
  document.addEventListener('keydown', keyMoves)
  theGrid(frogStart)
}

window.addEventListener('DOMContentLoaded', init)