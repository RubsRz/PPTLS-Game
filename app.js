// Variables del juego
const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const icons = {
    rock: "fas fa-hand-rock",
    paper: "fas fa-hand-paper",
    scissors: "fas fa-hand-scissors",
    lizard: "fa-solid fa-hand-lizard",
    spock: "fas fa-hand-spock"
};

const resultText = document.getElementById("result-text");
const userImg = document.getElementById("user-img");
const cpuImg = document.getElementById("cpu-img");
const userScoreEl = document.getElementById("user-score");
const cpuScoreEl = document.getElementById("cpu-score");
const resetBtn = document.getElementById("reset-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesPanel = document.querySelector(".rules-panel");
const closeRulesBtn = document.querySelector(".close-rules");

// Matriz de resultados
const gameRules = [
    [0, 2, 1, 1, 2], // Piedra
    [1, 0, 2, 2, 1], // Papel
    [2, 1, 0, 1, 2], // Tijera
    [2, 1, 2, 0, 1], // Lagarto
    [1, 2, 1, 2, 0]  // Spock
];

// Puntuaciones
let userScore = 0;
let cpuScore = 0;

// Textos de resultado
const resultMessages = {
    win: ["¡GANASTE!", "¡BIEN HECHO!", "¡VICTORIA!", "¡LO LOGRASTE!"],
    lose: ["PERDISTE", "¡OH NO!", "DERROTA", "INTÉNTALO DE NUEVO"],
    draw: ["EMPATE", "¡IGUALADOS!", "NADIE GANA", "OTRA VEZ"]
};

// Efectos de animación
let animationInterval;
let animationCount = 0;

// Inicializar el juego
function init() {
    userScore = 0;
    cpuScore = 0;
    updateScores();
    resetGameDisplay();
}

// Función principal del juego
async function playGame(playerChoice) {
    // Deshabilitar botones durante el juego
    disableButtons(true);
    
    // Mostrar elección del jugador
    showChoice(userImg, choices[playerChoice]);
    
    // Animación de la computadora pensando
    await animateComputerChoice();
    
    // Elección aleatoria de la computadora
    const computerChoice = Math.floor(Math.random() * 5);
    showChoice(cpuImg, choices[computerChoice]);
    
    // Determinar el resultado
    const result = gameRules[playerChoice][computerChoice];
    
    // Mostrar resultado
    displayResult(result);
    
    // Actualizar puntuación
    updateScore(result);
    
    // Habilitar botones de nuevo
    disableButtons(false);
}

// Mostrar una elección en el DOM
function showChoice(element, choice) {
    element.innerHTML = `<i class="${icons[choice]} choice-icon"></i>`;
}

// Animación de la computadora "pensando"
function animateComputerChoice() {
    return new Promise((resolve) => {
        animationCount = 0;
        animationInterval = setInterval(() => {
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            cpuImg.innerHTML = `<i class="${icons[randomChoice]} choice-icon"></i>`;
            animationCount++;
            
            if (animationCount > 10) {
                clearInterval(animationInterval);
                resolve();
            }
        }, 100);
    });
}

// Mostrar el resultado
function displayResult(result) {
    // Remover clases anteriores
    resultText.classList.remove("win", "lose", "draw");
    
    let randomMessage = "";
    if (result === 1) {
        resultText.classList.add("win");
        randomMessage = resultMessages.win[Math.floor(Math.random() * resultMessages.win.length)];
    } else if (result === 2) {
        resultText.classList.add("lose");
        randomMessage = resultMessages.lose[Math.floor(Math.random() * resultMessages.lose.length)];
    } else {
        resultText.classList.add("draw");
        randomMessage = resultMessages.draw[Math.floor(Math.random() * resultMessages.draw.length)];
    }
    
    resultText.textContent = randomMessage;
}

// Actualizar puntuación
function updateScore(result) {
    if (result === 1) {
        userScore++;
    } else if (result === 2) {
        cpuScore++;
    }
    updateScores();
}

// Actualizar marcadores
function updateScores() {
    userScoreEl.textContent = userScore;
    cpuScoreEl.textContent = cpuScore;
}

// Resetear la pantalla del juego
function resetGameDisplay() {
    userImg.innerHTML = '<i class="fas fa-question"></i>';
    cpuImg.innerHTML = '<i class="fas fa-question"></i>';
    resultText.textContent = "¡Escoge tu jugada!";
    resultText.classList.remove("win", "lose", "draw");
}

// Deshabilitar/habilitar botones
function disableButtons(disabled) {
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(button => {
        button.disabled = disabled;
    });
}

// Event Listeners
resetBtn.addEventListener("click", init);

rulesBtn.addEventListener("click", () => {
    rulesPanel.classList.toggle("hidden");
});

closeRulesBtn.addEventListener("click", () => {
    rulesPanel.classList.add("hidden");
});

// Cerrar panel de reglas al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!rulesPanel.contains(e.target) && e.target !== rulesBtn) {
        rulesPanel.classList.add("hidden");
    }
});

// Inicializar el juego al cargar
window.addEventListener("DOMContentLoaded", init);