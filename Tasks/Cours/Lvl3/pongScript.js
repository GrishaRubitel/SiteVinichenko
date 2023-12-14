let speed = 5;
let dificulty = 1;
let scores = 0;
let scroeCounter = 1;

// Получаем элементы мяча и поля
const pongBall = document.getElementById("pongball");
const field = document.querySelector(".field");
const rightPaddle = document.getElementById("rightP");
const leftPaddle = document.getElementById("leftP");

// Устанавливаем начальные координаты и скорость мяча
let ballX = Math.random() * (field.clientWidth - pongBall.clientWidth);
let ballY = Math.random() * (field.clientHeight - pongBall.clientHeight);
let ballSpeedX = speed; // Горизонтальная скорость мяча
let ballSpeedY = speed; // Вертикальная скорость мяча

// Устанавливаем начальные координаты и скорость левой платформы
let leftPaddleY = leftPaddle.clientHeight;
const paddleSpeed = 15; // Скорость движения платформы

// Флаги для отслеживания состояния клавиш
let isWKeyPressed = false;
let isSKeyPressed = false;

function setSpeed() {
    ballSpeedX = ballSpeedX > 0 ? ballSpeedX + 3 : ballSpeedX - 3;
    ballSpeedY = ballSpeedY > 0 ? ballSpeedY + 3 : ballSpeedY - 3;
}

// Функция для обновления позиции мяча и обработки отскоков
function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Проверяем столкновение с границами поля
    if (ballX >= field.clientWidth - pongBall.clientWidth - 25) {
        ballSpeedX = -ballSpeedX; // Меняем направление по горизонтали
    }
    if (ballX <= -field.clientWidth + pongBall.clientWidth + 25 && ballY >= leftPaddleY - leftPaddle.clientHeight - 50 && ballY <= leftPaddleY + 50) {
        ballSpeedX = -ballSpeedX; // Меняем направление по горизонтали
    }
    if (ballY >= field.clientHeight - pongBall.clientHeight  || ballY <= -field.clientHeight + pongBall.clientHeight) {
        ballSpeedY = -ballSpeedY; // Меняем направление по вертикали
    }
    if (ballX < -field.clientWidth + pongBall.clientWidth) {
        timeLeft = 0;
        resets = 0;
        clearInterval(timer);
        finish();
        ballSpeedX = 0;
        ballSpeedY = 0;
        ballX = -field.clientWidth + pongBall.clientWidth + 1;
    }
    // Обновляем позицию мяча
    pongBall.style.left = `${ballX}px`;
    pongBall.style.top = `${ballY}px`;

    // Обновляем позицию правой ракетки (rightP)
    const minYPosition = -field.clientHeight + rightPaddle.clientHeight;
    const maxYPosition = field.clientHeight - rightPaddle.clientHeight;
    rightPaddle.style.top = `${Math.min(Math.max(ballY, minYPosition), maxYPosition)}px`;

    // Обновляем позицию левой платформы
    if (isWKeyPressed) {
        leftPaddleY -= paddleSpeed;
    }

    if (isSKeyPressed) {
        leftPaddleY += paddleSpeed;
    }

    leftPaddle.style.top = `${Math.min(Math.max(leftPaddleY, minYPosition), maxYPosition)}px`;

    // Запускаем функцию обновления позиции снова через короткий интервал
    requestAnimationFrame(updateBallPosition);
}

// Запускаем функцию обновления позиции мяча
updateBallPosition();

// Обработчики событий для нажатия и отпускания клавиш
window.addEventListener("keydown", function (event) {
    if (event.keyCode === 87) {
        isWKeyPressed = true;
    }
    if (event.keyCode === 83) {
        isSKeyPressed = true;
    }
});

window.addEventListener("keyup", function (event) {
    if (event.keyCode === 87) {
        isWKeyPressed = false;
    }
    if (event.keyCode === 83) {
        isSKeyPressed = false;
    }
});

