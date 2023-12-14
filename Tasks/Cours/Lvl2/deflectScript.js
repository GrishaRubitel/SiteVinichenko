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
    mouseY = (mouseY <= windowCenterY + 200) ? mouseY : windowCenterY + 200;
    
    thirdX = mouseX + difX * power * 2;
    lastX = thirdX + difX;

    thirdY = mouseY;
    var lastY = 400 - ball.offsetWidth;

    return `M${windowCenterX} ${windowCenterY} C ${mouseX},${mouseY} ${thirdX},${thirdY} ${lastX},${lastY}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var isProcessing = false;
    // Получаем элементы
    getRandBallPos(playWindow);
    var trajectory = document.querySelector('#trajectory');
    

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
                    }, 1000);
                }, 1000);
            }, 100);
        }
        
        setTimeout(resizeElement(), 1000);
    });
    
    // Обработчик события отпускания кнопки мыши в любом месте окна
    playWindow.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        trajectory.setAttribute('d', ''); // Сбрасываем path при отпускании кнопки
        
        var pathData = getPath();
        console.log(pathData);
        trajectory.setAttribute("d", pathData);

        const newPath = `path('${pathData}')`;
        changePath(newPath, 1000);
        console.log(newPath);
    });

    //------------------------------------------------
    //---ЭТОТ БЛОК БОЛЬШЕ НЕ ТРОГАТЬ!!!!!!!!!!!!!!!---
    //------------------------------------------------
    // Обработчик события перемещения мыши внутри playWindow
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
        getRandBallPos(playWindow);
    }, 2001)
}


function getRandBallPos(playWindow) {
    const ball = document.getElementById('ball');
    var posX = Math.random() * (playWindow.offsetWidth / 2 - ball.offsetWidth) + ball.offsetWidth / 2;
    var posY = 350;
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
