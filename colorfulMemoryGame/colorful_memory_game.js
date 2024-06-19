// 设定颜色数组
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];

// 设定变量
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 60;
let gameInterval;

// 获取页面元素
const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

// 洗牌函数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 检查是否匹配
function checkMatch() {
    const [card1, card2] = selectedCards;
    // If the colors match, add the 'matched' class to both cards
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?'; // 隐藏卡片
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    selectedCards = []; // 清空selectedCards数组
}

// 点击卡片事件
function handleCardClick(event) {
    const card = event.target;

    // 忽略已经匹配的卡片和已经选择的卡片
    if (card.classList.contains('matched') || selectedCards.includes(card)) {
        return;
    }
    
    
    card.style.backgroundColor = card.dataset.color;
    card.textContent = card.dataset.color;
    
    selectedCards.push(card);
    
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function startGame() {
    let timeLeft = 60;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}

startbtn.addEventListener('click', startGame);