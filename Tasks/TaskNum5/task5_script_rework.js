
let stringArr = [];

function generateMap(inputString) {
    // Разделяем строку на слова и числа
    const wordsAndNumbers = inputString.split('-');

    // Отфильтровываем числа и слова
    const words = wordsAndNumbers.filter(item => isNaN(item));
    const numbers = wordsAndNumbers.filter(item => !isNaN(item));

    // Сортируем слова и числа
    const sortedWords = sortAlphabetically(words);
    const sortedNumbers = sortNumerically(numbers);

    // Создаем мапу
    const resultMap = new Map();

    // Добавляем слова в мапу с ключами вида 'a1', 'a2', ...
    sortedWords.forEach((word, index) => {
        resultMap.set(`a${index + 1}`, removeSpaces(word));
    });

    // Добавляем числа в мапу с ключами вида 'n1', 'n2', ...
    sortedNumbers.forEach((number, index) => {
        resultMap.set(`n${index + 1}`, removeSpaces(number));
    });

    return resultMap;
}

function sortAlphabetically(arr) {
    return arr.sort((a, b) => a.localeCompare(b));
}

function sortNumerically(arr) {
    return arr.sort((a, b) => a - b);
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

function dropInArea(area, elem) {
    let areaBounds = area.getBoundingClientRect();
    let elemBounds = elem.getBoundingClientRect();
    console.log(areaBounds);
    console.log(elemBounds);
}

function addAnswer(elem) {
    console.log(elem);
    let answOut = document.getElementById("answerOutput");
    answOut.innerHTML = answerOutput.innerHTML + " " + elem;
}

function appendOutput(elem) {
    let tex = elem.innerHTML;
    if (stringArr.includes(tex) == false) {
        stringArr.push(tex);
        addAnswer(removeSpaces(tex.split(" ").pop()));
    }
}

function dragAndDrop() {
    let mapEls = document.getElementsByClassName("mapElement");
    let tarArea = document.getElementById("targetArea");
    
    for(mapEl of mapEls) {
        mapEl.addEventListener("dragstart", function(elem) {
            let picked = elem.target;
            tarArea.addEventListener("dragover", function(elem) {
                elem.preventDefault();
            });
            tarArea.addEventListener("drop", function(elem) {
                if (picked == null) {
                    return;
                }
                tarArea.appendChild(picked);
                picked.style.top = elem.clientY - (picked.offsetHeight / 2) + 'px';
                picked.style.left = elem.clientX  - (picked.offsetWidth / 2) + 'px';
                appendOutput(picked);
                picked = null;
            });
        });
    }
}

function explodeString() {
    if (getComputedStyle(document.documentElement).getPropertyValue('--started') == 0) {
        document.documentElement.style.setProperty('--started', 1);
        const inputString = document.getElementById("taskInput").value;
        let map = generateMap(inputString);
        console.log(map);

        const wordHolder = document.getElementById("wordHolder");

        map.forEach((value, key) => {
            const element = document.createElement("div");
            element.textContent = `${key} ${value}`;
            element.classList.add("mapElement");
            element.setAttribute("id", `${key}` + "mapElement");
            element.setAttribute("draggable", true);
            wordHolder.appendChild(element);
        });

        document.getElementById("taskInput").value = "";

        let butt = document.getElementById("explode")
        butt.classList.remove("menu_butt");
        butt.classList.add("blockedButt");
        butt.disabled = true;
        butt.style.backgroundColor = "#000";
        butt.style.border = "solid #D62246 1px";
        
        dragAndDrop();
    } else {
        alert("Разбор уже был");
    }
}
