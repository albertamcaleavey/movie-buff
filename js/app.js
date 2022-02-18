
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
let message = document.getElementById('message')
let progressBar = document.querySelector('.progress')
let replay = document.querySelector(".btn-primary")
let scoreboard = document.getElementById("scoreboard")
let questionCard = document.querySelector(".background")
let cardText = document.getElementById("question")
let input = document.getElementById('input')
let progress = document.querySelector(".progress-bar")

/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleBoxClick)
document.getElementById("submit").addEventListener("click", checkAnswer)
replay.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  game = null
  score = 0
  clickedIdx = null
  playerAns = null
  timer = null
  timeLeft = null
  resetTimer()
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]

  initialRender()

  // for presentation:

  // game = "win"
  // score = 8000
  // checkGameStatus()
  // checkWin()
  // renderUpdate()
  
} 

//-------------------DISPLAY-INITIAL-GAME-STATE-------------------//
function initialRender() {
  // hide question card and progress bar 
  hideQuestionCard()
  replay.style.display = "none"
  scoreboard.style.display = "none"
  // display category names
  document.getElementById('cat0').innerText = "Movie Magic"
  document.getElementById('cat1').innerText = "Shady Characters"
  document.getElementById('cat2').innerText = "The Oscars"
  document.getElementById('cat3').innerText = "Movies of the 200s"
  document.getElementById('cat4').innerText = "Famous Quotes"
  // display box prices 
  document.querySelectorAll(".two-hun").forEach((el) => el.innerText = "200")
  document.querySelectorAll(".four-hun").forEach((el) => el.innerText = "400")
  document.querySelectorAll(".six-hun").forEach((el) => el.innerText = "600")
  document.querySelectorAll(".eight-hun").forEach((el) => el.innerText = "800")
  document.querySelectorAll(".thous").forEach((el) => el.innerText = "1000")
  // display instructions
  message.innerText = "Select a question. If you earn over 7500 points, you win!"
}

//-------------------------------HIDE-QUESTION-CARD---------------------------------//

function hideQuestionCard() {
  questionCard.style.display = "none"
  progressBar.style.display = "none"
}

// ----------------------UPDATE-GAME-BOARD-----------------------//

function renderUpdate() {
  // updates board
  input.value = ""
  boardSpots[clickedIdx] = ""
  // updates the board to display which boxes have already been picked 
  boardSpots.forEach(function(spot, idx){
    if(spot !== null) {
      boxes[idx].innerText = ""
      boxes[idx].classList.remove('hover')
    } 
  })
  // hides category name when category is empty 
  if(boardSpots[0] !==null && boardSpots[5]!==null && boardSpots[10]!==null && boardSpots[15] !==null && boardSpots[20]!==null){
    document.getElementById('cat0').textContent = ""
  }
  if(boardSpots[1] !==null && boardSpots[6]!==null && boardSpots[11]!==null && boardSpots[16] !==null && boardSpots[21]!==null){
    document.getElementById('cat1').textContent = ""
  }
  if(boardSpots[2] !==null && boardSpots[7]!==null && boardSpots[12]!==null && boardSpots[17] !==null && boardSpots[22]!==null){
    document.getElementById('cat2').textContent = ""
  }
  if(boardSpots[3] !==null && boardSpots[8]!==null && boardSpots[13]!==null && boardSpots[18] !==null && boardSpots[23]!==null){
    document.getElementById('cat3').textContent = ""
  }
  if(boardSpots[4] !==null && boardSpots[9]!==null && boardSpots[14]!==null && boardSpots[19] !==null && boardSpots[24]!==null){
    document.getElementById('cat4').textContent = ""
  }
  // updates render message based on win/loss
  if (game === "loss") {
    message.innerText = "Game Over, you lost. Click the replay button to try again!"
    // display replay button
    replay.style.display = "grid"
  } else if (game === "win") {
    message.innerText = "Congratulations, you won!"
    confetti.start()
    setTimeout (() => {confetti.stop()},10000)
    // display replay button
    replay.style.display = "grid"
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
  timer = setInterval(function() {
  timeLeft -= 1
  // adjusts the width of progress bar to time left
  progress.style =`width: ${timeLeft/30 *100}%`
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
  // hide replay button
  replay.style.display = "none"
  // reset progress bar
  progress.style =`width: 100%`
  // hide render message
  message.style.display = "none"
  // find the corresponding question
  let currentQuestion = questions[clickedIdx]
  // set the current question text to the card
  cardText.innerText = currentQuestion
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
  // update game board
  renderUpdate()
  // update render message
  renderResult()
  // check for a win/loss
  checkGameStatus()
  resetTimer()
}

// -----------UPDATE-RENDER-MSG- W/-RESULT-OF-ANSWER-------------//


function renderResult() {
  // renders message for right or wrong answer 
  message.style.display = "grid"
  message.classList.remove("animate__animated", "animate__shakeX", "animate__animated", "animate__heartBeat")
  if(playerAns === "correct") {
    hideQuestionCard()
    message.innerText = "Correct! Pick again"
    message.classList.add("animate__animated", "animate__heartBeat")
    // show score board with updated score if answer is right
    scoreboard.style.display = "grid"
    scoreboard.innerText = score
    playCorrectAudio()
  } if (playerAns === "incorrect") {
    // delays hiding of question card
    setTimeout (() => {hideQuestionCard()},3000)
    // show correct answer
    cardText.innerText = `The correct answer is ${answers[clickedIdx]}`
    message.innerText = "Incorrect, pick again"
    message.classList.add("animate__animated", "animate__headShake")
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
  renderUpdate()
}






