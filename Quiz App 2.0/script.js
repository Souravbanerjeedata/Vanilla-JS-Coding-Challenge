const quizQuestions = [
  {
    question: 'What does JavaScript primarily add to a web page?',
    answers: [
      { text: 'Style', correct: false },
      { text: 'Interactivity', correct: true },
      { text: 'Structure', correct: false },
      { text: 'Images', correct: false },
    ],
  },
  {
    question: 'What is the correct way to declare a variable in JavaScript?',
    answers: [
      { text: 'let myVar = 10;', correct: false },
      { text: 'var myVar = 10;', correct: false },
      { text: 'const myVar = 10;', correct: false },
      { text: 'all of the above', correct: true },
    ],
  },
  {
    question: "What is the result of the expression 5 + '5' in JavaScript?",
    answers: [
      { text: '55', correct: false },
      { text: '10', correct: false },
      { text: '"10"', correct: true },
      { text: '15', correct: false },
    ],
  },
  {
    question:
      'Which keyword is used to prevent variable hoisting in JavaScript?',
    answers: [
      { text: 'let', correct: true },
      { text: 'var', correct: false },
      { text: 'const', correct: false },
      { text: 'hoist', correct: false },
    ],
  },
  {
    question: 'What does the Math.random() function return in JavaScript?',
    answers: [
      { text: 'A random integer', correct: false },
      { text: 'A random boolean value', correct: false },
      {
        text: 'A random floating-point number between 0 (inclusive) and 1 (exclusive)',
        correct: true,
      },
      { text: 'A random string', correct: false },
    ],
  },
  {
    question: 'What is the output of console.log(typeof null);?',
    answers: [
      { text: '"object"', correct: true },
      { text: '"null"', correct: false },
      { text: '"undefined"', correct: false },
      { text: '"boolean"', correct: false },
    ],
  },
  {
    question:
      'What will the following code output? let a = 5; let b = a++; console.log(a, b);',
    answers: [
      { text: '5, 5', correct: false },
      { text: '6, 5', correct: true },
      { text: '5, 6', correct: false },
      { text: '6, 6', correct: false },
    ],
  },
  {
    question: 'Which method is used to merge two or more arrays?',
    answers: [
      { text: 'Array.concat()', correct: true },
      { text: 'Array.merge()', correct: false },
      { text: 'Array.join()', correct: false },
      { text: 'Array.add()', correct: false },
    ],
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    answers: [
      { text: '== checks value, === checks value and type', correct: true },
      { text: 'Both are the same', correct: false },
      { text: '=== checks only type', correct: false },
      { text: '== checks type', correct: false },
    ],
  },
  {
    question: 'What does hoisting mean in JavaScript?',
    answers: [
      {
        text: 'Variables and functions are moved to the top of their scope',
        correct: true,
      },
      { text: 'Variables are deleted', correct: false },
      { text: 'Functions are executed immediately', correct: false },
      { text: "Nothing, it's not a JavaScript concept", correct: false },
    ],
  },
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove('active');
  quizScreen.classList.add('active');

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + '%';

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer');

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else if (button === selectedButton) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = 'Great job! You know your stuff!';
  } else if (percentage >= 60) {
    resultMessage.textContent = 'Good effort! Keep learning!';
  } else if (percentage >= 40) {
    resultMessage.textContent = 'Not bad! Try again to improve!';
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove('active');

  startQuiz();
}
