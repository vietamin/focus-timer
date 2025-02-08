let timer;
let isRunning = false;
let isWorkTime = true; // fängt mit der Arbeitsphase an
let timeLeft = 25 * 60; // Standard: 25 Minuten Arbeitszeit

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

// Timer aktualisieren
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// Timer starten
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        notifyUser();
        switchMode();
      }
    }, 1000);
  }
}

// Timer pausieren
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Timer zurücksetzen
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkTime = true;
  timeLeft = workDurationInput.value * 60;
  updateTimerDisplay();
}

// Modus wechseln (Arbeitszeit/Pause)
function switchMode() {
  isWorkTime = !isWorkTime;
  timeLeft = (isWorkTime ? workDurationInput.value : breakDurationInput.value) * 60;
  updateTimerDisplay();
  startTimer();
}

// Benachrichtigung anzeigen
function notifyUser() {
  if (Notification.permission === 'granted') {
    new Notification(isWorkTime ? 'Break Time!' : 'Work Time!', {
      body: isWorkTime ? 'Time for a break!' : 'Back to Work! :)',
    });
  }
}

// Benachrichtigungsberechtigung anfordern
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// Event-Listener
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workDurationInput.addEventListener('change', () => {
  if (!isRunning && isWorkTime) {
    timeLeft = workDurationInput.value * 60;
    updateTimerDisplay();
  }
});
breakDurationInput.addEventListener('change', () => {
  if (!isRunning && !isWorkTime) {
    timeLeft = breakDurationInput.value * 60;
    updateTimerDisplay();
  }
});

// Initialen Timer anzeigen
updateTimerDisplay();
