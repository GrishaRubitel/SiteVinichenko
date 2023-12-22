// Функция для получения переменной из параметров URL
function getVariableFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var variable = urlParams.get("player");

    var playerData = getUserData(variable);
    document.getElementById("nickname").innerHTML = playerData.login;
    document.getElementById("recordValue").innerHTML = parseInt(playerData.l1) + parseInt(playerData.l2) + parseInt(playerData.l3);
}

getVariableFromUrl();
processLocalStorage();

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
            l1: userAccount.l1,
            l2: userAccount.l2,
            l3: userAccount.l3
        };
        return userData;
    } else {
        return null;
    }
}

function createListItems(userData) {
    var historyList = document.getElementById("historyList");
    var listItem = document.createElement("li");
    listItem.className = "listItem";
    var playerInfo = document.createElement("span");
    playerInfo.className = "listPlaya";

    var playerName = document.createElement("h5");
    playerName.textContent = "Player";

    var nicknameBlock = document.createElement("div");
    nicknameBlock.className = "listBlock";
    nicknameBlock.textContent = userData.login;

    playerInfo.appendChild(playerName);
    playerInfo.appendChild(nicknameBlock);
    var totalInfo = document.createElement("span");
    totalInfo.id = "Total";

    var totalName = document.createElement("h5");
    totalName.textContent = "Total";

    var totalBlock = document.createElement("div");
    totalBlock.className = "listBlock";
    totalBlock.textContent = parseInt(userData.l1) + parseInt(userData.l2) + parseInt(userData.l3);

    totalInfo.appendChild(totalName);
    totalInfo.appendChild(totalBlock);

    listItem.appendChild(playerInfo);

    for (var i = 1; i <= 3; i++) {
        var levelInfo = document.createElement("span");
        levelInfo.id = "lvl" + i;

        var levelName = document.createElement("h5");
        levelName.textContent = "LVL" + i;

        var levelBlock = document.createElement("div");
        levelBlock.className = "listBlock";
        levelBlock.textContent = userData["l" + i];

        levelInfo.appendChild(levelName);
        levelInfo.appendChild(levelBlock);

        listItem.appendChild(levelInfo);
    }

    listItem.appendChild(totalInfo);

    historyList.appendChild(listItem);
}

function processLocalStorage() {
    const localStorageData = localStorage.getItem('accounts');

    if (localStorageData) {
    try {
        const accountsData = JSON.parse(localStorageData);
        const len = accountsData.length;
        for (var i = 0; i < len; i++) {
            var acc = accountsData[i];
            const userData = {
                login: acc.login,
                l1: acc.l1,
                l2: acc.l2,
                l3: acc.l3
            };
            console.log(userData);
            createListItems(userData);
        }
    } catch (error) {
        console.error('Ошибка при парсинге данных из local storage:', error);
    }
    } else {
    console.log('Данные в local storage отсутствуют');
    }
}

function showLvl() {
    document.getElementById("levelSelect").style.display = "block";
    document.getElementById("mainMenu").style.display = "none";
}

function showMenu() {
    document.getElementById("levelSelect").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
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

function removeUserAccount() {
    var login = document.getElementById("nickname").innerHTML;
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const updatedAccounts = accounts.filter(account => account.login !== login);

    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    goToAuth();
}
