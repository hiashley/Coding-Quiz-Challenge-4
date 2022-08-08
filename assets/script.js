var questions = [
  {
    q: 'The content of the page (such as your pictures, text, links) will show up here.',
    choices: ['Head', 'Body', 'Style', 'Folder'],
    a: 'Body'
  },
  {
    q: 'JavaScript files have the file extension (the bit after the name):',
    choices: ['.js', '.css', '.html', '.java'],
    a: '.js'
  },
  {
    q: 'Defines a division or a section in an HTML document. Used to group block-elements to format them with CSS',
    choices: ['&lt;caption&gt;', '&lt;span&gt;', '&lt;div&gt;', '&lt;group&gt;'],
    a: '<div>'
  },
  {
    q: 'To make a comment in HTML you use ______.',
    choices: ['//', '&lt;!-- --&gt;', '/*', '#'],
    a: '<!-- -->' 
  },
  {
    q: 'What is a variable?',
    choices: ['Store values so we can use them once.', 'Store values so we can use them but cannot change them.', "Store values in containers so we can't use them later.", 'Store values so we can use them later and change them from the code.'],
    a: 'Store values so we can use them later and change them from the code.'
  }
];

var quizStart = document.getElementById('quiz-instructions');
var startButton = document.getElementById('start-btn');
var quiz = document.getElementById('quiz-container');
var results = document.getElementById('quiz-result');
var finalScore = document.getElementById('your-score');
var highScoresList = document.getElementById('highscores');
var timerID = document.getElementById('timer');
var viewScore = document.getElementById('scores');

var seconds = 60;
var questionIndex = 0;
var timeCount
var score = 100;

var questionTitles = document.querySelector('.question');
var choiceZero = document.querySelector('.choice-0');
var choiceOne = document.querySelector('.choice-1');
var choiceTwo = document.querySelector('.choice-2');
var choiceThree = document.querySelector('.choice-3');

var savedInfo;
var initialsInput = document.getElementById('initials');
var allScores = [];
var submitBtn = document.getElementById('submit-btn');
var savedInitials = document.getElementById('allinitials'); 

var backButton = document.querySelector('.back-button');
var clearScoreBtn = document.querySelector('.clear-score');

function startQuiz() {
  quizStart.classList.add('hide');
  quiz.classList.remove('hide');
  viewScore.classList.add('hide');
  timerID.classList.remove('hide');

  renderQuestions();
  timerStart();
}

function timerStart() {
  timeCount = setInterval(function() {
    seconds--;
    timerID.textContent = seconds;
    if (seconds <= 0) {
      quizResults();
    }
  }, 1000);
}

function renderQuestions() {
  var displayedQuestions = questions[questionIndex];
  if (questionIndex == questions.length) {
    quizResults();
  } else {
    questionTitles.innerHTML = displayedQuestions.q;
    choiceZero.innerHTML = displayedQuestions.choices[0];
    choiceOne.innerHTML = displayedQuestions.choices[1];
    choiceTwo.innerHTML = displayedQuestions.choices[2];
    choiceThree.innerHTML = displayedQuestions.choices[3];
  }
}

function renderAnswers(event) {
  var userChoice = event.target;
  if (userChoice.textContent === questions[questionIndex].a) {
    questionIndex++;
    renderQuestions();
  } else {
    seconds -= 10;
    score -= 20;
    questionIndex++;
    renderQuestions();
  }
  }


choiceZero.addEventListener('click', renderAnswers);
choiceOne.addEventListener('click', renderAnswers);
choiceTwo.addEventListener('click', renderAnswers);
choiceThree.addEventListener('click', renderAnswers);

function quizResults() {
  timerID.classList.add('hide');
  seconds = 60;
  quiz.classList.add('hide');
  results.classList.remove('hide');
  finalScore.textContent = `Your Score: ${score}`;
  clearInterval(timeCount);
}

