function showSignUp() {
    document.getElementById("signUpField").style.display = "block";
    document.getElementById("authField").style.display = "none";
}

function showLogin() {
    document.getElementById("signUpField").style.display = "none";
    document.getElementById("authField").style.display = "block";
}

function acceptSignUp() {
    const login = document.getElementById('loginSignUpField').value;
    const pass = document.getElementById('passFirstSugnUpField').value;
    const passAccept = document.getElementById('passSecondSugnUpField').value;

    if (login.length < 6 || pass !== passAccept || pass.length < 6) {
        message('Логин и пароль должны содержать не менее 6 символов, и пароли должны совпадать');
        return;
    }

    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const existingAccount = accounts.find(account => account.login === login);

    if (existingAccount) {
        message('Аккаунт уже существует');
        return;
    }

    const newAccount = {
        id: accounts.length + 1,
        login: login,
        password: encryptPassword(pass),
        l1: 0,
        l2: 0,
        l3: 0
    };
    accounts.push(newAccount);

    localStorage.setItem('accounts', JSON.stringify(accounts));

    showLogin();
    message('Регистрация успешна');
}

function encryptPassword(password) {
    return btoa(password);
}

function logInStart() {
    const login = document.getElementById('loginAuthField').value;
    const password = document.getElementById('passAuthField').value;

    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const existingAccount = accounts.find(account => account.login === login && account.password === encryptPassword(password));

    if (existingAccount) {
        var newPagePath = "../MainPage/mainPage.html";
        window.location.href = newPagePath + "?player=" + encodeURIComponent(login);
    } else {
        message('Неверные логин или пароль');
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