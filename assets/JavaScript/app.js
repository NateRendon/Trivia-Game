const listOfQuestions = [
    {question: "Sega came out with a very iconic hedgehog that has become fairly renown. what is his name?", answer1: "Tails", answer2: "Sonic", answer3: "Knuckles", answer4: "Eggman", finalAttr: "answer2", finalText: "Sonic"},
    {question: "In Legend of Zelda, what is the name of the warrior who takes up the legendary Master Sword?", answer1: "Epona", answer2: "Link", answer3: "Tingle", answer4: "Zelda", finalAttr: "answer2", finalText: "Link"},
    {question: "In Nintendo's DK series. DK is the initials for the main character. What is his name?", answer1: "Donkey Kong", answer2: "Daddy Kong", answer3: "Diddy Kong", answer4: "Dankey Kong", finalAttr: "answer1", finalText: "Donkey Kong"},
    {question: "?", answer1: "", answer2: "Shadow", answer3: "Tails", answer4: "Knuckles", finalAttr: "answer3", finalText: "Tails"},
    {question: "?", answer1: "", answer2: "", answer3: "", answer4: "", finalAttr: "answer1", finalText: ""},
    {question: "?", answer1: "", answer2: "", answer3: "", answer4: "", finalAttr: "answer4", finalText: ""},
    {question: "In Star Fox, our main hero goes by Fox, but what is his last name?", answer1: "Fur", answer2: "McCloud", answer3: "McDonald", answer4: "Archwing", finalAttr: "answer2", finalText: "McCloud"},
    {question: "?", answer1: "", answer2: "", answer3: "", answer4: "", finalAttr: "answer1", finalText: ""},
    {question: "What is the color of Link's main Tunic in Legend of Zelda?", answer1: "Red", answer2: "Green", answer3: "Blue", answer4: "Purple", finalAttr: "answer2", finalText: "Green"},
    {question: "Our beloved pink ball Kirby fought many bosses, who was normally the firs to fight kirby?", answer1: "Marx", answer2: "MetaKnight", answer3: "Whispy Woods", answer4: "King DeDeDe", finalAttr: "answer3", finalText: "Whispy Woods"},
]

let intervalId = 0;
let questionId = 0;
let timeRemaining = 20;
let totalWins = 0;
let totalLosses = 0;
let totalTimeouts = 0;

function startTrivia() {
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    $('#question').text(listOfQuestions[questionId].question);
    $('#answer1').text(listOfQuestions[questionId].answer1);
    $('#answer2').text(listOfQuestions[questionId].answer2);
    $('#answer3').text(listOfQuestions[questionId].answer3);
    $('#answer4').text(listOfQuestions[questionId].answer4);
}

function startTimer() {
    timeRemaining = 20;
    $('#time-remaining').text(`Time Remaining: ${timeRemaining}`);

    //Display timer every second
    intervalId = setInterval(checkTimeRemaining, 1000);
}

function checkTimeRemaining() {
    if (timeRemaining > 1) {
        calculateTimeRemaining();
    }
    //Out of Time
    else {
        calculateTimeRemaining();
        displayAnswer(false, "OUT OF TIME!");
        displayNextQuestion();
        totalTimeouts++;
    }
}

function calculateTimeRemaining() {
    timeRemaining--;
    $('#time-remaining').text(`Time Remaining: ${timeRemaining}`);
}

function verifyAnswerChosen(answerClicked) {
    //Correct Answer
    if (listOfQuestions[questionId].finalAttr === answerClicked) {
        displayAnswer(true, "CORRECT!");
        totalWins++;
    }
    //Wrong Answer
    else {
        displayAnswer(false, "WRONG!");
        totalLosses++;
    }
}

function displayAnswer(isCorrect, resultText) {
    stopTimer();
    clearQuestion();
    $('#question').text(`${resultText}`);
    if (!isCorrect) {
        $('#answer1').text(`The Correct Answer is: ${listOfQuestions[questionId].finalText}`);
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

function clearQuestion() {
    $('#question').empty();
    $('#answer1').empty();
    $('#answer2').empty();
    $('#answer3').empty();
    $('#answer4').empty();
}

function displayNextQuestion() {
    questionId++;

    //Wait three seconds before moving to next screen
    if (questionId !== listOfQuestions.length) {
        let timeoutId = setTimeout(startTrivia, 1000 * 3);
    }
    else {
        let timeoutId = setTimeout(displayStats, 1000 * 3);
    }
}

function displayStats() {
    $('#question').text("Finished! Here's your final score");
    $('#answer1').text(`Correct Answers: ${totalWins}`);
    $('#answer2').text(`Wrong Answers: ${totalLosses}`);
    $('#answer3').text(`Unanswered Questions: ${totalTimeouts}`);
    $('#answer4').empty();
    $('#playAgain').removeClass("invisible");
}

function resetStats() {
    intervalId = 0;
    questionId = 0;
    timeRemaining = 20;
    totalWins = 0;
    totalLosses = 0;
    totalTimeouts = 0;
    $('#playAgain').addClass("invisible");
}

$('#start').on("click", function () {
    $('#startButton').hide();
    startTrivia();
});

$('#answer1').on("click", function () {
    verifyAnswerChosen("answer1");
    displayNextQuestion();
});

$('#answer2').on("click", function () {
    verifyAnswerChosen("answer2");
    displayNextQuestion();
});

$('#answer3').on("click", function () {
    verifyAnswerChosen("answer3");
    displayNextQuestion();
});

$('#answer4').on("click", function () {
    verifyAnswerChosen("answer4");
    displayNextQuestion();
});

$('#playAgain').on("click", function () {
    resetStats();
    startTrivia();
});