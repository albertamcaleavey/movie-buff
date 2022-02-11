

// 1. initialize the game
  // set board to an array 
  // display instructions for player to pick a category and price
  // 

// 2. render 


  /*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
// if the player won
let gameStatus
// checking if game is in progress, game over, or game won
let boardSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let message = document.getElementById('message')
// console.log(boxes)


/*----------------------------- Event Listeners -----------------------------*/


/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  game = null
  boardSpots = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  renderBoard()
}



// display prices on boxes using board array

function renderBoard() {
  // updates the board to display which boxes have already been picked 
  boardSpots.forEach(function(el, idx){
    if(el !== null) {
         boxes[idx].innerText = ""
    } 
  })
  // displays message based on status of game
  if(game === null){
    message.innerText = "Pick Again "
  } else if (game === "over") {
    message.innerText = "Game Over"
  } else if (game === "won") {
    message.innerText = "You won!"
  }
}


// display a question based on which box was clicked
// function renderQuestion() {

// }

// check if a game is in progress
  // game is over when all boxes are empty
  // player wins if they make over a certain number of points
// function ongoingGame() {

// } 

// if(boardSpots.every(function(el){
//   el !== null
// })){
//   ongoingGame === false
// }