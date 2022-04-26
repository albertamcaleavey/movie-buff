import{questions, answers} from "../data/questions&answers.js"
const winScore = 7500
const correctAudio = new Audio ("../audio/correct.wav")
const incorrectAudio = new Audio ("../audio/incorrect.mp3")

let game, boardSpots, clickedIdx, playerAns, score, timer, timeLeft

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

board.addEventListener("click", handleBoxClick)
document.getElementById("submit").addEventListener("click", checkAnswer)
replay.addEventListener("click", init)

init()

function init() {
  game = null
  score = 0
  clickedIdx, playerAns, timer, timeLeft = null
  resetTimer()
  boardSpots = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,]
  initialRender()
} 

function initialRender() {
  hideQuestionCard()
  replay.style.display = "none"
  scoreboard.style.display = "none"

  document.getElementById('cat0').innerText = "Movie Magic"
  document.getElementById('cat1').innerText = "Shady Characters"
  document.getElementById('cat2').innerText = "The Oscars"
  document.getElementById('cat3').innerText = "Movies of the 2000s"
  document.getElementById('cat4').innerText = "Famous Quotes"

  document.querySelectorAll(".two-hun").forEach(el => el.innerText = "200")
  document.querySelectorAll(".four-hun").forEach(el => el.innerText = "400")
  document.querySelectorAll(".six-hun").forEach(el => el.innerText = "600")
  document.querySelectorAll(".eight-hun").forEach(el => el.innerText = "800")
  document.querySelectorAll(".thous").forEach(el => el.innerText = "1000")

  message.innerText = "Select a question. If you earn over 7500 points, you win!"
}

function hideQuestionCard() {
  questionCard.style.display = "none"
  progressBar.style.display = "none"
}

function renderUpdate() {
  input.value = ""
  boardSpots[clickedIdx] = ""

  boardSpots.forEach(function(spot, idx){
    if(spot !== null) {
      boxes[idx].innerText = ""
      boxes[idx].classList.remove('hover')
    } 
  })

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

  if (game === "loss") {
    message.innerText = "Game Over, you lost. Click the replay button to try again!"
    replay.style.display = "grid"
  } else if (game === "win") {
    message.innerText = "Congratulations, you won!"
    confetti.start()
    setTimeout (() => {confetti.stop()},10000)
    replay.style.display = "grid"
  }
}

function handleBoxClick(evt) {
  let clickedBox = evt.target

  if(clickedBox.className === "cat" || clickedBox.innerText === ""){
    return
  }
  let clickedBoxId = clickedBox.id

  clickedIdx = parseInt(clickedBoxId.split('').splice(3,3).join(''))
  renderQuestionCard()
  startTimer()
}

function startTimer() {
  timer = setInterval(function() {
  timeLeft -= 1
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

function renderQuestionCard() {
  replay.style.display = "none"
  progress.style =`width: 100%`
  message.style.display = "none"
  let currentQuestion = questions[clickedIdx]
  cardText.innerText = currentQuestion
  questionCard.style.display = "grid"
  progressBar.style.display = "grid"
}

function checkAnswer() {
  let lowerInput = input.value.toLowerCase()
  if(lowerInput === answers[clickedIdx]){
    playerAns = "correct"
    score += parseInt(boxes[clickedIdx].textContent)
  } else {
    playerAns= "incorrect"
  }
  renderUpdate()
  renderResult()
  checkGameStatus()
  resetTimer()
}

function renderResult() {
  message.style.display = "grid"
  message.classList.remove("animate__animated", "animate__shakeX", "animate__animated", "animate__heartBeat")
  if(playerAns === "correct") {
    hideQuestionCard()
    message.innerText = "Correct! Pick again"
    message.classList.add("animate__animated", "animate__heartBeat")
    scoreboard.style.display = "grid"
    scoreboard.innerText = score
    playCorrectAudio()
  } if (playerAns === "incorrect") {
    setTimeout (() => {hideQuestionCard()},2000)
    cardText.innerText = `The correct answer is ${answers[clickedIdx]}`
    message.innerText = "Incorrect, pick again"
    message.classList.add("animate__animated", "animate__headShake")
    playIncorrectAudio()
  }
}

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
  
function checkGameStatus(){
  if (boardSpots.every(function(spot) {
  return spot !== null
  })) {
    checkWin()
  }
}

function checkWin() {
  game = score > winScore ? "win" : "loss"
  renderUpdate()
}