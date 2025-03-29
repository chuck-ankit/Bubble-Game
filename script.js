let timer = 60;
let score = 0;
let hitValue = 0;
let timerId;

function makeBubble() {
    let clutter = "";
    // First add the hitValue to ensure it's always present
    clutter += `<div class="bubble">${hitValue}</div>`;
    
    // Then add 79 more random numbers
    for (let i = 0; i < 79; i++) {
        let rn = Math.floor(Math.random() * 100);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    
    // Shuffle the bubbles so the hitValue isn't always first
    let bubblesArray = clutter.split('</div>').filter(item => item.trim() !== '');
    bubblesArray.sort(() => Math.random() - 0.5);
    clutter = bubblesArray.join('</div>') + '</div>';
    
    document.querySelector("#game").innerHTML = clutter;
}

function getNewHit() {
    hitValue = Math.floor(Math.random() * 100);
    document.querySelector("#hitInt").textContent = hitValue;
}

function updateScore() {
    score += 10;
    document.querySelector("#getcore").textContent = score;
}

function runTimer() {
    timer = 60;
    document.querySelector("#timerval").textContent = timer;
    timerId = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerId);
            alert("Time's up! Your score is: " + score);
        }
    }, 1000);
}

function startGame() {
    clearInterval(timerId);
    score = 0;
    document.querySelector("#getcore").textContent = score;
    getNewHit(); // Get hit value first
    makeBubble(); // Then make bubbles that include this hit value
    runTimer();
}

function stopGame() {
    clearInterval(timerId);
    alert("Game stopped! Your score is: " + score);
}

function resetGame() {
    clearInterval(timerId);
    score = 0;
    timer = 60;
    document.querySelector("#getcore").textContent = score;
    document.querySelector("#timerval").textContent = timer;
    getNewHit(); // Get new hit value first
    makeBubble(); // Then make bubbles that include this hit value
}

// Event Listeners
document.querySelector("#start").addEventListener("click", startGame);
document.querySelector("#stop").addEventListener("click", stopGame);
document.querySelector("#reset").addEventListener("click", resetGame);

// Bubble Click Logic
document.querySelector("#game").addEventListener("click", function (e) {
    if (e.target.classList.contains("bubble")) {
        let clickedNumber = parseInt(e.target.textContent);
        if (clickedNumber === hitValue) {
            updateScore();
            getNewHit(); // Get new hit value first
            makeBubble(); // Then make bubbles that include this hit value
        }
    }
});

// Initialize the game
getNewHit(); // Get hit value first
makeBubble(); // Then make bubbles that include this hit value
document.querySelector("#timerval").textContent = timer; // Set initial timer value
document.querySelector("#getcore").textContent = score; // Set initial score value

// Set initial values for timer and score on page load
window.onload = function () {
    timer = 60;
    score = 0;
    document.querySelector("#timerval").textContent = timer;
    document.querySelector("#getcore").textContent = score;
};