let timer;
let isRunning = false;
let isWorkTime = true; // fängt mit der Arbeitsphase an
let timeLeft = 25 * 60; // Standard: 25 Minuten Arbeitszeit

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const stateIndicator = document.getElementById('state-indicator');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const startAudio = document.getElementById('start-audio');
const breakAudio = document.getElementById('break-audio');

window.addEventListener("load", function(){ // is being triggered when the page is *fully-loaded*
    resetTimer();
});

// Timer aktualisieren
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function updateStateIndicator() {
  if (isRunning) {
    if (isWorkTime) {
      stateIndicator.textContent = "Work";
      stateIndicator.classList.toggle("transformed-state-work");
      stateIndicator.classList.toggle("transformed-state-none");
    } else {
      stateIndicator.textContent = "Relax";
      stateIndicator.classList.toggle("transformed-state-relax");
    }
  }
}

// Timer starten
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    updateStateIndicator();
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (isWorkTime) {
          breakAudio.play();
        } else {
          startAudio.play();
        }
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
  stateIndicator.textContent = '';
  stateIndicator.classList.toggle("transformed-state-none");
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
  // Zeige die Desktop Benachrichtigung
  if (Notification.permission === 'granted') {
    new Notification(isWorkTime ? 'Break Time!' : 'Work Time!', {
      body: isWorkTime ? 'Time for a break!' : 'Back to Work! :)',
    });
  }

  // Toastify-Benachrichtigung anzeigen
  Toastify({
    text: isWorkTime ? 'Pausenzeit! Zeit für eine Pause!' : 'Arbeitszeit! Zurück an die Arbeit!',
    duration: 5000,
    gravity: 'top',
    position: 'center',
    background: isWorkTime ? '#28a745' : '#dc3545',
  }).showToast();

  // Vibration API verwenden (falls unterstützt)
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]); // Vibrationsmuster: 200ms an, 100ms aus, 200ms an
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
