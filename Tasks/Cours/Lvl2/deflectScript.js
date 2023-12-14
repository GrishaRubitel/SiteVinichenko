let dificulty = 1;
let scores = 0;
let scroeCounter = 1;
let step = 1;
let maxPwr = document.getElementById("pwr").getBoundingClientRect().width;
let pwrElement = document.getElementById("pwr");
var isResizing = false;
var playWindow = document.querySelector('.playWindow');
var ball = document.querySelector('#ball');
let isMouseDown = false;
let isDragging = true;
let blockArr = [];


function getPath() {
    let windowCenterX = ball.getBoundingClientRect().x - playWindow.offsetLeft + 35 / 2;
    let windowCenterY = ball.getBoundingClientRect().y - playWindow.offsetTop + 35 / 2;
    
    let mouseX = event.clientX - playWindow.offsetLeft;
    let mouseY = event.clientY - playWindow.offsetTop;
    let difX = Math.abs(mouseX - windowCenterX);    
    var power = pwrElement.offsetWidth / 50;
    let thirdX;
    let lastX;
    let thirdY;

    mouseX = mouseX >= windowCenterX ? mouseX : windowCenterX + difX;
    mouseY = (mouseY <= windowCenterY + 150) ? mouseY : windowCenterY + 300;
    
    thirdX = mouseX + difX * power * 2;
    lastX = thirdX + difX;

    thirdY = mouseY;
    var lastY = 480;

    return `M${windowCenterX} ${windowCenterY} C ${mouseX},${mouseY} ${thirdX},${thirdY} ${lastX},${lastY}`;
}

document.addEventListener('DOMContentLoaded', function () {
    getRandBallPos(playWindow);
    var trajectory = document.querySelector('#trajectory');

    ball.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        var pwrElement = document.getElementById('pwr');
    
        var isResizing = false;
    
        function resizeElement() {
            if (isResizing) return;
    
            isResizing = true;
    
            pwrElement.style.transition = 'width 3s';
            pwrElement.style.width = '1px';
    
            setTimeout(function () {
                pwrElement.style.width = '50px';
    
                setTimeout(function () {
                    pwrElement.style.width = '1px';
    
                    setTimeout(function () {
                        isResizing = false;
                        pwrElement.style.transition = 'none';
                    }, 1000);
                }, 1000);
            }, 100);
        }
        setTimeout(resizeElement(), 1000);
    });
    
    playWindow.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        trajectory.setAttribute('d', '');
        
        var pathData = getPath();
        console.log(pathData);
        trajectory.setAttribute("d", pathData);

        const newPath = `path('${pathData}')`;
        changePath(newPath, 1000);
    });

    //------------------------------------------------
    //---ЭТОТ БЛОК БОЛЬШЕ НЕ ТРОГАТЬ!!!!!!!!!!!!!!!---
    //------------------------------------------------
    playWindow.addEventListener('mousemove', function (event) {
        if (isMouseDown == true) {
            var pathData = getPath();
            trajectory.setAttribute("d", pathData);
        }
    });
});

function changePath(pathString, speed) {
    const ball = document.getElementById('ball');
    const ring = document.getElementById('ring');
    const playWindow = document.querySelector('.playWindow');

    ball.style.offsetPath = pathString;
    ball.style.offsetRotate = "0deg";

    var x = 0;
    var intervalID = setInterval(function () {
        const difX = playWindow.offsetLeft;
        const difY = playWindow.offsetTop;

        if (ball.getBoundingClientRect().x - playWindow.offsetLeft >= playWindow.offsetWidth && scroeCounter == 1) {
            message("Аут");
            scroeCounter = 0;
        }

        for (var i = 0; i < 3; i++) {
            if (isElementInside(blockArr[i])) {
                scroeCounter = 0;
                message("Попал в красную зону");
            }
        }
        
        if (++x === 50) {
            window.clearInterval(intervalID);
        }
    }, 50);

    const keyframes = [
        { offsetDistance: '0%' },
        { offsetDistance: '100%' }
    ];

    const options = {
        duration: 2000,
        iterations: 1,
    };

    ball.style.top = 0;
    ball.style.left = 0;
    ball.animate(keyframes, options);

    setTimeout(function() {
        ball.style.offsetPath = null;
        getRandBallPos(playWindow);
    }, 2001)
}

