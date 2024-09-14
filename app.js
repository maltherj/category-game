let categories = [];
let currentLetter = '';
let timer;
let timeLeft = 50;
let playerInputs = [];
let numPlayers = 2; // Antal spillere for testformål, kan udvides

document.getElementById('start-game-btn').addEventListener('click', setupCategories);

// Trin for at vælge kategorier
function setupCategories() {
    categories = [
        document.getElementById('category1').value,
        document.getElementById('category2').value,
        document.getElementById('category3').value,
        document.getElementById('category4').value,
        document.getElementById('category5').value,
    ];

    if (categories.some(cat => cat === '')) {
        alert('Udfyld venligst alle kategorier!');
        return;
    }

    document.getElementById('category-setup-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    startRound();
}

function startRound() {
    currentLetter = getRandomLetter();
    document.getElementById('current-letter').textContent = currentLetter;
    createGameTable();
    startTimer();
}

function createGameTable() {
    const table = document.getElementById('game-table');
    table.innerHTML = '';

    const headerRow = document.createElement('tr');
    categories.forEach(category => {
        const th = document.createElement('th');
        th.textContent = category;
        headerRow.appendChild(th);
    });
    const pointsHeader = document.createElement('th');
    pointsHeader.textContent = 'Point';
    headerRow.appendChild(pointsHeader);
    table.appendChild(headerRow);

    for (let i = 0; i < numPlayers; i++) {
        const playerRow = document.createElement('tr');
        categories.forEach(() => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('player-input');
            td.appendChild(input);
            playerRow.appendChild(td);
        });

        const pointsCell = document.createElement('td');
        pointsCell.textContent = '0';
        playerRow.appendChild(pointsCell);
        table.appendChild(playerRow);
    }

    document.getElementById('submit-btn').style.display = 'block';
}

function startTimer() {
    timeLeft = 50;
    document.getElementById('time-left').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleSubmit();
        }
    }, 1000);
}

document.getElementById('submit-btn').addEventListener('click', handleSubmit);

function handleSubmit() {
    clearInterval(timer);
    const inputs = document.querySelectorAll('.player-input');
    inputs.forEach(input => input.disabled = true);
    document.getElementById('submit-btn').style.display = 'none';

    showResults();
}

function showResults() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    // Implement result comparison and point scoring here
}

document.getElementById('next-round-btn').addEventListener('click', () => {
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    startRound();
});

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}
