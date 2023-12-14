let dificulty = 1;
let scores = 0;
let scroeCounter = 1;
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
    // Получаем элементы
    var ball = document.querySelector('#ball');
    var trajectory = document.querySelector('#trajectory');

    // Флаг, указывающий, что левая кнопка мыши удерживается
    isMouseDown = false;

    // Обработчик события нажатия на мяч
    ball.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        // Получаем элемент с id "pwr"
        var pwrElement = document.getElementById('pwr');
    
        // Флаг, который указывает, в процессе ли изменения ширины
        var isResizing = false;
    
        // Функция для изменения ширины элемента
        function resizeElement() {
            // Если в процессе изменения ширины, выходим из функции
            if (isResizing) return;
    
            // Устанавливаем флаг в true
            isResizing = true;
    
            // Уменьшаем ширину до 1px за 1 секунду
            pwrElement.style.transition = 'width 1s';
            pwrElement.style.width = '1px';
    
            // Ждем 2 секунды перед восстановлением ширины
            setTimeout(function () {
                // Увеличиваем ширину до 50px за 1 секунду
                pwrElement.style.width = '50px';
    
                // Ждем 1 секунду перед уменьшением ширины
                setTimeout(function () {
                    // Уменьшаем ширину обратно до 1px за 1 секунду
                    pwrElement.style.width = '1px';
    
                    // Ждем 1 секунду перед сбросом флага
                    setTimeout(function () {
                        // Сбрасываем флаг и переустанавливаем transition
                        isResizing = false;
                        pwrElement.style.transition = 'none';
                    }, 2000);
                }, 2000);
            }, 100);
        }
        
        setTimeout(resizeElement(), 1000);
    });
    
    // Обработчик события отпускания кнопки мыши
    ball.addEventListener('mouseup', function (event) {
        // В этом месте вы можете добавить дополнительные действия, если необходимо
        // например, прекратить анимацию или выполнить какие-то другие действия при отпускании кнопки мыши
    });
    
    // Обработчик события отпускания кнопки мыши в любом месте окна
    playWindow.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        trajectory.setAttribute('d', ''); // Сбрасываем path при отпускании кнопки
        
        var pathData = getPath();
        trajectory.setAttribute("d", pathData);
        const newPath = `path('${pathData}')`;
        changePath(newPath, 2000);
        console.log(newPath);
    });

    //------------------------------------------------
    //---ЭТОТ БЛОК БОЛЬШЕ НЕ ТРОГАТЬ!!!!!!!!!!!!!!!---
    //------------------------------------------------
    // Обработчик события перемещения мыши внутри playWindow
    playWindow.addEventListener('mousemove', function (event) {
        if (isMouseDown == true) {
            /*
            var top = ball.getBoundingClientRect().y;
            var left = ball.getBoundingClientRect().x;
            
            var windowCenterX = left - playWindow.offsetLeft + 35 / 2;
            var windowCenterY = top - playWindow.offsetTop + 35 / 2;
            
            var windowCenterX = Math.floor(playWindow.getBoundingClientRect().width / 2 - 1) - 200;
            var windowCenterY =  Math.floor(playWindow.getBoundingClientRect().height / 2 - 1) + 100;
            
            
            var mouseX = event.clientX - playWindow.offsetLeft;
            var mouseY = event.clientY - playWindow.offsetTop;

            if (mouseY >= windowCenterY) { var mouseY = (mouseY <= windowCenterY + 300) ? mouseY : windowCenterY + 300; }
            else { var mouseY = (mouseY >= windowCenterY - 300) ? mouseY : windowCenterY - 300; }

            if (mouseX >= windowCenterX) { var mouseX = (mouseX <= windowCenterX + 300) ? mouseX : windowCenterX + 300; }
            else { var mouseX = (mouseX >= windowCenterX - 300) ? mouseX : windowCenterX - 300; }
            */

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
    message("jopa");
}

function changePath(pathString, speed) {
    const ball = document.getElementById('ball');
    const ring = document.getElementById('ring');
    const playWindow = document.querySelector('.playWindow');

    // Присваиваем CSS-свойство offset-path
    ball.style.offsetPath = pathString;
    // Присваиваем CSS-свойство offset-rotate
    ball.style.offsetRotate = "0deg";

    var x = 0;
    var intervalID = setInterval(function () {
        const difX = playWindow.offsetLeft;
        const difY = playWindow.offsetTop;

        if (ball.getBoundingClientRect().x - difX >= 890 && ball.getBoundingClientRect().x - difX <= 960 &&
            ball.getBoundingClientRect().y - difY >= 222 && ball.getBoundingClientRect().y - difY <= 278 && scroeCounter == 1) {
                message("Попал");
                scores += 100;
                document.getElementById("stat").innerHTML = scores;
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
    // Остановить предыдущий таймер, если он был запущен
    clearInterval(timer);

    // Установить начальное значение таймера
    timeLeft = 20;

    // Запустить новый таймер
    timer = setInterval(function () {
        timeLeft--;

        document.getElementById('timeometr').textContent = timeLeft;

        if (timeLeft <= 0 && resets > 0) {
            resets -= 1;

            // Если еще есть повторения, увеличиваем сложность и запускаем новый таймер
            if (resets > 0) {
                dificulty += 1;

                startCountdown();
            } else {
                // Если повторений больше нет, остановить таймер
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
        // Найден пользователь, обновим значение поля l1
        if (accounts[userAccountIndex].l1 < scores) {
            accounts[userAccountIndex].l1 = scores;
            // Сохраняем изменения в localStorage
            localStorage.setItem('accounts', JSON.stringify(accounts));
            message("Новый рекорд!");
        }
    } else {
        // Пользователь не найден
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

    // Используем метод reduce для нахождения максимального значения l1
    const maxL1Value = accounts.reduce((maxL1, account) => {
        const currentL1 = account.l1 || 0; // Предполагаем, что l1 может быть undefined
        return Math.max(maxL1, currentL1);
    }, accounts[0].l1 || 0); // Используем первое значение l1 в качестве начального значения

    return maxL1Value;
}

let slideSpeed = 5;
let ballCord = ball.clientLeft;
let minXPosition = 35;
let maxXPosition = playWindow.offsetWidth / 2 - ball.offsetWidth / 2;

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

function slideHandler() {
    // Обновляем позицию левой платформы
    if (isWKeyPressed) {
        ballCord -= slideSpeed;
    }

    if (isSKeyPressed) {
        ballCord += slideSpeed;
    }

    ball.style.top = `${Math.min(Math.max(ballCord, minXPosition), maxXPosition)}px`;
    // Запускаем функцию обновления позиции снова через короткий интервал
    requestAnimationFrame(updateBallPosition);
}

slideHandler();