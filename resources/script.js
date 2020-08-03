const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const endGamePopup = document.getElementById('end-game-popup');

// init word
let randomWords;


// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in local storage medium
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium'

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// 
// focus on text on start 
text.focus();

// start counting down 
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to dom
function addWordToDOM() {
    randomWords = getRandomWord();
    word.innerHTML = randomWords;
}

// Update Score
function updateScore() {
    const audio = new Audio('../resources/audio/right.mp3');
    audio.play();
    score++;
    if (score % 10 == 0) {
        audio.pause();
        audio.currentTime = 0;

        const audioWow = new Audio('../resources/audio/wow.mp3');
        audioWow.play();
    }

    scoreElement.innerHTML = score;
}

function updateTime() {
    time--;
    timeElement.innerHTML = `${time}s`;

    if (time === 0) {
        clearInterval(timeInterval);

        // end game
        gameOver();
    }
}

// Game Over,show screen
function gameOver() {
    const audio = new Audio('../resources/audio/gameOver.mp3');
    audio.play();
    endGamePopup.innerHTML = `
    <h1>Time run out</h1>
    <p>Your final score is <span>${score}</span></p>
    <button onclick = "location.reload()">Restart</button>
    `;
    endGamePopup.style.display = 'flex';
}
addWordToDOM();


// Event Listener
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWords) {
        addWordToDOM();
        updateScore();

        // Clear input
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
})


// settings btn click

settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});