let ques = [];
let currentQuesIndex = 0;
let score = 0;
let canClick = true;
const maxQues = 10;

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        ques = suffle(data);
    })
    .catch(error => console.error('Error loading questions:', error));

function startGame() {
    score = 0;
    currentQuesIndex = 0;
    canClick = true;
    ques = suffle(ques);
    document.getElementById("start").classList.add('hide');
    document.getElementById("quiz-game").classList.remove('hide');
    displayQues();
}

function displayQues() {
    if (currentQuesIndex >= maxQues) {
        showResult();
        return;
    }

    canClick = true;
    const quesData = ques[currentQuesIndex];
    const quesT = document.getElementById('question');
    const option0T = document.getElementById('op0');
    const option1T = document.getElementById('op1');

    
    quesT.textContent = quesData.question;
    option0T.textContent = quesData.options[0];
    option1T.textContent = quesData.options[1];

    const countT = document.getElementById('count');
    countT.textContent = `Question ${currentQuesIndex + 1} of ${maxQues}`;
}

function buttonClicked(option) {
    if (!canClick) return;
    canClick = false;
    const quesData = ques[currentQuesIndex];
    const button = document.getElementById("op" + option);
    
    if (quesData.answer === option) {
        score++;
        button.classList.add('correct');
    }
    else {
        button.classList.add('wrong');
    }

    setTimeout(() => {
        button.classList.remove('correct', 'wrong');
        currentQuesIndex++;
        displayQues();
    }, 1000);
}

function suffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showResult() {
    document.getElementById("score").classList.remove('hide');

    document.getElementById("quiz-game").classList.add('hide');
    

    let t = (score/maxQues) * 100;

    const scoreT = document.getElementById('progress');
    scoreT.textContent = `${t}%`;
    scoreT.style.background = `
        radial-gradient(closest-side, white 79%, transparent 80% 100%),
        conic-gradient(rgb(143, 195, 255) ${t}%, rgba(0,0,0, 0.05) 0)
    `;

    const msgT = document.getElementById('msg');
    if (t == 100) {
        msgT.textContent = 'Congratulations!';
    }
    else if (t >= 70) {
        msgT.textContent = 'Great job!';
    }
    else if (t >= 50) {
        msgT.textContent = 'You can do better!';
    }
    else {
        msgT.textContent = 'Are you even trying?';
    }
}

function playAgain() {
    score = 0;
    currentQuesIndex = 0;
    ques = suffle(ques);
    document.getElementById("score").classList.add('hide');
    document.getElementById("quiz-game").classList.remove('hide');
    displayQues();
}

function home() {
    document.getElementById("score").classList.add('hide');
    document.getElementById("quiz-game").classList.add('hide');
    document.getElementById("start").classList.remove('hide');
}