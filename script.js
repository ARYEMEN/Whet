const flags = [
    { country: 'مصر', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Egypt.svg/1280px-Flag_of_Egypt.svg.png' },
    { country: 'ألمانيا', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png' },
    { country: 'البرازيل', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png' },
    { country: 'الولايات المتحدة', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png' },
    { country: 'اليابان', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png' },
    { country: 'فرنسا', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png' },
    { country: 'إيطاليا', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png' },
    { country: 'الهند', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png' },
    { country: 'كندا', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada.svg/1280px-Flag_of_Canada.svg.png' },
    { country: 'أستراليا', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1280px-Flag_of_Australia.svg.png' },
];

let currentFlag, score = 0, timer, timeLeft, gameInterval, level;
const maxTime = 10; // الزمن الأقصى في كل جولة
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const guessInput = document.getElementById("guess");

function startGame(gameLevel) {
    level = gameLevel;
    score = 0;
    timeLeft = maxTime;
    updateScore();
    document.getElementById("level-container").style.display = "none";
    nextRound();
    startTimer();
}

function nextRound() {
    // اختيار علم عشوائي من الأعلام المتاحة
    currentFlag = flags[Math.floor(Math.random() * flags.length)];
    document.getElementById('flag').style.backgroundImage = `url(${currentFlag.flag})`;
    resultElement.textContent = '';
}

function checkAnswer() {
    const guess = guessInput.value.trim().toLowerCase();
    if (guess === currentFlag.country.toLowerCase()) {
        score += (level === 'easy') ? 1 : (level === 'medium') ? 2 : 3; // النقاط حسب المستوى
        resultElement.textContent = 'إجابة صحيحة!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `الإجابة خاطئة. الإجابة الصحيحة هي: ${currentFlag.country}`;
        resultElement.style.color = 'red';
    }

    updateScore();
    nextRound();
    guessInput.value = ''; // مسح الإدخال بعد كل جولة
}

function updateScore() {
    scoreElement.textContent = `النقاط: ${score}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `الوقت: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            resultElement.textContent = 'انتهى الوقت! أعد المحاولة.';
            resultElement.style.color = 'orange';
            setTimeout(nextRound, 1000); // الانتقال إلى الجولة التالية بعد ثانية
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = maxTime;
    startTimer();
}
