
  /*-------------------------------- Constants --------------------------------*/
import{questions, answers} from "../data/questions&answers.js"

const winScore = 7500
// half of possible points

const correctAudio = new Audio ("../audio/correct.wav")
const incorrectAudio = new Audio ("../audio/incorrect.mp3")

/*---------------------------- Variables (state) ----------------------------*/
let game
let boardSpots = []
let clickedIdx
let playerAns
let score
let timer
let timeLeft 

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let board = document.getElementById('board')
// having boxes and board may be repetitive 
let message = document.getElementById('message')
let progressBar = document.querySelector('.progress')


let replayBtn = document.querySelector(".btn-primary")
let scoreboard = document.getElementById("score")

// GROUP THESE??
let card = document.querySelector(".background")
let timerEl = document.getElementById("timer")
// let form = document.querySelector(".input")


/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleBoxClick)
document.getElementById("submit").addEventListener("click", checkAnswer)
replayBtn.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  game = null
  clickedIdx = null
  playerAns = null
  score = 0
  timeLeft = 30
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]

  card.style.display = "none"
  // form.style.display = "none"
  progressBar.style.display = "none"

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
    message.innerText = "Select a question. If you get more than half the questions right, you win!"
  } else if (game === "loss") {
    message.innerText = "Game Over, you lost."
  } else if (game === "win") {
    message.innerText = "You won!"
  }
}


//---------------------WHEN-BOX-IS-CLICKED----------------------//

function handleBoxClick(evt) {
  let clickedBox = evt.target
  // if a category box is clicked, nothing happens
  if(clickedBox.className === "cat"){
    return
  }
  // find the id of the element that was clicked 
  let clickedBoxId = clickedBox.id
  // separates the number from the rest of the id
  // turns the id into a number with parseInt
  clickedIdx = parseInt(clickedBoxId.split('').splice(3,3).join(''))
  renderQuestion()
  startTimer()

}

// ---------------------------TIMER----------------------------//
// may need to init timeleft to zero
function startTimer() {
  let progress = document.querySelector(".progress-bar")
  timer = setInterval(function() {
  timerEl.textContent = timeLeft + " seconds remaining!"
  timeLeft -= 1
  //  let timePassed = 30 - timeLeft
  progress.style =`width: ${timeLeft/30 *100}%`
  progress.innerText = timeLeft

  if (timeLeft < 0) {
    timerEl.textContent = "Time's Up!" 
    incorrectAudio.play()
    clearInterval(timer)
    checkAnswer()
  }
  console.log(timeLeft)
  }, 1000)
  }

function resetTimer() {
  timerEl.textContent = ""
  // progressBar.style =`width: 0%`
  clearInterval(timer)
  timeLeft = 30
  timer = null
}


//-----------------------DISPLAYS-QUESTION----------------------//

function renderQuestion() {
  // find the corresponding question
  let currentQuestion = questions[clickedIdx]
  // set the current question text to the card
  document.getElementById("question").innerText = currentQuestion
  // show the card- should this go in render?
  card.style.display = "grid"
  // show the input form
  // form.style.display = "grid"
  // show timer
  progressBar.style.display = "grid"
}


//---------------------WHEN-ANSWER-IS-SUBMITED----------------------//

// change name to check answer??
function checkAnswer() {
  // get the user input and makes it all lowercase
  let input = document.querySelector('.input').value.toLowerCase()
  // checks if input is correct: updates playerAns variable and score
if(input === answers[clickedIdx]){
    playerAns = "correct"
    score += parseInt(boxes[clickedIdx].textContent)
  } else {
    playerAns= "incorrect"
    // call a render correct answer function??
  }
  // make an option for when there is no response and timer runs out

  // SHOULD THIS GO IN A RENDER FUNCTION??
// update the index of the board array 
boardSpots[clickedIdx] = ""
// clear input field 
document.querySelector('.input').value = ""

// hide question card
card.style.display = "none"
// hide input form
// form.style.display = "none"
// hide timer/ progress bar
progressBar.style.display = "none"

  renderResult()
  // check if there's a win
  checkGameStatus()
  resetTimer()
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
    playCorrectAudio()
  } else if (playerAns === "incorrect") {
    message.innerText = "Incorrect, pick again"
    playIncorrectAudio()
  }
}

//--------------------PLAY-AUDIO-W/-ADJUSTED-VOLUME---------------//

function playCorrectAudio() {
  correctAudio.load()
  correctAudio.volume = .10
  correctAudio.play()
  setTimeout(function() {
    correctAudio.pause()
}, 1300)
}

function playIncorrectAudio() {
  incorrectAudio.load()
  incorrectAudio.volume = .10
  incorrectAudio.play()
  setTimeout(function() {
    incorrectAudio.pause()
  }, 450)
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
  if(score > winScore){
    game = "win"
  } else if (score < winScore) {
    game = "loss"
  }
  render()
}






