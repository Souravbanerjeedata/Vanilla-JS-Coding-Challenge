const questions = [
  {
    question: 'Which one is the largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue Whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which one is the smallest continent in the world?',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
    ],
  },
  {
    question: 'Which one is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Antarctica', correct: true },
    ],
  },
  {
    question: 'Which one is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Nepal', correct: false },
      { text: 'Sri Lanka', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('options');
const nextButton = document.getElementById('nxt-btn');

let currentQuestionIndex = 0;
let score = 0;

// to Start/Restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  //show the questions
  showQuestions();
}

function showQuestions() {
  resetState();
  // show the question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
  // show the options
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    // all correct answer button would have correct dataset
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

// reset the question state at start of every question
function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach((answer) => {
    if (answer.dataset.correct) {
      answer.classList.add('correct');
    }
    answer.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score}, out of ${questions.length}`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function nextQuestionHandler() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    nextQuestionHandler();
  } else {
    startQuiz();
  }
});

// call
startQuiz();
