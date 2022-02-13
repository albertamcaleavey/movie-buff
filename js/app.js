
  /*-------------------------------- Constants --------------------------------*/
import{questions, answers} from "../data/questions&answers.js"

const winScore = 7500
// half of possible points
// to win, score must be greater than 7500
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
// having boxes and board may be repetitive 
let message = document.getElementById('message')
let card = document.querySelector('.card')
let submitAns = document.getElementById("button-addon2")
let replayBtn = document.querySelector(".btn-primary")
let form = document.querySelector(".input-group")
let scoreboard = document.getElementById("score")


/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleBoxClick)
submitAns.addEventListener("click", checkAnswer)
replayBtn.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  game = null
  clickedIdx = null
  playerAns = null
  score = 0
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]
  card.style.display = "none"
  form.style.display = "none"
  scoreboard.style.display = "none"
  //assign prices to divs
  document.querySelectorAll(".two-hun").forEach((el) => el.innerText = "200")
  document.querySelectorAll(".four-hun").forEach((el) => el.innerText = "400")
  document.querySelectorAll(".six-hun").forEach((el) => el.innerText = "600")
  document.querySelectorAll(".eight-hun").forEach((el) => el.innerText = "800")
  document.querySelectorAll(".thous").forEach((el) => el.innerText = "1000")
  render()
}

// ----------------------RENDER-GAME-STATUS-----------------------//
// starting game render
  // displays prices on boxes using board array
  // displays instructions

function render() {
  // displays message based on status of game
  if(game === null){
    message.innerText = "instructions"
  } else if (game === "loss") {
    message.innerText = "Game Over, you lost"
  } else if (game === "win") {
    message.innerText = "You won!"
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
  // show the input form
  form.style.display = "inline-block"
}


//---------------------WHEN-ANSWER-IS-SUBMITED----------------------//

// change name to check answer??
function checkAnswer() {
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


  // SHOULD THIS GO IN A RENDER FUNCTION??
// update the index of the board array 
boardSpots[clickedIdx] = ""
// clear input field 
document.querySelector('.form-control').value = ""
// hide question card
card.style.display = "none"
// hide input form
form.style.display = "none"
  renderResult()
  // check if there's a win
  checkGameStatus()
}

// ---------------------RENDER-RESULT-OF-ANSWER-------------------//


function renderResult() {
   // updates the board to display which boxes have already been picked 
   boardSpots.forEach(function(spot, idx){
    if(spot !== null) {
         boxes[idx].innerText = ""
    } 
  })
  // shows a message stating whether the answer was right or wrong 
  if(playerAns === "correct") {
    message.innerText = "Correct! Pick again"
    // show score board with updated score if answer is right
    scoreboard.style.display = "inline"
    scoreboard.innerText = score
  } else if (playerAns === "incorrect") {
    message.innerText = "Incorrect, pick again"
  }
}


//-----------------------CHECK-STATUS-OF-GAME-----------------------//
  
// change to checkGameStatus????
function checkGameStatus(){
// checks if game is over
let checkBoard = boardSpots.every(function(spot) {
  return spot !== null
})
console.log(checkBoard)
// if the game is over, check for win/ loss
if(checkBoard=== true){
  checkWin()
} 
}

//-------------------------CHECK-FOR-A-WIN-/-LOSS------------------//

function checkWin() {
  if(score >= winScore){
    game = "win"
  } else if (score < winScore) {
    game = "loss"
  }
  render()
}
