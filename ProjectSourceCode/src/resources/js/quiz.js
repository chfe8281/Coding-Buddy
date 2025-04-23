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
        question: "What will be the output of the following statement? cout << 5 / 2;",
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
        question: "What is the default access specifier for members of a class in C++?",
        options: ["Private", "Public", "Protected", "None of the above"],
        correct: 0,
        set: '1300'
    },
    {
        question: "Which of the following is a searching algorithm?",
        options: ["Bubble Sort", "Linear Search", "Selection Sort", "Insertion Sort"],
        correct: 1,
        set: '3104'
    },
    {
        question: "What is the time complexity of binary search in the worst case?",
        options: ["O(n)", "O(1)", "O(n log n)", "O(log n)"],
        correct: 3,
        set: '3104'
    },
    {
        question: "Which sorting algorithm repeatedly compares and swaps adjacent elements?",
        options: ["Insertion Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
        correct: 2,
        set: '3104'
    },
    {
        question: "What is the best case time complexity of Bubble Sort?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(n log n)"],
        correct: 0,
        set: '3104'
    },
    {
        question: "Which algorithm is best suited for finding the shortest path in a graph with non-negative weights?",
        options: ["Dijkstra's Algorithm", "Depth First Search", "Kruskal's Algorithm", "Merge Sort"],
        correct: 0,
        set: '3104'
    }
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedSet = null;
let filteredQuestions = [];
let answerChecked = false;
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const checkAnswerBtn = document.getElementById('check-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const quizContainer = document.getElementById('quiz');

function loadSelectedSet(setId) {
    console.log("entered loadselectedset");
    document.getElementById('quiz-title').textContent = `${setId} Quiz`;
    selectedSet = setId;
    filteredQuestions = quizData.filter(q => q.set === setId);
    currentQuestion = 0;
    score = 0;
    document.getElementById('set-selector').style.display = 'none'; //try putting these 2 lines after load questino as well
    quizContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    answerChecked=false;

    const question = filteredQuestions[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => {
            selectOption(button, index);
            //button.style.backgroundColor='#b5adab';
        });
        optionsEl.appendChild(button);
    });
    nextBtn.style.display = 'none';
    checkAnswerBtn.style.display = 'none';
    timeLeft = 30;
    if (timer) clearInterval(timer);
    startTimer();
    updateProgress();
}

function selectOption(selectedButton, optionIndex) {
    if (answerChecked) return;

    const buttons = optionsEl.getElementsByClassName('option');
    Array.from(buttons).forEach(button => {
        button.classList.remove('selected');
        button.style.backgroundColor = ''; //set all btns to default color
    });
    selectedButton.classList.add('selected');
    selectedButton.style.backgroundColor = '#b5adab'; //change selected btn's bg color
    nextBtn.style.display = 'block';
    checkAnswerBtn.style.display = 'block';

    checkAnswerBtn.disabled = false;
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

function updateProgress() {
    const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    quizContainer.innerHTML = `
                <div class="results">
                    <div class="result-icon">
                        <i class="fas ${score > filteredQuestions.length / 2 ? 'fa-trophy text-success' : 'fa-times-circle text-danger'}"></i>
                    </div>
                    <div class="score">Your score: ${score}/${filteredQuestions.length}</div>
                    <p>${score > filteredQuestions.length / 2 ? 'Great job!' : 'Better luck next time!'}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Take Another Quiz</button>
                </div>
            `;
}

function checkAnswer(timeout = false) {
    if (answerChecked) {
        console.log("Answer already processed for this question.");
        return;
    }
    answerChecked = true;
    if (timer) clearInterval(timer); //stop timer

    const selectedOption = document.querySelector('.option.selected');

    if (selectedOption) {
        const selectedAnswer = Array.from(optionsEl.children).indexOf(selectedOption);
        const question = filteredQuestions[currentQuestion];

        if (selectedAnswer === question.correct) {
            console.log("Correct!");
            selectedOption.style.backgroundColor = 'lightgreen';
            score++;
            //points++;
            fetch('/api/add-points', { // Endpoint name
                method: 'POST',       // Use POST for actions that modify data
                headers: {
                    'Content-Type': 'application/json',
                    // Add CSRF token header if your setup requires it
                },
                credentials: 'same-origin' // Send cookies with the request
                // No body needed if the server just increments by 1 upon receiving the request
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Server failed to update points:', response.statusText);
                    // Handle error appropriately, maybe log it without alerting the user
                }
                return response.json(); // Expect a JSON response back
            })
            .then(data => {
                if (data.success) {
                    console.log('Points updated on server.');
                } else {
                    console.warn('Server responded but points update failed:', data.message);
                }
            })
            .catch(err => {
                console.error('Network error during point update:', err);
            });
        } else {
            console.log("Incorrect.");
            selectedOption.style.backgroundColor = 'lightcoral';
            // Highlight the correct answer as well
            const correctOptionElement = optionsEl.children[question.correct];
            if (correctOptionElement) {
                correctOptionElement.style.backgroundColor = 'lightgreen';
            }
        }
    } else if (timeout) {
        console.log("Time ran out, no answer selected.");
        // Optionally highlight the correct answer when time runs out without selection
        const question = filteredQuestions[currentQuestion];
         const correctOptionElement = optionsEl.children[question.correct];
         if (correctOptionElement) {
             correctOptionElement.style.backgroundColor = 'lightyellow'; // Gentle indication
         }
    } else {
         // Should not happen if check button is disabled correctly, but good to log
         console.log("CheckAnswer called without a selected option and not via timeout.");
         // Re-enable check flag since nothing was processed? Or just let it proceed to disable buttons.
         // For simplicity, we'll let the state remain checked.
    }


    // --- Post-check UI updates ---
    // Disable all option buttons
    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
    });

    // Disable Check Answer button
    checkAnswerBtn.disabled = true;
    // Show Next button
    nextBtn.style.display = 'inline-block'; // Use inline-block for alignment
}

nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < filteredQuestions.length) {
        loadQuestion();
    } else {
        updateStreak();
        showResults();
    }
});

checkAnswerBtn.addEventListener('click', () => {
    //answerChecked = true;
    checkAnswer();
});

function updateStreak() {
    fetch('/api/update-streak', {
      method: 'POST',
      credentials: 'same-origin' // Ensures session cookie is sent
    }).catch(err => console.error('Failed to update streak:', err));
  }

