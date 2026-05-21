// ===== STATE =====
let workDuration = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;

let timeLeft = workDuration;
let interval = null;
let sessionCount = 0;
let isWork = true;

// ===== ELEMENTS =====
const display = document.getElementById("timer-display");
const sessionType = document.getElementById("session-type");
const completed = document.getElementById("completed");
const sound = document.getElementById("sound");

// ===== UPDATE DISPLAY =====
function updateDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  display.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

// ===== START TIMER =====
function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(interval);
      interval = null;
      sound.play();

      if (isWork) {
        sessionCount++;
        completed.textContent = sessionCount;

        if (sessionCount % 4 === 0) {
          timeLeft = longBreak;
          sessionType.textContent = "Long Break";
        } else {
          timeLeft = shortBreak;
          sessionType.textContent = "Short Break";
        }
      } else {
        timeLeft = workDuration;
        sessionType.textContent = "Work";
      }

      isWork = !isWork;
      updateDisplay();
      startTimer();
    }

    updateDisplay();
  }, 1000);
}

// ===== PAUSE =====
function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

// ===== RESUME =====
function resumeTimer() {
  if (!interval) startTimer();
}

// ===== RESET =====
function resetTimer() {
  pauseTimer();
  isWork = true;
  sessionType.textContent = "Work";
  timeLeft = workDuration;
  updateDisplay();
}

// ===== CONFIGURE DURATIONS =====
document.getElementById("work-input").addEventListener("change", e => {
  workDuration = e.target.value * 60;
  if (isWork) {
    timeLeft = workDuration;
    updateDisplay();
  }
});

document.getElementById("short-input").addEventListener("change", e => {
  shortBreak = e.target.value * 60;
});

document.getElementById("long-input").addEventListener("change", e => {
  longBreak = e.target.value * 60;
});

// ===== BUTTON EVENTS =====
document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("resume").onclick = resumeTimer;
document.getElementById("reset").onclick = resetTimer;

// Initialize
updateDisplay();
