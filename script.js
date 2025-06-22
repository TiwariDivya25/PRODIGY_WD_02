let timerDisplay = document.querySelector(".timerDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let lapList = document.getElementById("lapList");
let startCountdownBtn = document.getElementById("startCountdown");

let countdownMinutes = document.getElementById("countdownMinutes");
let countdownSeconds = document.getElementById("countdownSeconds");

let msec = 0, secs = 0, mins = 0;
let timerId = null;
let lapCounter = 1;

// Stopwatch Timer
function startTimer() {
  msec++;
  if (msec === 100) {
    msec = 0;
    secs++;
    if (secs === 60) {
      secs = 0;
      mins++;
    }
  }

  updateDisplay(mins, secs, msec);
}

function updateDisplay(mins, secs, msec) {
  let msecStr = msec < 10 ? `0${msec}` : msec;
  let secsStr = secs < 10 ? `0${secs}` : secs;
  let minsStr = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsStr}:${secsStr}:${msecStr}`;
}

// Start Button
startBtn.addEventListener("click", () => {
  if (timerId !== null) clearInterval(timerId);
  timerId = setInterval(startTimer, 10);
});

// Stop Button
stopBtn.addEventListener("click", () => clearInterval(timerId));

// Reset Button
resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  msec = 0;
  secs = 0;
  mins = 0;
  lapCounter = 1;
  timerDisplay.innerHTML = "00:00:00";
  lapList.innerHTML = "";
  countdownMinutes.value = "";
  countdownSeconds.value = "";
});

// Lap Button
lapBtn.addEventListener("click", () => {
  let msecStr = msec < 10 ? `0${msec}` : msec;
  let secsStr = secs < 10 ? `0${secs}` : secs;
  let minsStr = mins < 10 ? `0${mins}` : mins;

  let lapTime = `${minsStr}:${secsStr}:${msecStr}`;
  let li = document.createElement("li");
  li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
  lapList.appendChild(li);
});

// Countdown
startCountdownBtn.addEventListener("click", () => {
  clearInterval(timerId);
  let totalSeconds = parseInt(countdownMinutes.value || 0) * 60 + parseInt(countdownSeconds.value || 0);

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert("Enter a valid time.");
    return;
  }

  mins = Math.floor(totalSeconds / 60);
  secs = totalSeconds % 60;
  msec = 0;

  updateDisplay(mins, secs, msec);

  timerId = setInterval(() => {
    if (mins === 0 && secs === 0 && msec === 0) {
      clearInterval(timerId);
      alert("⏰ Countdown finished!");
      return;
    }

    if (msec === 0) {
      if (secs === 0) {
        mins--;
        secs = 59;
      } else {
        secs--;
      }
      msec = 99;
    } else {
      msec--;
    }

    updateDisplay(mins, secs, msec);
  }, 10);
});
