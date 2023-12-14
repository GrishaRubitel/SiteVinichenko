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
    return str.replace(/\s/g, ''); // Заменяем все пробелы на пустую строку
}

function dropInArea(area, elem) {
    let areaBounds = area.getBoundingClientRect();
    let elemBounds = elem.getBoundingClientRect();
    console.log(areaBounds);
    console.log(elemBounds);
}

function dragAndDrop() {
    let mapEls = document.getElementsByClassName("mapElement");
    let wordHand = document.getElementById("wordHolder");
    let tarArea = document.getElementById("targetArea");

    for(mapEl of mapEls) {
        mapEl.addEventListener("dragstart", function(elem) {
            let picked = elem.target;

            wordHand.addEventListener("dragover", function(elem) {
                elem.preventDefault();
            });
            wordHand.addEventListener("drop", function(elem) {
                try {
                    wordHand.appendChild(picked);
                }
                catch {
                    console.log("already here");
                }
                mapEl.style.top = elem.clientY - (mapEl.offsetHeight / 2) + 'px';
                mapEl.style.left = elem.clientX  - (mapEl.offsetWidth / 2) + 'px';
                
                picked = null;
            });
            tarArea.addEventListener("dragover", function(elem) {
                elem.preventDefault();
            });
            tarArea.addEventListener("drop", function(elem) {
                try {
                    tarArea.appendChild(picked);
                }
                catch {
                    console.log("already here");
                }
                mapEl.style.top = elem.clientY - (mapEl.offsetHeight / 2) + 'px';
                mapEl.style.left = elem.clientX  - (mapEl.offsetWidth / 2) + 'px';
                
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

        // Очищаем содержимое div перед добавлением новых элементов
        const wordHolder = document.getElementById("wordHolder");

        // Создаем элементы HTML для каждой пары ключ-значение из мапы
        map.forEach((value, key) => {
            const element = document.createElement("div");
            element.textContent = `${key} ${value}`;
            element.classList.add("mapElement"); // Добавляем класс "mapElement"
            element.setAttribute("id", `${key}` + "mapElement");
            element.setAttribute("draggable", true);
            wordHolder.appendChild(element);
        });
        // Очищаем поле ввода
        document.getElementById("taskInput").value = "";

        dragAndDrop();
    } else {
        alert("Разбор уже был");
    }
}
