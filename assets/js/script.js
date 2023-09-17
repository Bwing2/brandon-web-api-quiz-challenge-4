var quizBtn = document.querySelectorAll(".quiz-button");

var card = document.querySelector(".card");
var intro = document.querySelector(".instructionsContainer");
var questions = document.querySelector(".questionsContainer");
var quizSection = document.querySelector(".quizSection");
var endScreen = document.querySelector(".endScreen");

var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector("#timer");
var correctEl = document.querySelector("#correct");
var incorrectEl = document.querySelector("#incorrect");
var submit = document.querySelector("#submit");

// Question list variables
var currentQuestion = 1;
var totalNumberQuestions = 10;

var score = 0;

// Timer variables
var secondsLeft = 100;
var timerInterval;

// Local storage variable
var savedInfo;

// Click event that hides intro card, and shows question card. Also starts timer.
startBtn.addEventListener("click", function () {
  startQuiz();
});

function startQuiz() {
  intro.style.display = "none";
  questions.style.display = "block";

  // Timer countdown.
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Timer: " + secondsLeft;
    if (secondsLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  quizSection.style.display = "none";
  clearInterval(timerInterval);
  timer.textContent = "Sorry, you are out of time!";
  questions.style.display = "none";
  endScreen.style.display = "block";
}

// works for all quizBtn with querySelectorAll.
quizBtn.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    // if answer is correct, it will add +1 to score and incorrect answers will subtract 10 seconds.
    if (button.classList.contains("correct")) {
      correctEl.style.display = "block";
      incorrectEl.style.display = "none";
      score++;
      document.querySelector("#score").innerHTML = score;
    } else {
      correctEl.style.display = "none";
      incorrectEl.style.display = "block";
      secondsLeft -= 5;
    }

    // Goes to next question after 1 second delay, adding +1 to currentQuestion.
    setTimeout(function () {
      var previousQuestionSection = document.querySelector(
        "#question" + currentQuestion
      );
      if (secondsLeft <= 0) {
        endQuiz();
      } else {
        previousQuestionSection.style.display = "none";
        currentQuestion++;
        var nextQuestionSection = document.querySelector(
          "#question" + currentQuestion
        );
      }

      correctEl.style.display = "none";
      incorrectEl.style.display = "none";

      // if there is another question, display it.
      if (nextQuestionSection) {
        nextQuestionSection.style.display = "block";
      }

      // if the last question is reached, timer stops and displays text. endScreen is then displayed.
      if (currentQuestion > totalNumberQuestions) {
        timer.textContent = "All done!";
        clearInterval(timerInterval);
        endScreen.style.display = "block";
      }
    }, 1000);
  });
});

// Submit button click event
submit.addEventListener("click", function (event) {
  event.preventDefault();

  var mainInput = document.querySelector("#name");

  // Stores submitted name and score into highScore variable. Can use value since there is an input.
  var highScore = {
    name: mainInput.value,
    score: score,
  };

  // References local storage, and if there is not any savedInfo, it creates a new array.
  // Otherwise it stores submitted data into an object.
  savedInfo = localStorage.getItem("savedInfo");
  if (savedInfo) {
    savedInfo = JSON.parse(savedInfo);
  } else {
    savedInfo = [];
  }

  // Adds savedInfo into the highScore object.
  savedInfo.push(highScore);

  // Changes array into string so it can be logged locally.
  localStorage.setItem("savedInfo", JSON.stringify(savedInfo));
  window.location.href = "scores.html";
});
