function acceptSignUp(value) {
    const login = value;

    if (login.length < 1) {
        message('Никнейм должен содержать хотя бы 1 символ');
        return;
    }

    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];
    
    const newAccount = {
        id: accounts.length + 1,
        login: login,
        l1: 0,
        l2: 0,
        l3: 0
    };
    accounts.push(newAccount);

    localStorage.setItem('accounts', JSON.stringify(accounts));

    showLogin();
    message('Регистрация успешна');
}

function logInStart() {
    const login = document.getElementById('loginAuthField').value;

    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const existingAccount = accounts.find(account => account.login === login);

    if (existingAccount) {
        var newPagePath = "../MainPage/mainPage.html";
        window.location.href = newPagePath + "?player=" + encodeURIComponent(login);
    } else {
        acceptSignUp(login);
    }
}

localStorage.setItem('accounts', JSON.stringify(initialAccounts));

document.getElementsByTagName("body")[0].style.filter = "opacity(1)";

function message(text) {
    var messageBlock = document.getElementById("message");
    var line = document.getElementById("messageLine");

    messageBlock.classList.remove("displayMes");
    line.innerHTML = text;
    setTimeout(function() {
        messageBlock.classList.add("displayMes");
    }, 3000)
}