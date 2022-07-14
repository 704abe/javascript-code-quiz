// Variables 
const startBtn = document.getElementById("startBtn");
const startScrn = document.getElementById("startScrn");
const quizBox = document.getElementById("quizBox");
const scoreScrn = document.getElementById("scoreboard");
const viewScores = document.getElementById("viewScores");
const outtaTime = document.getElementById("outtaTime");
const endScrn = document.getElementById("endScrn");
const outtaRestart = document.getElementById("outtaRestart");
const exit = document.getElementById("exit");
const scoreRestart = document.getElementById("scoreExit");
const next = document.getElementById("next");
const optionList = document.querySelector("optionList");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
const score = document.getElementById("score");
const userName = document.getElementById("userName");
const submit = document.getElementById("submit");
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

// Event Listeners
viewScores.addEventListener('click', scoreBoard);
startBtn.addEventListener('click', startFunc);
outtaRestart.addEventListener('click', startOver);
exit.addEventListener('click', startOver);
scoreRestart.addEventListener('click', startOver);
next.addEventListener('click', nextQues);

// Functions

// Transitions from start screen to quiz box
function startFunc(){
    next.classList.add("none");
    viewScores.classList.add("none");
    startScrn.classList.add("none");
    quizBox.classList.remove("none");
    startTimer();
    showQuestions(0);
}

// Transitions from quiz box to completion screen
function endFunc(){
    clearInterval(timer); // stops timer
    finalScore = points + sec; // tallies up final score
    score.textContent = finalScore; // prints final score to webpage
    localStorage.setItem("newScore", JSON.stringify(finalScore)); // saves final score to local storage
    quizBox.classList.add("none"); // 'display: none' added to quiz box
    endScrn.classList.remove("none"); // 'display: none' removed from end screen
}

// starts timer countdown
function startTimer(){
    timer = setInterval(()=>{
        if (sec <= 0){
            clearInterval(timer);
            noTime(); // calls function for out-of-time screen when timer runs out
            return;
        } else {
            sec--;
            timeLeft.innerHTML = sec; // prints current time to screen
        }
    }, 1000);
}

 // out-of-time screen
function noTime(){
    quizBox.classList.add("none"); // 'display: none' add to quiz box
    outtaTime.classList.remove("none"); // 'display: none' removed from out-of-time screen
}

// determines whether selected answer is the correct answer, adjusts timer accordingly, and indicates a wrong/right answer
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
    } else {
        choice.classList.add("wrong");
        option1.classList.add("noSelect");
        option2.classList.add("noSelect");
        option3.classList.add("noSelect");
        option4.classList.add("noSelect");
        console.log("wrong");
        sec -= 5;
    }
    next.classList.remove("none"); // 'display: none' removed from 'next' button
}

// reloads the page upon restart/exit
function startOver(){
    location.reload();
}

// called when 'next' button is pressed, updates questions and answers for nthe next question
function nextQues(){
    next.classList.add("none"); // 'display: none' added to 'next' button
    resetChoices();
    addOne++;
    globalIndex++;
    if (addOne > 3){
        endFunc();
        return;
    }
    showQuestions(addOne);
}

// removes wrong/right indicators from previous screen
function resetChoices(){
    option1.classList.remove("correct", "wrong","noSelect");
    option2.classList.remove("correct", "wrong","noSelect");
    option3.classList.remove("correct", "wrong","noSelect");
    option4.classList.remove("correct", "wrong","noSelect");
}

// shows different questions/answers based on index
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

// presents high score list and updates it based on local storage
function scoreBoard(){
    const scoreList = document.getElementById("scoreList");
    const scores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(scores);
    scoreList.innerHTML = scores.map(score => {
        return `<li class="scoreLi">${score.name} - ${score.score}</li>`;
    }).join("")
    startScrn.classList.add("none");
    quizBox.classList.add("none");
    outtaTime.classList.add("none");
    endScrn.classList.add("none");
    viewScores.classList.add("none");
    scoreScrn.classList.remove("none");
}

// saves username and score upon 'submit' button press
function saveScore(event){
    event.preventDefault();
    const mostRecentScore = localStorage.getItem("newScore");
    const userScore = {
        score: mostRecentScore,
        name: userName.value
    }
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(userScore); // adds most recent score to 'highScores' array
    console.log(highScores);

    highScores.sort((a,b)=>{ // sorts 'highScores' in descending order
        return b.score - a.score;
    })
    highScores.splice(5); // cuts off scores that are not higher than the current top 5
    console.log(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    scoreBoard(); // transitions to high score list
}