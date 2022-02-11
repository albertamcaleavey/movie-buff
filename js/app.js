

// 1. initialize the game
  // set board to an array 
  // display instructions for player to pick a category and price
  // 

// 2. render 


  /*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let win
// if a game is in progress
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let message = document.getElementById('message')
console.log(message)

/*----------------------------- Event Listeners -----------------------------*/


/*-------------------------------- Functions --------------------------------*/

function init() {
  win = null
  board = [null, null, null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  render()
}


// display prices on boxes using board array

function render() {
  board = [ "$200", "$200", "$200", "$200", "$200", "$400", "$400", "$400", "$400", "$400", "$600", "$600", "$600", "$600", "$600", "$800", "$800", "$800", "$800", "$800", "$1000", "$1000", "$1000", "$1000", "$1000"  
  ]
}


// display a question based on which box was clicked
function renderQuestion() {

}

// check if a game is in progress
  // game is over when all boxes are empty
  // player wins if they make over a certain number of points
function ongoingGame() {

} 