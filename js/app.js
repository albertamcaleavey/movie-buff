
  /*-------------------------------- Constants --------------------------------*/
import{questions, answers} from "../data/questions&answers.js"
const winScore = 7500

const correctAudio = new Audio ("../audio/correct.wav")
const incorrectAudio = new Audio ("../audio/incorrect.mp3")

/*---------------------------- Variables (state) ----------------------------*/
let game
let boardSpots 
let clickedIdx
let playerAns
let score
let timer
let timeLeft 

/*------------------------ Cached Element References ------------------------*/
let boxes = document.querySelectorAll('.box')
let board = document.getElementById('board')

// having boxes and board is repetitive 
// change event listener to listen for boxes instead of board
let message = document.getElementById('message')
let progressBar = document.querySelector('.progress')
let replayBtn = document.querySelector(".btn-primary")
let scoreboard = document.getElementById("scoreboard")
let questionCard = document.querySelector(".background")
let input = document.getElementById('input')


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
  timer = null
  timeLeft = 30
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]
  // hide question card, progress bar and scoreboard
  questionCard.style.display = "none"
  progressBar.style.display = "none"
  scoreboard.style.display = "none"
  // display box prices 
  document.querySelectorAll(".two-hun").forEach((el) => el.innerText = "200")
  document.querySelectorAll(".four-hun").forEach((el) => el.innerText = "400")
  document.querySelectorAll(".six-hun").forEach((el) => el.innerText = "600")
  document.querySelectorAll(".eight-hun").forEach((el) => el.innerText = "800")
  document.querySelectorAll(".thous").forEach((el) => el.innerText = "1000")
  render()
}

// ----------------------RENDER-GAME-STATUS-----------------------//

  // displays prices on boxes
  // displays instructions

function render() {
  // displays message based on status of game
  if(game === null){
    message.innerText = "Select a question. If you earn over 7500 points, you win!"
  } else if (game === "loss") {
    message.innerText = "Game Over, you lost. Click the replay button to try again!"
  } else if (game === "win") {
    message.innerText = "You won!"
  }
}


//---------------------WHEN-BOX-IS-CLICKED----------------------//

function handleBoxClick(evt) {
  let clickedBox = evt.target
  // if a category box or a box that was already chosen is clicked, nothing happens
  if(clickedBox.className === "cat" || clickedBox.innerText === ""){
    return
  }
  // find the id of the element that was clicked 
  let clickedBoxId = clickedBox.id
  // separates the number from the rest of the id and turns it into a number
  clickedIdx = parseInt(clickedBoxId.split('').splice(3,3).join(''))
  renderQuestionCard()
  startTimer()

}

// ---------------------------TIMER----------------------------//

function startTimer() {
  // create cached element reference for progress bar
  let progress = document.querySelector(".progress-bar")
  timer = setInterval(function() {
  // decreases time by one second
  timeLeft -= 1
  // adjusts the width of progress bar to time left
  progress.style =`width: ${timeLeft/30 *100}%`
  progress.innerText = timeLeft

  if (timeLeft < 0) {
    incorrectAudio.play()
    clearInterval(timer)
    checkAnswer()
  }
  }, 1000)
  }

function resetTimer() {
  clearInterval(timer)
  timeLeft = 30
  timer = null
}


//-----------------------DISPLAYS-QUESTION----------------------//

function renderQuestionCard() {
  // find the corresponding question
  let currentQuestion = questions[clickedIdx]
  // set the current question text to the card
  document.getElementById("question").innerText = currentQuestion
  // display question card
  questionCard.style.display = "grid"
  // display timer
  progressBar.style.display = "grid"
}


//---------------------WHEN-ANSWER-IS-SUBMITED----------------------//

function checkAnswer() {
  // retrieve user input and make it lowercase
  let lowerInput = input.value.toLowerCase()
  // checks if input is correct: updates playerAns variable and score
  if(lowerInput === answers[clickedIdx]){
    playerAns = "correct"
    score += parseInt(boxes[clickedIdx].textContent)
  } else {
    playerAns= "incorrect"
    // create and call a render correct answer function??
  }

  // SHOULD THIS GO IN ANOTHER RENDER FUNCTION??
  // update the index of the board array 
  boardSpots[clickedIdx] = ""
  // clear input field 
  input.value = ""

  // hide question card
  questionCard.style.display = "none"
  // hide progress bar
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
  // renders message for right or wrong answer 
  if(playerAns === "correct") {
    message.innerText = "Correct! Pick again"
    // show score board with updated score if answer is right
    scoreboard.style.display = "inline"
    document.getElementById('score').innerText = score
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
  
function checkGameStatus(){
// checks if game is over
let checkBoard = boardSpots.every(function(spot) {
  return spot !== null
})
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






