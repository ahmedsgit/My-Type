const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficulty = document.getElementById('difficulty');
const endGamePopup = document.getElementById('end-game-popup');


// Empty array to get values from api
let words = [];

// init word
let randomWords;


// init score
let score = 0;

// init time
let time = 10;

async function getData() {
    let response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
    let data = await response.json()
    return data;
}

async function getRandom() {
    const data = await getData();
    words.push(Object.keys(data));
    randomWords = words[0][Math.floor(Math.random() * words[0].length)];
    return randomWords;
}

function addWordToDOM() {
    word.innerHTML = randomWords;
}

getRandom();
setTimeout(() => {
    addWordToDOM();
    console.log(randomWords);
}, 100);

// Event Listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWords) {
        getRandom();
        addWordToDOM();
        score += 1;
        scoreElement.innerHTML = score;
        e.target.value = '';
    }
})