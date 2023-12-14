let mybutton = document.getElementById("to_top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToAboutUs() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
    let about = document.getElementById("about_us");
    about.scrollIntoView({block: "center"})
};

function scrollToCars() {
    if (window.getComputedStyle(page).getPropertyValue("display") == "none") {
        showMenu();
    }
    let row = document.getElementById("model_row");
    row.scrollIntoView({block: "center"});
};

let tg = document.getElementById("tg")
let inst = document.getElementById("inst");
let vk = document.getElementById("vk");
let git = document.getElementById("git");

tg.onmouseover = function() {
    tg.innerHTML = "@grisha_rubitel";
};

tg.onmouseout = function() {
    tg.innerHTML = "Telegram";
};

inst.onmouseover = function() {
    inst.innerHTML = "strigi_ovcu";
};

inst.onmouseout = function() {
    inst.innerHTML = "Instagram";
};

vk.onmouseover = function() {
    vk.innerHTML = "@grisharubitel";
};

vk.onmouseout = function() {
    vk.innerHTML = "VK";
};

git.onmouseover = function() {
    git.innerHTML = "GrishaRubitel";
};

git.onmouseout = function() {
    git.innerHTML = "GitHub";
};

function changeAndScroll() {
    console.log("DOM loaded!");
    document.location.href = "../index.html";
    addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded!");
        document.getElementById("model_row").scrollIntoView({block: "center"});
    });
};

function showMenu() {
    let page = document.getElementById("page")
    let nav_menu = document.getElementById("nav_menu")
    let but_lust = document.getElementById("button_list");
    if (window.getComputedStyle(page).getPropertyValue("display") == "block") {
        page.style.display = "none";
        nav_menu.style.display = "flex";
        but_lust.style.display = "block";
    }
    else {
        page.style.display = "block";
        nav_menu.style.display = "none";
        but_lust.style.display = "none";
    }
    console.log(window.getComputedStyle(page).getPropertyValue("display"));
    console.log(window.getComputedStyle(nav_menu).getPropertyValue("display"));
}