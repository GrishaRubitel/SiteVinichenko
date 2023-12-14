
let PathV = document.getElementById("moveV");
let PathD = document.getElementById("moveD");
let Content = document.getElementById("svgpage");
let D = document.getElementById("D");
let V = document.getElementById("V");
let sillyCat = document.getElementById("sillyCat");

let vEnded = false;
let dEnded = false;

PathV.addEventListener("endEvent", function() {
    vEnded = true;
})

PathD.addEventListener("endEvent", function() {
    dEnded = true;
})

Content.addEventListener("click", function() {
    V.style.fontSize = "16.25px";
    D.style.fontSize = "16.25px";
    sillyCat.style.display = "flex";
    document.getElementById("carTitle").style.display = "flex"
})

Content.addEventListener("mouseover", function() {
    Content.setAttribute("width", "55px")
    D.setAttribute("x", "10")
    V.setAttribute("x", "10")
    sillyCat.setAttribute("x", "17.5")
})

Content.addEventListener("mouseout", function() {
    Content.setAttribute("width", "55px")
    D.setAttribute("x", "7.5")
    V.setAttribute("x", "7.5")
    sillyCat.setAttribute("x", "15")
})