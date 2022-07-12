const startBtn = document.getElementById("startBtn");
const startScrn = document.getElementById("startScrn");
const quizBox = document.getElementById("quizBox");
const scoreScrn = document.getElementById("scoreboard");
var timeLeft = document.getElementById("timeSec");

startBtn.addEventListener('click', startFunc);

function startFunc(){
    startBtn.classList.add("none");
    startScrn.classList.add("none");
    quizBox.classList.remove("none");
    startTimer();
}

function startTimer(){
    var sec = 15;
    setInterval(()=>{
        if (sec == 0){
            clearInterval(timer);
        } else {
            sec--;
            timeLeft.innerHTML = sec;
        }
    }, 1000);
}