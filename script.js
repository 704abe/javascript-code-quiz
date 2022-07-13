const startBtn = document.getElementById("startBtn");
const startScrn = document.getElementById("startScrn");
const quizBox = document.getElementById("quizBox");
const scoreScrn = document.getElementById("scoreboard");
var timeLeft = document.getElementById("timeSec");
const outtaTime = document.getElementById("outtaTime");
const restart1 = document.getElementById("outtaRestart");
const restart2 = document.getElementById("restart");
const next = document.getElementById("next");
var index;

let questions = [
    {
        number: 1,
        question: "Commonly used data types DO NOT include:",
        answer: "alerts",
        option1: "strings",
        option2: "booleans",
        option3: "alerts",
        option4: "numbers"
    },
    {
        number: 2,
        question: "The condition in an if/else statement is enclosed within ____.",
        answer: "parenthesis",
        option1: "quotes",
        option2: "curly brackets",
        option3: "parenthesis",
        option4: "square brackets"
    },
    {
        number: 3,
        question: "Arrays in Javascript can be used to store ____.",
        answer: "all of the above",
        option1: "numbers and strings",
        option2: "other arrays",
        option3: "booleans",
        option4: "all of the above"
    },
    {
        number: 4,
        question: "Which of these variable types can be redeclared?",
        answer: "var",
        option1: "var",
        option2: "const",
        option3: "let",
        option4: "all of the above"
    }
];

startBtn.addEventListener('click', startFunc);
restart1.addEventListener('click', startOver);
restart2.addEventListener('click', startOver);
next.addEventListener('click', nextQues);

function startFunc(){
    startScrn.classList.add("none");
    quizBox.classList.remove("none");
    startTimer();
    showQuestions(0);
}

function startTimer(){
    var sec = 15;
    setInterval(()=>{
        if (sec == 0){
            clearInterval(timer);
            noTime();
            return;
        } else {
            sec--;
            timeLeft.innerHTML = sec;
        }
    }, 1000);
}

function noTime(){
    outtaTime.classList.remove("none");
    quizBox.classList.add("none");
}

function startOver(){
    location.reload();
}

function nextQues(){
    index++;
    showQuestions(index);
}

function showQuestions(index){
    const quesTitle = document.getElementById("quesTitle");
    const option1 = document.getElementById("option-1");
    const option2 = document.getElementById("option-2");
    const option3 = document.getElementById("option-3");
    const option4 = document.getElementById("option-4");
    quesTitle.textContent = questions[index].question;
    option1.textContent = questions[index].option1;
    option2.textContent = questions[index].option2;
    option3.textContent = questions[index].option3;
    option4.textContent = questions[index].option4;
}

// var chosenAnswer;

// if (chosenAnswer