function getRandBallPos(playWindow) {
    const ball = document.getElementById('ball');
    var posX = Math.random() * (playWindow.offsetWidth / 6 * 2 - 2 * ball.offsetWidth) + ball.offsetWidth / 2;
    var posY = 460;
    ball.style.top = `${posY}px`;
    ball.style.left = `${posX}px`;
}


function message(text) {
    var messageBlock = document.getElementById("message");
    var line = document.getElementById("messageLine");

    messageBlock.classList.remove("displayMes");
    line.innerHTML = text;
    setTimeout(function() {
        messageBlock.classList.add("displayMes");
    }, 3000)
}

function startTimer() {
    startCountdown()
}

var timeLeft = 20;
var timer;
var resets = 3;

function startCountdown() {
    changeDif();
    clearInterval(timer);

    timeLeft = 20;

    timer = setInterval(function () {
        timeLeft--;

        document.getElementById('timeometr').textContent = timeLeft;

        if (timeLeft <= 0 && resets > 0) {
            resets -= 1;
            if (resets > 0) {
                dificulty += 1;
                startCountdown();
            } else {
                scroeCounter = 0;
                clearInterval(timer);
                finish();
            }
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
        if (accounts[userAccountIndex].l2 < scores) {
            accounts[userAccountIndex].l2 = scores;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            message("Новый рекорд!");
        }
    } else {
        // Пользователь не найден
        console.error("Пользователь не найден");
    }

    var allRecord = getMaxL2Value();

    document.getElementById("ownScore").innerHTML = scores;
    document.getElementById("allRecord").innerHTML = allRecord;

    document.getElementById("end").style.display = "flex";
}

function getMaxL2Value() {
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const maxL2Value = accounts.reduce((maxL2, account) => {
        return Math.max(maxL2, account.l2);
    }, accounts[0].l2);

    return maxL2Value;
}

function createObstacle(dif) {
    var id = 0;
    var rand = Math.floor(Math.random() * 3) + 1 + dif;
    switch (dif) {
        case 1:
            createBlock(248, 500, 100, 250, id++);
            break;
        case 2:
            createBlock(0, 500, 500, 250, id++);
            createBlock(400, 500, 150, 98, id++);
            break;
        case 3:
            createBlock(350, 700, 100, 100, id++);
            createBlock(150, 500, 100, 100, id++);
            break;
        case 4:
            createBlock(398, 650, 200, 100, id++);
            break;
        case 5:
            createBlock(0, 700, 300, 498, id++);
            break;
        case 6:
            createBlock(400, 500, 350, 98, id++);
            createBlock(300, 500, 150, 98, id++);
            break;
        //Хард готовы
        case 7:
            createBlock(348, 500, 300, 150, id++);
            createBlock(0, 500, 300, 150, id++);
            break;
        case 8:
            createBlock(400, 500, 150, 98, id++);
            createBlock(400, 850, 150, 98, id++);
            break;
        case 9:
            createBlock(0, 500, 500, 250, id++);
            createBlock(448, 500, 200, 50, id++);
            createBlock(448, 798, 200, 50, id++);
            break;
    }
    createObstacleBorders();
}

createObstacle(9);

function createBlock(top, left, width, height, id) {

    const block = document.createElement("div");
    block.setAttribute("id", `block${id}`);
    block.classList.add("block");
    block.style.left = `${left}px`;
    block.style.top = `${top}px`;
    block.style.height = `${height}px`;
    block.style.width = `${width}px`;

    playWindow.appendChild(block);
}

function createObstacleBorders() {
    for (var i = 0; i < 3; i++) {
        const block = document.getElementById(`block${i}`);
        if (block) {
            blockArr.push(block);
        }
    }
}

function isElementInside(block) {
    var isInside =
        ball.getBoundingClientRect().x >= block.getBoundingClientRect().left &&
        ball.getBoundingClientRect().y >= block.getBoundingClientRect().top &&
        ball.getBoundingClientRect().x <= block.getBoundingClientRect().right &&
        ball.getBoundingClientRect().y <= block.getBoundingClientRect().bottom;
    return isInside;
}