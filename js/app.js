

// 1. initialize the game
  // set board to an array 
  // display instructions for player to pick a category and price
  // 

// 2. render 


  /*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let win
// if a game is in progress
let boardSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let message = document.getElementById('message')
// console.log(boxes)


/*----------------------------- Event Listeners -----------------------------*/


/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  win = null
  boardSpots = [null, 1, null, 2, null, 5, null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  renderBoard()
}


// display prices on boxes using board array

function renderBoard() {
  boardSpots.forEach(function(el, idx){
    if(el !== null) {
         boxes[idx].innerText = ""
    } 
  })
}


// display a question based on which box was clicked
// function renderQuestion() {

// }

// check if a game is in progress
  // game is over when all boxes are empty
  // player wins if they make over a certain number of points
// function ongoingGame() {

// } 