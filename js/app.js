

// 1. initialize the game
  // set board to an array 
  // display instructions for player to pick a category and price
  // 

// 2. render 


  /*-------------------------------- Constants --------------------------------*/
import{questions, answers} from "../data/questions&answers.js"

/*---------------------------- Variables (state) ----------------------------*/
// if the player won
let game
// checking if game is in progress, game over, or game won
let boardSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
let currentQuestion
let clickedIdx
let playerAns

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let board = document.getElementById('board')
let message = document.getElementById('message')
let card = document.querySelector('.card')
let submitAns = document.getElementById("button-addon2")



/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleBoxClick)
submitAns.addEventListener("click", handleSubmitAns)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  game = null
  currentQuestion = null
  clickedIdx = null
  playerAns = null
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]
  render()
}

// starting game render
  // displays prices on boxes using board array
  // displays instructions

function render() {

  // updates the board to display which boxes have already been picked 
  
  // displays message based on status of game
  // if all squares are null, show instructions 
  // if(boardSpots.every(function(spot){
  //   spot === null
  // })) {
  //   message.innerText = "Instructions"
  // }

  // if(game === null) {
  //   message.innerText = "instrtuctions"
  // }
  boardSpots.forEach(function(el, idx){
    if(el !== null) {
         boxes[idx].innerText = ""
    } 
  })
  card.style.display = "none"
  if(playerAns === "correct") {
    message.innerText = "Correct! Pick again"
  } else if (playerAns === "incorrect") {
    message.innerText = "Incorrect, pick again"
  }

}




function handleBoxClick(evt) {
  // find the id of the element that was clicked 
  let clickedBoxId = evt.target.id
  // separates the number from the rest of the id
  // turns the id into a number with parseInt
  clickedIdx = parseInt(clickedBoxId.split('').splice(3,3).join(''))
  // find the corresponding question in the questions array
  currentQuestion = questions[clickedIdx]
  // set the current question text to the card
  card.innerText = currentQuestion
  // show the card- should this go in render?
  card.style.display = "inline"
  // call render function to display the question
  render()
  // check if there's a win
  // checkWin()
}

function handleSubmitAns() {
let input = document.querySelector('.form-control').value.toLowerCase()
console.log(input)
// checks if input is correct and updates playerGuess variable accordingly
if(input === answers[clickedIdx]){
    playerAns = "correct"
  } else {
    playerAns= "incorrect"
  }
  
  render()
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


// 1. show instructions
// 2. after first pick, while game is ongoing, show if answer was right or wrong and to pick again
// 3. if game is over, (all squares empty/clicked), show if player won or lost and to play again