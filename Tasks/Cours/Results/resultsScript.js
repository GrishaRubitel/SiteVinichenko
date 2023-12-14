function getUserData() {
    var urlParams = new URLSearchParams(window.location.search);
    var login = urlParams.get("player");
    let accounts = localStorage.getItem('accounts');
    accounts = accounts ? JSON.parse(accounts) : [];

    const userAccount = accounts.find(account => account.login === login);

    const userData = {
        login: userAccount.login,
        l1: userAccount.l1,
        l2: userAccount.l2,
        l3: userAccount.l3,
        record: userAccount.l1 + userAccount.l2 + userAccount.l3 
    };

    document.getElementById("nickname").innerHTML = userData.login;
    document.getElementById("recordValue").innerHTML = userData.record;
    document.getElementById("l1").innerHTML = userData.l1;
    document.getElementById("l2").innerHTML = userData.l2;
    document.getElementById("l3").innerHTML = userData.l3;
}

getUserData();