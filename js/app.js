
  /*-------------------------------- Constants --------------------------------*/
import{questions, answers} from "../data/questions&answers.js"

const winScore = 7500
// half of possible points
// to win, score must be greate than 7500
/*---------------------------- Variables (state) ----------------------------*/
let game
// checking if game is in progress, game over, or game won
let boardSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

let clickedIdx
let playerAns
let score

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
  clickedIdx = null
  playerAns = null
  score = 0
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]
  render()
}

// starting game render
  // displays prices on boxes using board array
  // displays instructions

function render() {
   //PUT IT SECOND RENDER FUNCTION???
  // updates the board to display which boxes have already been picked 
boardSpots.forEach(function(el, idx){
    if(el !== null) {
         boxes[idx].innerText = ""
    } 
  })

  // displays message based on status of game
  if(game === null){
    message.innerText = "instructions"
  } else if (game === "loss") {
    message.innerText = "Game Over, you lost"
  } else if (game === "win") {
    message.innerText = "You won!"
  }
  
 //PUT IT SECOND RENDER FUNCTION???
  if(playerAns === "correct") {
    message.innerText = "Correct! Pick again"
  } else if (playerAns === "incorrect") {
    message.innerText = "Incorrect, pick again"
  }
}


//---------------------WHEN-BOX-IS-CLICKED----------------------//

function handleBoxClick(evt) {
  // find the id of the element that was clicked 
  let clickedBoxId = evt.target.id
  // separates the number from the rest of the id
  // turns the id into a number with parseInt
  clickedIdx = parseInt(clickedBoxId.split('').splice(3,3).join(''))
  // call render Question
  renderQuestion()
}

//-----------------------DISPLAYS-QUESTION----------------------//

function renderQuestion() {
  // find the corresponding question
  let currentQuestion = questions[clickedIdx]
  // set the current question text to the card
  card.innerText = currentQuestion
  // show the card- should this go in render?
  card.style.display = "inline"
  // call render function to display the question
}


//---------------------WHEN-ANSWER-IS-SUBMITED----------------------//
// change name to check answer??
function handleSubmitAns() {
// get the user input and makes it all lowercase
let input = document.querySelector('.form-control').value.toLowerCase()
// checks if input is correct: updates playerAns variable and score
if(input === answers[clickedIdx]){
    playerAns = "correct"
    score += parseInt(boxes[clickedIdx].textContent)
    console.log(score)
  } else {
    playerAns= "incorrect"
    // call a render correct answer function??
  }
// MAKE A SECOND RENDER FUNCTION?? 
// update the index of the board array 
boardSpots[clickedIdx] = ""
// clear input field (should form be stored as cached element reference since you refer to it more than once??)
document.querySelector('.form-control').value = ""
// SHOULD THIS GO IN A SECOND RENDER FUNCTION???
  card.style.display = "none"

  render()
  // check if there's a win
  checkGameStatus()
}

//-----------------------CHECK-STATUS-OF-GAME-----------------------//
  
// change to checkGameStatus????
function checkGameStatus(){
// if all squares are empty, game is over=> check if player has won depending on if score is greater than a certain number 
let checkBoard = boardSpots.every(function(spot) {
  return spot !== null
})
console.log(checkBoard)
if(checkBoard=== true){
  // call another function to check win?
  checkWin()
} 
}

// if score is greater than winning score, update game variable to win in order to trigger render win message (extra: display how many questions they got right)

// if score is less than winning score, update game variable to loss to render message 

function checkWin() {
  if(score >= winScore){
    game === "win"
  } else if (score < winScore) {
    game === "loss"
  }
  render()
}



// RENDER FLOW
// 1. show instructions
// 2. after first pick, while game is ongoing, show if answer was right or wrong and to pick again
// 3. if game is over, (all squares empty/clicked), show if player won or lost and to play again

