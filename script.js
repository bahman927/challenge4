// JavaScript Quiz Questions
const questions = [
  {
      question: "JavaScript is a _________ language.",
      choices: ["1-Markup", "2-Programming", "3-Styling", "4-Design"],
      answer: "Programming"
  },
  {
      question: "Which built-in method calls a function for each element in the array?",
      choices: ["1-loop()", "2-while()", "3-forEach()", "4-None of the above"],
      answer: "forEach()"
  },
  {
      question: "What is the correct way to write a JavaScript array?",
      choices: ["1-var colors = 'red', 'green', 'blue'", "2-var colors = ['red', 'green', 'blue']", "3-var colors = {'red', 'green', 'blue'}", "4-var colors = 'red'; 'green'; 'blue'"],
      answer: "var colors = ['red', 'green', 'blue']"
  },
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["1-scripting", "2-script", "3-js", "4-javascript"],
      answer: "script"
  },
  {
      question: "How do you create a function in JavaScript?",
      choices: ["1-function:myFunction()", "2-function = myFunction()", "3-function myFunction()", "4-myFunction():function"],
      answer: "function myFunction()"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLimit = 60; // 60 seconds
let choiceOut;
let answerOut;
//startQuiz();
function startQuiz() {
   setInterval(() => {
      timeLimit--;
      if (timeLimit <= 0) {
          endQuiz();
      } else {
          document.getElementById("timer").textContent = ` ${timeLimit}`;
      }
  }, 1000);
 
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      document.getElementById("question").textContent = question.question;
      const choicesContainer = document.getElementById("choices");
      choicesContainer.innerHTML = "";
      question.choices.forEach((choice, index) => {
        const choiceDiv = document.createElement("div");
        choiceDiv.classList.add("form-check");
      
        choiceDiv.innerHTML = `
        <button type="button" class="btn btn-secondary fs-5 custom-hover px-4 mb-1">${choice}</button>
        
        `;
        choiceDiv.addEventListener("click", () => {
          checkAnswer(choice, question.answer);
      });
        choicesContainer.append(choiceDiv);
      });
      removeStart()
  } else {
      endQuiz();
  }
}

function checkAnswer(choice, answer) {
  clearInterval(timer); // Stop the timer
  
  console.log("choice = ",choice.substring(2) ,  "answer : ", answer)
  if (choice.substring(2) === answer) {
      score++;
      document.getElementById("feedback").textContent = "Correct!";
  } else {
      document.getElementById("feedback").textContent = "Wrong!";
  }
  setTimeout(() => {
    document.getElementById("feedback").textContent = "";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
 
}, 2000);
}

function endQuiz() {
  clearInterval(timer);
  timeLimit = 0
  document.getElementById("timer").textContent = " 0";
  document.getElementById("question").textContent = "Quiz Over!";
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").textContent = `Your score: ${score} out of 5`;
}

document.getElementById("start").addEventListener("click", startQuiz);
function removeStart() {
  var buttonContainer = document.getElementById('question-container');
  var myButton = document.getElementById('start');
   document.removeChild
  if (myButton) {
    // Remove the button from the container
    buttonContainer.removeChild(myButton);

  }
}
function goToCheckPage() {
  // Navigate to another HTML file
  //window.location.href = "check.html";
  toggleContainer('score-container')
  toggleContainer('question-container')
}
    
//Function to go back to index.html
function goBack() {
   // window.location.href = 'index.html';
   toggleContainer('question-container')
   toggleContainer('score-container')
}

//Event listener for the buttons
const element = document.getElementById('submit');
if (element) {
  element.addEventListener('click', () => {
  const initial = document.getElementById('input1').value;
  console.log('initial = ', initial)
  saveScore(initial,score);
  DisplayHighestScores();
});
}

 const goElement = document.getElementById('goBack');
 if (goElement) {
   goElement.addEventListener('click', goBack);
 }
function saveScore(name, score){
  let scores = localStorage.getItem(name);
  if (!scores){
    scores = [];
  } else {
    scores = JSON.parse(scores);
  }

  scores.push(score);
  localStorage.setItem(name, JSON.stringify(scores));
}

function DisplayHighestScores() {
  const scoresElement = document.getElementById('scores');
  scoresElement.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.key(i);
    const highestScore = getHighestscore(name);
    const scoreElement = document.createElement('div');
    scoreElement.textContent =`Highest score for ${name}: ${highestScore}`;
    scoresElement.append(scoreElement);
    } 
  }

  function toggleContainer(container) {
     container = document.getElementById(container);
    if (container.style.display === 'none') {
        container.style.display = 'initial';
    } else {
        container.style.display = 'none';
    }
}

function getHighestscore(name){
  let scores = localStorage.getItem(name);
  if (!scores){
    return null;
  }
    scores = JSON.parse(scores);
  return Math.max(...scores, 0);
}