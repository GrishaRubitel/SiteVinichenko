let dificulty = 1;
let scores = 0;
let scroeCounter = 1;
let checkOut = 1;
let step = 1;
let maxPwr = document.getElementById("pwr").getBoundingClientRect().width;
let pwrElement = document.getElementById("pwr");
let playWindow = document.querySelector('.playWindow');
var isResizing = false;
let isMouseDown;

function getPath() {
    let windowCenterX = ball.getBoundingClientRect().x - playWindow.offsetLeft + 35 / 2;
    let windowCenterY = ball.getBoundingClientRect().y - playWindow.offsetTop + 35 / 2;        
    let mouseX = event.clientX - playWindow.offsetLeft;
    let mouseY = event.clientY - playWindow.offsetTop;

    let difX = (mouseX - windowCenterX) * dificulty / 3;
    let difY = (mouseY - windowCenterY) * dificulty / 3;

    mouseX = mouseX;
    
    var power = pwrElement.offsetWidth / 50;
    let thirdX;
    let lastX;
    let thirdY;

    function checkY(minPluh) {
        if (mouseY <= windowCenterY) {
            mouseY = (mouseY <= windowCenterY + 300) ? mouseY : windowCenterY + 300;
            thirdX = mouseX + (mouseX * power) * minPluh;
            thirdY = mouseY + (mouseY * power);
            lastX = thirdX + (mouseX * power) * minPluh;
        } else { 
            mouseY = (mouseY >= windowCenterY - 300) ? mouseY : windowCenterY - 300; 
            thirdX = mouseX + difX * minPluh;
            lastX = thirdX;
            thirdY = mouseY;
        }
    }        

    if (mouseX >= windowCenterX) {
        mouseX = (mouseX <= windowCenterX + 300) ? mouseX : windowCenterX + 300;
        checkY(1);
    } else if (mouseX < windowCenterX) {
        mouseX = (mouseX >= windowCenterX - 300) ? mouseX : windowCenterX - 300;
        checkY(-1);
    }
    var lastY = 560;
    return `M${windowCenterX} ${windowCenterY} C ${mouseX},${mouseY} ${thirdX},${thirdY} ${lastX},${lastY}`;
}

document.addEventListener('DOMContentLoaded', function () {
    getRandBallPos(dificulty);
    var ball = document.querySelector('#ball');
    var trajectory = document.querySelector('#trajectory');
    isMouseDown = false;

    ball.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        var pwrElement = document.getElementById('pwr');
        var isResizing = false;
    
        function resizeElement() {
            if (isResizing) return;
            isResizing = true;
    
            pwrElement.style.transition = 'width 2s';
            pwrElement.style.width = '1px';
    
            setTimeout(function () {
                pwrElement.style.width = '50px';
    
                setTimeout(function () {
                    pwrElement.style.width = '1px';
    
                    setTimeout(function () {
                        isResizing = false;
                        pwrElement.style.transition = 'none';
                    }, 2000);
                }, 2000);
            }, 100);
        }
        
        setTimeout(resizeElement(), 1000);
    });
    
    playWindow.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        trajectory.setAttribute('d', '');
        
        var pathData = getPath();
        trajectory.setAttribute("d", pathData);
        const newPath = `path('${pathData}')`;
        changePath(newPath, 2000);
        console.log(newPath);
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

while (isMouseDown == true) {
    var pwr = document.getElementById("pwr");
    if (pwr.getBoundingClientRect().width == 1 || pwr.getBoundingClientRect().width == 50) {
        step *= -1;
    }
    console.log(pwr.getBoundingClientRect().width);

    pwr.style.width = + step;
    power = pwr.getBoundingClientRect().width / 50;
}

function changePath(pathString) {
    const ball = document.getElementById('ball');
    const ring = document.getElementById('ring');
    const playWindow = document.querySelector('.playWindow');

    ball.style.offsetPath = pathString;
    ball.style.offsetRotate = "0deg";

    var x = 0;
    var intervalID = setInterval(function () {
        const difX = playWindow.offsetLeft;
        const difY = playWindow.offsetTop;

        if (ball.getBoundingClientRect().x - difX >= 890 && ball.getBoundingClientRect().x - difX <= 950 &&
            ball.getBoundingClientRect().y - difY >= 215 && ball.getBoundingClientRect().y - difY <= 278 && scroeCounter == 1) {
                message("Попадание");
                scores += 100;
                document.getElementById("stat").innerHTML = scores;
                checkOut = 0;
                scroeCounter = 0;
        }

        if (ball.getBoundingClientRect().x >= playWindow.offsetWidth + playWindow.offsetLeft && checkOut == 1) {
            message("Аут");
        }
        
        if (++x == 50) {
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
        getRandBallPos(dificulty);
    }, 2001)
}

function getRandBallPos(dif) {
    const ball = document.getElementById('ball');
    var posX = 750 - (250 * dif) + 250 * Math.random();
    var posY;
    if (dif == 3) {
        posY = 400 - Math.random() * 250;
    } else {
        posY = Math.random() * 500;
    }
    ball.style.top = `${posY}px`;
    ball.style.left = `${posX}px`;
    checkOut = 1;
    scroeCounter = 1;
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

    // Запустить новый таймер
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
        if (accounts[userAccountIndex].l1 < scores) {
            accounts[userAccountIndex].l1 = scores;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            message("Новый рекорд!");
        }
    } else {
        console.error("Пользователь не найден");
    }

    var allRecord = getMaxL1Value();

    document.getElementById("ownScore").innerHTML = scores;
    document.getElementById("allRecord").innerHTML = allRecord;

    document.getElementById("end").style.display = "flex";
}

function getMaxL1Value() {
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const maxL1Value = accounts.reduce((maxL1, account) => {
        return Math.max(maxL1, account.l1);
    }, accounts[0].l1);

    return maxL1Value;
}
