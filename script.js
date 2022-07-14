const startBtn = document.getElementById("startBtn");
const startScrn = document.getElementById("startScrn");
const quizBox = document.getElementById("quizBox");
const scoreScrn = document.getElementById("scoreboard");
const viewScores = document.getElementById("viewScores");
const outtaTime = document.getElementById("outtaTime");
const endScrn = document.getElementById("endScrn");
const restart1 = document.getElementById("outtaRestart");
const restart2 = document.getElementById("exit");
const next = document.getElementById("next");
const optionList = document.querySelector("optionList");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
var timeLeft = document.getElementById("timeSec");
var addOne = 0;
var timer;
let globalIndex = 0;
var points = 0;
var sec = 15;

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

viewScores.addEventListener('click', scoreBoard);
startBtn.addEventListener('click', startFunc);
restart1.addEventListener('click', startOver);
restart2.addEventListener('click', startOver);
next.addEventListener('click', nextQues);

function startFunc(){
    viewScores.classList.add("none");
    startScrn.classList.add("none");
    quizBox.classList.remove("none");
    startTimer();
    showQuestions(0);
}

function endFunc(){
    clearInterval(timer);
    quizBox.classList.add("none");
    endScrn.classList.remove("none");
}

function startTimer(){
    timer = setInterval(()=>{
        if (sec <= 0){
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

function chooseAnswer(choice, choiceText){
    let choiceUser = choiceText;
    let choiceCorrect = questions[globalIndex].answer
    if (choiceUser == choiceCorrect){
        choice.classList.add("correct");
        option1.classList.add("noSelect");
        option2.classList.add("noSelect");
        option3.classList.add("noSelect");
        option4.classList.add("noSelect");
        points += 10;
        sec += 10;
        console.log(points);
    } else {
        choice.classList.add("wrong");
        option1.classList.add("noSelect");
        option2.classList.add("noSelect");
        option3.classList.add("noSelect");
        option4.classList.add("noSelect");
        console.log("wrong");
        sec -= 5;
        console.log(points);
    }
}

function startOver(){
    location.reload();
}

function nextQues(){
    resetChoices();
    addOne++;
    globalIndex++;
    if (addOne > 3){
        endFunc();
        return;
    }
    showQuestions(addOne);
}

function resetChoices(){
    option1.classList.remove("correct", "wrong","noSelect");
    option2.classList.remove("correct", "wrong","noSelect");
    option3.classList.remove("correct", "wrong","noSelect");
    option4.classList.remove("correct", "wrong","noSelect");
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

function scoreBoard(){
    startScrn.classList.add("none");
    quizBox.classList.add("none");
    outtaTime.classList.add("none");
    endScrn.classList.add("none");
    viewScores.classList.add("none");
    scoreScrn.classList.remove("none");
}