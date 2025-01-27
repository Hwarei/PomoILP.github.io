// Pages init
const pomodoroPage = document.getElementById("pomodoro-page");
const clockPage = document.getElementById("clock-page");
const settingsPage = document.getElementById("settings-panel");
const aboutPage = document.getElementById("about-panel");

const navPomodoro = document.getElementById("pomodoro-nav");
const navClock = document.getElementById("clock-nav");
const navSettings = document.getElementById("settings");
const navAbout = document.getElementById("about");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const currentTime = document.getElementById("current-time");

const customTimeInput = document.getElementById("custom-time");
const setCustomTimeButton = document.getElementById("set-custom-time");

const defaultPomoTime = 25;
const maxPomoTime = 60;

// Timer var
let timerleft = defaultPomoTime * 60;
let interval;
let isRunning = false;

// Tasklist init
const taskInput = document.getElementById("task-input");
const tasksContainer = document.querySelector(".tasks");

// Switch Pages
navPomodoro.addEventListener("click", () => switchPage(pomodoroPage));
navClock.addEventListener("click", () => switchPage(clockPage));
navSettings.addEventListener("click", () => switchPage(settingsPage));
navAbout.addEventListener("click", () => switchPage(aboutPage));

function switchPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    page.classList.add("active");
}

// Custom Time Setting
setCustomTimeButton.addEventListener("click", () => {
    let customTime = parseInt(customTimeInput.value, 10);
    // Check validity
    if (customTime <= 0) {
        customTime = defaultPomoTime;
    } else if (customTime > maxPomoTime) {
            customTime = maxPomoTime;
    }
    timerleft = customTime*60;
    
});

// Pomo Timer function
function updateTimer() {
    let minutes = Math.floor(timerleft / 60);
    let seconds = timerleft % 60;
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
    if (!isRunning) {
        interval = setInterval(() => {
            timerleft--;
            updateTimer();
            if (timerleft === 0) {
                clearInterval(interval);
                alert("Time's Up!");
                timerleft = 1500;
                updateTimer();
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    timerleft = defaultPomoTime*60;
    updateTimer();
    isRunning = false;
}



// Button click event
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// Task list function
document.getElementById("add-task").addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskItem = document.createElement("div");
        taskItem.textContent = taskText;
        taskItem.classList.add("task-item");
        document.querySelector(".tasks").appendChild(taskItem);
        taskInput.value = ""; // Clear input field
    }
});


// / Background Settings
document.getElementById("apply-background").addEventListener("click", () => {
    const bgUrl = document.getElementById("background-image").value;
    if (bgUrl) document.body.style.backgroundImage = `url(${bgUrl})`;
});

document.getElementById("preset-images").addEventListener("change", (e) => {
    const bgUrl = e.target.value;
    if (bgUrl) document.body.style.backgroundImage = `url(${bgUrl})`;
});

// Update Clock
function updateClock() {
    const now = new Date();
    currentTime.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);


// Initialize
updateTimer();
switchPage(pomodoroPage);

















