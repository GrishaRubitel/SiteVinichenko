function message(text) {
    var messageBlock = document.getElementById("message");
    var line = document.getElementById("messageLine");

    messageBlock.classList.remove("displayMes");
    line.innerHTML = text;
    setTimeout(function() {
        messageBlock.classList.add("displayMes");
    }, 3000)
}

// Функция для получения переменной из параметров URL
function getVariableFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var variable = urlParams.get("player");

    var playerData = getUserData(variable);
    document.getElementById("nickname").innerHTML = playerData.login;
    document.getElementById("recordValue").innerHTML = playerData.record;
}

getVariableFromUrl();

function goToAuth() {
    window.location.href = "../Authorisation/authIndex.html";
}

function getUserData(login) {
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const userAccount = accounts.find(account => account.login === login);

    if (userAccount) {
        const userData = {
            login: userAccount.login,
            record: userAccount.l1 + userAccount.l2 + userAccount.l3 
        };
        return userData;
    } else {
        return null; // Если аккаунт не найден
    }
}

function goToLvl(lvl) {
    var login = document.getElementById("nickname").innerHTML;
    lvl = parseInt(lvl);
    var newPagePath;
    switch (lvl) {
        case 0:
            newPagePath = "../MainPage/mainPage.html";
            break;
        case 1:
            newPagePath = "../Lvl1/gamePage.html";
            break;
        case 2:
            newPagePath = "../Lvl2/deflect.html";
            break;
        case 3:
            newPagePath = "../Lvl3/pongBrief.html";
            break;
        case 4:
            newPagePath = "pong.html";
            break;
        case 5:
            newPagePath = "../Results/resultsPage.html";
            break;
        case 999:
            window.location.href = "../../../index.html";
            break;
    }
    window.location.href = newPagePath + "?player=" + encodeURIComponent(login);
}

function startLevel() {
    document.getElementById("start").style.display = "none";
    startTimer();
}