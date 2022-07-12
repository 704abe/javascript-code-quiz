const startBtn = document.getElementById("startBtn");
const startScrn = document.getElementById("startScrn");
const quizBox = document.getElementById("quizBox");
const scoreScrn = document.getElementById("scoreboard");
var timeLeft = document.getElementById("timeSec");
var sec = 15;

startBtn.addEventListener('click', startFunc);

function startFunc(){
    startBtn.classList.add("none");
    startScrn.classList.add("none");
    quizBox.classList.remove("none");
    // setInterval(timer, 1000);
}

function timer(){
    sec--;
    timeLeft.innerHTML = sec;
    if (sec <= 0){
        clearInterval(timer);
    }
    console.log(sec);
}