console.log("JS loaded")
//document.addEventListener('DOMContentLoaded', () => {
//console.log("DOM loaded")
const quizData = [
    {
        question: "What is the output of the following code? int x=5; cout<< x++;",
        options: ["A) 6", "B) 5", "C) Compilation Error", "D) Undefined Behavior"],
        correct: 1,
        set: '1300'
    },
    {
        question: "What will be the output of the following statement? API TO GET IN PROPER FORMATTING: cout << 5 / 2;",
        options: ["A) 2.5", "B) 2", "C) 2.0", "D) Compilation Error"],
        correct: 1,
        set: '1300'
    },
    {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["A) for loop", "B) while loop", "C) do-while loop", "D) All loops execute at least once"],
        correct: 2,
        set: '1300'
    },
    {
        question: "What is the correct way to dynamically allocate memory for an integer in C++?",
        options: ["A) int *ptr = malloc(sizeof(int));", "B) int *ptr = new int;", "C) int *ptr = (int*)malloc(sizeof(int));", "D) int ptr = new int;"],
        correct: 1,
        set: '1300'
    },
    {
        question: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["A) Queue", "B) Array", "C) Stack", "D) Linked List"],
        correct: 2,
        set: '2270'
    },
    {
        question: "In a singly linked list, each node contains:",
        options: ["A) Only data", "B) Data and a pointer to the next node", "C) A pointer to the previous node", "D) Only a pointer"],
        correct: 1,
        set: '2270'
    },
    {
        question: "What is the main disadvantage of arrays?",
        options: ["A) Fixed size at declaration", "B) Random access is not allowed", "C) Elements are not stored in order", "D) Only integers can be stored"],
        correct: 0,
        set: '2270'
    },
    {
        question: "Which of the following operations is not efficient in a singly linked list?",
        options: ["A) Inserting at the beginning", "B) Deleting from the beginning", "C) Traversing the list", "D) Accessing the last element"],
        correct: 3,
        set: '2270'
    },
    {
        question: "In C++, how do you define a struct for a singly linked list node?",
        options: ["A) struct Node { int data; Node* next; };", "B) struct Node { int data; Node next; };", "C) struct Node { data; next; };", "D) Node { int data; Node* next; };"],
        correct: 0,
        set: '2270'
    },
    {
        question: "What is the main function of RAM in a computer?",
        options: ["A) Store files permanently", "B) Process graphics", "C) Temporarily store data for quick access", "D) Control hardware devices"],
        correct: 2,
        set: '2400'
    },
    {
        question: "Which of the following stores data permanently?",
        options: ["A) RAM", "B) Hard Disk Drive", "C) Cache", "D) Registers"],
        correct: 1,
        set: '2400'
    },
    {
        question: "What does the instruction ADD AX, BX do?",
        options: ["A) Adds AX to BX and stores the result in BX", "B) Adds both and stores in memory", "C) Nothing", "D) Adds BX to AX and stores the result in AX"],
        correct: 3,
        set: '2400'
    },
    {
        question: "Which register is commonly used as the stack pointer in x86 assembly?",
        options: ["A) %rsp", "B) %rip", "C) %rsi", "D) %rdx"],
        correct: 0,
        set: '2400'
    },
    {
        question: "What is 0xc5 in binary?",
        options: ["A) 1100 0101", "B) 0011 0101", "C) 1101 0101", "D) 1010 0110"],
        correct: 0,
        set: '2400'
    },
    {
        question: "More Questions Here",
        options: ["A", "B", "C", "D"],
        correct: 3,
        set: '1300'
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const quizContainer = document.getElementById('quiz');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, index));
        optionsEl.appendChild(button);
    });
    nextBtn.style.display = 'none';
    timeLeft = 30;
    if (timer) clearInterval(timer);
    startTimer();
    updateProgress();
}

function selectOption(selectedButton, optionIndex) {
    const buttons = optionsEl.getElementsByClassName('option');
    Array.from(buttons).forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    nextBtn.style.display = 'block';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;

    const selectedAnswer = Array.from(optionsEl.children).indexOf(selectedOption);
    const question = quizData[currentQuestion];

    if (selectedAnswer === question.correct) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        optionsEl.children[question.correct].classList.add('correct');
    }

    Array.from(optionsEl.children).forEach(button => button.disabled = true);
    clearInterval(timer);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    quizContainer.innerHTML = `
                <div class="results">
                    <div class="result-icon">
                        <i class="fas ${score > quizData.length / 2 ? 'fa-trophy text-success' : 'fa-times-circle text-danger'}"></i>
                    </div>
                    <div class="score">Your score: ${score}/${quizData.length}</div>
                    <p>${score > quizData.length / 2 ? 'Great job!' : 'Better luck next time!'}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Restart Quiz</button>
                </div>
            `;
}

nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

loadQuestion();

//});