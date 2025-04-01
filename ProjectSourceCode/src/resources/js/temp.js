
            // Function to start the countdown
function startCountdown(){
        let countdownTime = 1800;
        const timerElement = document.getElementById('timer');
        timerElement.style.backgroundColor = 'rgb(214, 246, 214)';
        const interval = setInterval(() => {
                    // Calculate minutes and seconds
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;

                        // Format the time as MM:SS
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Decrease the countdown time by 1 second
            countdownTime--;

            // Check if the countdown is over
            if (countdownTime < 300){
                timerElement.style.backgroundColor = 'rgb(242, 190, 185)';
            }
            if (countdownTime < 0) {
                clearInterval(interval);
                timerElement.textContent = "Time's up!";
            }
        }, 1000);
}

        // Start the countdown when the page loads
// window.onload = startCountdown;        