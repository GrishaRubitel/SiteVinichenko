let speed = 5;
let dificulty = 1;
let scores = 0;
let scroeCounter = 1;

const pongBall = document.getElementById("pongball");
const field = document.querySelector(".field");
const rightPaddle = document.getElementById("rightP");
const leftPaddle = document.getElementById("leftP");

let ballX = Math.random() * (field.clientWidth - pongBall.clientWidth);
let ballY = Math.random() * (field.clientHeight - pongBall.clientHeight);
let ballSpeedX = speed;
let ballSpeedY = speed;

let leftPaddleY = leftPaddle.clientHeight;
const paddleSpeed = 15;

let isWKeyPressed = false;
let isSKeyPressed = false;

function setSpeed() {
    ballSpeedX = ballSpeedX > 0 ? ballSpeedX + 3 : ballSpeedX - 3;
    ballSpeedY = ballSpeedY > 0 ? ballSpeedY + 3 : ballSpeedY - 3;
}

function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX >= field.clientWidth - pongBall.clientWidth - 25) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX <= -field.clientWidth + pongBall.clientWidth + 25 && ballY >= leftPaddleY - leftPaddle.clientHeight - 50 && ballY <= leftPaddleY + 50) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY >= field.clientHeight - pongBall.clientHeight  || ballY <= -field.clientHeight + pongBall.clientHeight) {
        ballSpeedY = -ballSpeedY;
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
    pongBall.style.left = `${ballX}px`;
    pongBall.style.top = `${ballY}px`;

    const minYPosition = -field.clientHeight + rightPaddle.clientHeight;
    const maxYPosition = field.clientHeight - rightPaddle.clientHeight;
    rightPaddle.style.top = `${Math.min(Math.max(ballY, minYPosition), maxYPosition)}px`;

    if (isWKeyPressed) {
        leftPaddleY -= paddleSpeed;
    }

    if (isSKeyPressed) {
        leftPaddleY += paddleSpeed;
    }
    leftPaddle.style.top = `${Math.min(Math.max(leftPaddleY, minYPosition), maxYPosition)}px`;
    requestAnimationFrame(updateBallPosition);
}

updateBallPosition();

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

function createAndLaunchBall() {
    let newBallX = Math.random() * (field.clientWidth - pongBall.clientWidth);
    let newBallY = Math.random() * (field.clientHeight - pongBall.clientHeight);
    let newBallSpeedX = speed;
    let newBallSpeedY = speed;

    const newPongBall = document.createElement("span");
    newPongBall.className = "pongball";
    newPongBall.id = "pongball";
    field.appendChild(newPongBall);

    function updateNewBallPosition() {
        newBallX += newBallSpeedX;
        newBallY += newBallSpeedY;

        if (newBallX >= field.clientWidth - newPongBall.clientWidth - 25 || newBallX <= -field.clientWidth + newPongBall.clientWidth + 25) {
            newBallSpeedX = -newBallSpeedX;
        }
        if (newBallY >= field.clientHeight - newPongBall.clientHeight || newBallY <= -field.clientHeight + newPongBall.clientHeight) {
            newBallSpeedY = -newBallSpeedY;
        }

        newPongBall.style.left = `${newBallX}px`;
        newPongBall.style.top = `${newBallY}px`;
        requestAnimationFrame(updateNewBallPosition);
    }
    updateNewBallPosition();
}

startCountdown();


var timeLeft = 30;
var timer;
var resets = 3;

function startCountdown() {
    changeDif();
    clearInterval(timer);
    timeLeft = 30;
    timer = setInterval(function () {
        timeLeft--;

        document.getElementById('timeometr').textContent = timeLeft;

        if (timeLeft <= 0 && resets > 0) {
            message("harder");
            resets -= 1;
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
        if (accounts[userAccountIndex].l3 < scores) {
            accounts[userAccountIndex].l3 = scores;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            message("Новый рекорд!");
        }
    } else {
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

    const maxL3Value = accounts.reduce((maxL3, account) => {
        return Math.max(maxL3, account.l3);
    }, accounts[0].l3);

    return maxL3Value;
}