function saveScores(event) {
  event.preventDefault();
  results.classList.add('hide');
  highScoresList.classList.remove('hide');

  var savedInfo = {
    userScore: score,
    userInitials: initialsInput.value
  };

  initialsInput.value = '';

  allScores.push(savedInfo);
  localStorage.setItem('savedInfo', JSON.stringify(allScores));
  viewAllScores();
}

function viewAllScores() {
  savedInitials.innerHTML = '';

  var listOfScores = JSON.parse(localStorage.getItem('savedInfo'));

  for (var i = 0; i < listOfScores.length; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML = listOfScores[i].userInitials + " ---- " + listOfScores[i].userScore;
    savedInitials.appendChild(listItem);
  }
}

function goBack() {
  viewScore.classList.remove('hide');
  quizStart.classList.remove('hide');
  highScoresList.classList.add('hide');
  questionIndex = 0;
  seconds = 60;
  score = 100;
}

function clearScore() {
  localStorage.clear();
  savedInitials.textContent = '';
}

function viewScoreList() {
  quizStart.classList.add('hide');
  highScoresList.classList.remove('hide');
}

startButton.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', saveScores);
backButton.addEventListener('click', goBack);
clearScoreBtn.addEventListener('click', clearScore);
viewScore.addEventListener('click', viewScoreList);

// var questionsIndex = 0;
// var startButton = document.getElementById('start-btn');
// var timerDisplay = document.getElementById('timer');
// var intervalZero = 0;
// var seconds = 100;
// var penalty = 5;
// var quizUl = document.createElement('ul');
// var quiz = document.getElementById('quiz-container');
// var score = 0;

// function startQuiz() { 
//   if (intervalZero === 0) {
//     intervalZero = setInterval(function() {
//       seconds--;
//       timerDisplay.textContent = `Time: ${seconds}`;
      
//       if (seconds <= 0) {
//         clearInterval(intervalZero);
//         quizComplete();
//         timerDisplay.textContent = `Time's up!`;
//       }
//     }, 1000);
//   }
//   renderQuestions(questionsIndex);
// }

// function renderQuestions(questionsIndex) {
//   quiz.innerHTML = '';
//   quizUl.innerHTML = '';

//   for (i = 0; i < questions.length; i++) {
//     var eachQuestion = questions[questionsIndex].q;
//     var eachChoice = questions[questionsIndex].choices;
//     quiz.textContent = eachQuestion;
//   }
//   eachChoice.forEach(function(newItem) {
//     var listChoices = document.createElement("li");
//     listChoices.textContent = newItem;
//     quiz.appendChild(quizUl);
//     quizUl.appendChild(listChoices);
//     listChoices.addEventListener("click", (checkAnswer));
// })
// }

// function checkAnswer(event) {
//   newElement = event.target;
//   if (newElement.matches("li")) {

//     var questionResult = document.createElement("div");
//     questionResult.setAttribute("id", "new-div"); 
//     if (newElement.textContent == questions[questionsIndex].a) {
//         score++;
//         questionResult.textContent = `Correct!`
//     } else {
//         seconds = seconds - penalty;
//         questionResult.textContent = "Wrong! The correct answer is:  " + questions[questionsIndex].a;
//     }
// }
// questionsIndex++;
// if (questionsIndex >= questions.length) {
//   quizComplete();
//   questionResult.textContent = `Score is: ${score}/${questions.length}`
// } else {
//   renderQuestions(questionsIndex);
// }
// quiz.appendChild(questionResult);
// }

// function quizComplete() {
//   timerDisplay.innerHTML = '';
//   quiz.innerHTML = '';

// } 

// startButton.addEventListener("click", startQuiz);



// var renderQuestions = function(displayedQuestions) {
//   var questionTitles = document.createElement('p');
//   var answerChoices = document.createElement('ul');

//   questionTitles.textContent = displayedQuestions.q;
//   answerChoices = textContent = displayedQuestions.choices;
// }
