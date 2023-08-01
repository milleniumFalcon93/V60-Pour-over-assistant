// Timer variables
let timerInterval;
let timerRunning = false;
let totalSeconds = 121; // Total timer duration in seconds (2 minutes)
let currentSeconds = 0;
let currentStep = 'PrepareBlooming';
const bloomDuration = 10; // Duration for the blooming pour in seconds
const pourStages = [
  { name: 'First Pour', timestamp: 45 },    // Timestamp for First Pour (in seconds)
  { name: 'Second Pour', timestamp: 70 },   // Timestamp for Second Pour (in seconds)
  { name: 'Third Pour', timestamp: 90 },    // Timestamp for Third Pour (in seconds)
  { name: 'Fourth Pour', timestamp: 110 },  // Timestamp for Fourth Pour (in seconds)
];
const waitIntervals = [15, 60, 80, 100, 120]; // Timestamps for the intervals without pouring stages (in seconds)

// DOM elements
const timerDisplay = document.querySelector('.timer-display');
const currentStepDisplay = document.querySelector('.current-step');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Event listeners
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Functions
function toggleTimer() {
  if (!timerRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  timerRunning = true;
  startBtn.textContent = 'Pause';
  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  timerRunning = false;
  startBtn.textContent = 'Start';
  clearInterval(timerInterval);
}

function updateTimer() {
  if (currentSeconds < totalSeconds) {
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;

    checkPourStages();
    currentSeconds++; // Increment the currentSeconds after checking the condition
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
    startBtn.textContent = 'Start';
    currentStep = 'Complete';
    currentStepDisplay.textContent = 'All Steps Completed';
    currentSeconds = totalSeconds; // Set currentSeconds to totalSeconds to display 2:00
  }
}

function checkPourStages() {
  if (currentSeconds === 0) {
    currentStep = 'PrepareBlooming';
    currentStepDisplay.textContent = 'Prepare for Blooming Pour';
  } else if (currentSeconds === bloomDuration) {
    currentStep = 'Blooming';
    currentStepDisplay.textContent = 'Blooming Pour (50 ml) and Gently Stir';
  } else if (currentSeconds === 15) {
    currentStep = 'LetBloom';
    currentStepDisplay.textContent = 'Let it Bloom';
  } else if (currentSeconds === 45) {
    currentStep = 'FirstPour';
    currentStepDisplay.textContent = 'First Pour (50 ml)';
  } else if (currentSeconds === 60) {
    currentStep = 'Pause1';
    currentStepDisplay.textContent = 'Pause';
  } else if (currentSeconds === 70) {
    currentStep = 'SecondPour';
    currentStepDisplay.textContent = 'Second Pour (50 ml)';
  } else if (currentSeconds === 80) {
    currentStep = 'Pause2';
    currentStepDisplay.textContent = 'Pause';
  } else if (currentSeconds === 90) {
    currentStep = 'ThirdPour';
    currentStepDisplay.textContent = 'Third Pour (50 ml)';
  } else if (currentSeconds === 100) {
    currentStep = 'Pause3';
    currentStepDisplay.textContent = 'Pause';
  } else if (currentSeconds === 110) {
    currentStep = 'FourthPour';
    currentStepDisplay.textContent = 'Fourth Pour (50 ml)';
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  currentSeconds = 0;
  currentStep = 'PrepareBlooming';
  timerDisplay.textContent = '00:00';
  currentStepDisplay.textContent = 'Prepare for Blooming Pour';
  startBtn.textContent = 'Start';
}

// Initialize the timer display
timerDisplay.textContent = '00:00';
