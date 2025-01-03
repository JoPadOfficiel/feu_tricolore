const COLORS = ['red', 'orange', 'green'];
const TIMINGS = { red: 5, orange: 2, green: 5 };

// Sélection des éléments du DOM
const lights = document.querySelectorAll('.light');
const autoBtn = document.getElementById('auto-btn');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');

// Variables de contrôle
let currentIndex = 0;
let isAutoMode = false;
let countdown = null;
let timeLeft = 0;

// Mise à jour visuelle des lumières
function updateLight() {
    lights.forEach(light => light.classList.remove('active'));
    const currentColor = COLORS[currentIndex];
    const currentLight = document.querySelector(`.${currentColor}`);
    currentLight.classList.add('active');
    timerDisplay.textContent = TIMINGS[currentColor];
}

// Gestion du passage à la couleur suivante
function nextColor() {
    currentIndex = (currentIndex + 1) % COLORS.length;
    updateLight();
    if (isAutoMode) {
        startCountdown();
    }
}

function updateCountdown() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(countdown);
        if (isAutoMode) {
            nextColor();
        }
    }
}

function startCountdown() {
    if (countdown) {
        clearInterval(countdown);
    }
    
    const currentColor = COLORS[currentIndex];
    timeLeft = TIMINGS[currentColor];
    timerDisplay.textContent = timeLeft;
    countdown = setInterval(updateCountdown, 1000);
}

function startAutoMode() {
    isAutoMode = true;
    nextBtn.disabled = true;
    autoBtn.textContent = 'Arrêter';
    startCountdown();
}

// Arrêt du mode automatique
function stopAutoMode() {
    isAutoMode = false;
    if (countdown) {
        clearInterval(countdown);
    }
    nextBtn.disabled = false;
    autoBtn.textContent = 'Mode Auto';
    updateLight();
}

// Basculement entre mode auto et manuel
function toggleAutoMode() {
    if (isAutoMode) {
        stopAutoMode();
    } else {
        startAutoMode();
    }
}

// Initialisation des écouteurs d'événements
function initializeEventListeners() {
    autoBtn.addEventListener('click', toggleAutoMode);
    nextBtn.addEventListener('click', nextColor);
}

function initializeTrafficLight() {
    updateLight();
    initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initializeTrafficLight);