// Функция для создания и запуска нового мяча
function createAndLaunchBall() {
    // Устанавливаем начальные координаты и скорость нового мяча
    let newBallX = Math.random() * (field.clientWidth - pongBall.clientWidth);
    let newBallY = Math.random() * (field.clientHeight - pongBall.clientHeight);
    let newBallSpeedX = speed;
    let newBallSpeedY = speed;

    // Создаем новый мяч
    const newPongBall = document.createElement("span");
    newPongBall.className = "pongball";
    newPongBall.id = "pongball"; // Добавляем уникальный идентификатор
    field.appendChild(newPongBall);

    // Запускаем функцию обновления позиции нового мяча
    function updateNewBallPosition() {
        newBallX += newBallSpeedX;
        newBallY += newBallSpeedY;

        // Проверяем столкновение с границами поля
        if (newBallX >= field.clientWidth - newPongBall.clientWidth - 25 || newBallX <= -field.clientWidth + newPongBall.clientWidth + 25) {
            newBallSpeedX = -newBallSpeedX; // Меняем направление по горизонтали
        }
        if (newBallY >= field.clientHeight - newPongBall.clientHeight || newBallY <= -field.clientHeight + newPongBall.clientHeight) {
            newBallSpeedY = -newBallSpeedY; // Меняем направление по вертикали
        }

        // Обновляем позицию нового мяча
        newPongBall.style.left = `${newBallX}px`;
        newPongBall.style.top = `${newBallY}px`;

        // Запускаем функцию обновления позиции снова через короткий интервал
        requestAnimationFrame(updateNewBallPosition);
    }

    // Запускаем функцию обновления позиции нового мяча
    updateNewBallPosition();
}

startCountdown();


var timeLeft = 30;
var timer;
var resets = 3;

function startCountdown() {
    changeDif();
    // Остановить предыдущий таймер, если он был запущен
    clearInterval(timer);

    // Установить начальное значение таймера
    timeLeft = 30;

    // Запустить новый таймер
    timer = setInterval(function () {
        timeLeft--;

        document.getElementById('timeometr').textContent = timeLeft;

        if (timeLeft <= 0 && resets > 0) {
            message("harder");
            resets -= 1;
            // Если еще есть повторения, увеличиваем сложность и запускаем новый таймер
            if (resets > 0) {
                speed += 3;
                setSpeed();
                dificulty += 1;
                changeDif();
                startCountdown();
                for (var i = 0; i < speed; i++) {
                    setTimeout(createAndLaunchBall(), 50);
                }
            } else {
                // Если повторений больше нет, остановить таймер
                speed = 0;
                setSpeed();
                scroeCounter = 0;
                clearInterval(timer);
                finish();
            }
        }
        if (scroeCounter == 1) {
            scores += 20;
            document.getElementById("stat").innerHTML = scores;
        }
    }, 1000);
}

function changeDif() {
    var difT = document.getElementById("dificulty")
    switch (dificulty) {
        case 1:
            difT.innerHTML = "EASY";
            difT.style.color = "green";
            break;
        case 2:
            difT.innerHTML = "NORM";
            difT.style.color = "orange";
            break;
        case 3:
            difT.innerHTML = "HARD";
            difT.style.color = "red";
            break;
    }
}

function finish() {
    var login = document.getElementById("nickname").innerHTML;
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const userAccountIndex = accounts.findIndex(account => account.login === login);

    if (userAccountIndex !== -1) {
        // Найден пользователь, обновим значение поля l1
        if (accounts[userAccountIndex].l3 < scores) {
            accounts[userAccountIndex].l3 = scores;
            // Сохраняем изменения в localStorage
            localStorage.setItem('accounts', JSON.stringify(accounts));
            message("Новый рекорд!");
        }
    } else {
        // Пользователь не найден
        console.error("Пользователь не найден");
    }

    var allRecord = getMaxL3Value();

    document.getElementById("ownScore").innerHTML = scores;
    document.getElementById("allRecord").innerHTML = allRecord;

    document.getElementById("end").style.display = "flex";
}

function getMaxL3Value() {
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    // Используем метод reduce для нахождения максимального значения l1
    const maxL3Value = accounts.reduce((maxL3, account) => {
        const currentL3 = account.l3 || 0; // Предполагаем, что l1 может быть undefined
        return Math.max(maxL3, currentL3);
    }, accounts[0].l3 || 0); // Используем первое значение l1 в качестве начального значения

    return maxL3Value;
}

function getMaxL1Value() {
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    // Используем метод reduce для нахождения максимального значения l1
    const maxL1Value = accounts.reduce((maxL1, account) => {
        const currentL1 = account.l1 || 0; // Предполагаем, что l1 может быть undefined
        return Math.max(maxL1, currentL1);
    }, accounts[0].l1 || 0); // Используем первое значение l1 в качестве начального значения

    return maxL1Value;
}

