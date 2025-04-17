let countdownTime = 1800;
let timerInterval = null;
let isRunning = false;

function startCountdown() {//user has clicked the timer and is ready to start an exercise
    const timerElement = document.getElementById('timer');

    if (!isRunning && timerInterval === null) {
        // First time click, start the timer
        timerElement.style.backgroundColor = 'rgb(193,216,192)';
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    } else if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
    } else {
        // Resume the timer
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}

function updateTimer() {//adds pause functionality to timer
    const timerElement = document.getElementById('timer');
      
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (countdownTime < 600) {
        timerElement.style.backgroundColor = 'rgb(242, 190, 185)';
    }

    countdownTime--;

    if (countdownTime < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerElement.textContent = "Time's up!";
    }
}
function beforeSubmit() { //calculate the time taken to complete an exercise
    const totalTime = 1800;
    const timeUsed = totalTime - countdownTime -1;
    document.getElementById('time_taken').value = timeUsed;
}
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".type-buttons button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedTopic = button.textContent.trim();
            // Redirect to the /coding route with the topic as query param
            window.location.href = `/coding?topic=${encodeURIComponent(selectedTopic)}`;
        });
    });
});
