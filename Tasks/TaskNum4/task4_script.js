let jsonHolder = {
    "questions": [{
        "id": 1,
        "questionText": "Если человека назвали мордофиля, то это…",
        "answerHolder": [
            "Значит, что он тщеславный",
            "Значит, что у него лицо как у хряка",
            "Значит, что чумазый",

        ],
        "answer": "Значит, что он тщеславный - Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный.",
        "correct": "Значит, что он тщеславный",
        "showed": 0,
    }, {
        "id": 2,
        "questionText": "«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
        "answerHolder": [
            "Он маленький и невзрачный",
            "Он тот еще алкоголик",
            "Он не держит свое слово",
        ],
        "answer": "Он маленький и невзрачный - Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи.",
        "correct": "Он маленький и невзрачный",
        "showed": 0,
    }, {
        "id": 3,
        "questionText": "Если человека прозвали пятигузом, значит, он…",
        "answerHolder": [
            "Не держит слово",
            "Изменяет жене",
            "Без гроша в кармане",
        ],
        "answer": "Не держит слово - Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек",
        "correct": "Не держит слово",
        "showed": 0,
    }, {
        "id": 4,
        "questionText": "Кто такой шлындра?",
        "answerHolder": [
            "Обманщик",
            "Нытик",
            "Бродяга",
        ],
        "answer": "Бродяга - В Словаре русского арго «шлындрать» означает бездельничать, шляться.",
        "correct": "Бродяга",
        "showed": 0,
    }]
};

let queLen = jsonHolder.questions.length;

function hideStarter() {
    document.getElementById("onStart").classList.add("hiddenVar");
    startProgram();
}


function startProgram() {
    let randNum = getRandom();
    if (randNum == -100) {
        document.getElementById("endGame").classList.remove("hiddenVar");
        document.getElementById("endGame").innerHTML = "Вопросы закончились: " + getComputedStyle(document.documentElement).getPropertyValue('--playStat') + "/" + queLen;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showAnswer();
    } else if (randNum != -100) {
        createSection(randNum);
    }
}

function showAnswer() {
    let cont = document.getElementById("container");
    for (let i = 1; i <= queLen; i++) { 
        if (document.getElementById("questionLine" + i.toString()).classList.contains("correctAnsw") == true) {
            document.getElementById("questionLine" + i.toString()).addEventListener("mouseover", function() {
                document.getElementById("questionLine" + i.toString()).innerHTML = jsonHolder.questions[i - 1].answer;
                document.getElementById("questionLine" + i.toString()).style.borderColor = "blue";
            });
            document.getElementById("questionLine" + i.toString()).addEventListener("mouseout", function() {
                let num = document.getElementById("questionNum" + i.toString());
                document.getElementById("questionLine" + i.toString()).innerHTML = num.innerHTML + ". " + jsonHolder.questions[i - 1].questionText;
                document.getElementById("questionLine" + i.toString()).style.borderColor = "black";
            });
        };
    };
}

function createSection(randNum) {

    let questionSection = document.createElement("section");
    questionSection.setAttribute("id","q" + jsonHolder.questions[randNum].id);
    questionSection.classList.add("qBlock");
    
    
    let questionText = document.createElement("div");
    let num = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--qVal'));
    questionText.innerHTML = num + ". " + jsonHolder.questions[randNum].questionText;
    questionText.setAttribute("id", "questionLine" + jsonHolder.questions[randNum].id);
    questionText.classList.add("qLine");
    questionSection.appendChild(questionText);

    let answerContainer = document.createElement("section");
    answerContainer.classList.add("ansCont");
    questionSection.appendChild(answerContainer);

    let qNum = getComputedStyle(document.documentElement).getPropertyValue('--qNum');
    while (true) {
        
        let qPos = Math.floor(Math.random() * 3);
        if (qNum == 3) {
            break;
        }
        if (jsonHolder.questions[randNum].answerHolder[qPos] != "999") {
            let answerVariant = document.createElement("div");
            answerVariant.classList.add("ansLine");
            answerVariant.classList.add("guess");
            answerVariant.setAttribute("id", jsonHolder.questions[randNum].id + "q" + qPos);

            if (jsonHolder.questions[randNum].correct == jsonHolder.questions[randNum].answerHolder[qPos]) {
                answerVariant.setAttribute("onclick", "correctAnswer(this.id)");
            } else {
                answerVariant.setAttribute("onclick", "wrongAnswer(this.id)");
            }
            qNum++;
            document.documentElement.style.setProperty('--qNum', qNum);

            answerVariant.innerHTML = jsonHolder.questions[randNum].answerHolder[qPos];
            answerContainer.appendChild(answerVariant);
            jsonHolder.questions[randNum].answerHolder[qPos] = "999";
        }
    }

    let questionNum = document.createElement("div");
    questionNum.innerHTML = num.toString();
    questionNum.setAttribute("id", "questionNum" + jsonHolder.questions[randNum].id);
    questionNum.style.display = "none";
    questionSection.appendChild(questionNum);

    document.documentElement.style.setProperty('--qNum', 0);
    document.getElementById("container").appendChild(questionSection);
}

function getRandom() {
    let qLen = getComputedStyle(document.documentElement).getPropertyValue('--qVal');
    while (true) {
        let arrPosition = Math.floor(Math.random() * queLen);
            if (qLen == queLen) {
                break;
            }
            if (jsonHolder.questions[arrPosition].showed == 0) {
                jsonHolder.questions[arrPosition].showed = 1;
                qLen++;
                document.documentElement.style.setProperty('--qVal', qLen);
                return arrPosition;
        }
    }
    return -100;
}

function correctAnswer(buttonID) {
    let answer = document.getElementById(buttonID)
    answer.classList.add("correct");
    answer.classList.remove("guess");
    let corr = getComputedStyle(document.documentElement).getPropertyValue('--playStat');
    corr++;
    document.documentElement.style.setProperty('--playStat', corr);
    let prevSib = answer.parentElement.previousElementSibling;
    prevSib.classList.add("correctAnsw");
    allSiblings(buttonID, 1);
    addMovement(buttonID);
    setTimeout(function(answer) {
        answer.style.width = "100%";
        answer.style.height = "7rem";
        answer.parentElement.style.display = "flex";
        answer.classList.remove("shake1");
    }, 1000, answer);
    setTimeout(function() {
        mimikHandler(answer);
        answer.parentElement.style.opacity = "0";
        answer.parentElement.style.marginTop = "0";
        setTimeout(function(answer) {
            answer.parentElement.classList.add("hiddenVar");
        }, 300, answer)
    }, 2000, answer)
    setTimeout(function(answer) {
        answer.parentElement.classList.add("hiddenVar");
    }, 2900, answer)
    setTimeout(startProgram, 3000);
}

function wrongAnswer(buttonID) {
    let answer = document.getElementById(buttonID)
    answer.classList.add("wrong");
    answer.classList.remove("guess");
    let prevSib = answer.parentElement.previousElementSibling;
    prevSib.classList.add("wrongAnsw");
    addMovement(buttonID);
    allSiblings(buttonID, 0);
    setTimeout(function(answer) {
        answer.parentElement.style.marginTop = "3rem";
        answer.parentElement.style.opacity = "0";
        setTimeout(function(answer) {
            answer.parentElement.classList.add("hiddenVar");
        }, 300, answer)
    }, 1000, answer);
    setTimeout(startProgram, 2350);
}

function addMovement(buttonID) {
    document.getElementById(buttonID).classList.add("shake1");
    document.getElementById(buttonID).classList.remove("guess");
}

function allSiblings(ID, type) {
    let nextID = document.getElementById(ID).nextElementSibling;
    let prevID = document.getElementById(ID).previousElementSibling;
    while (true) {
        if (nextID == null && prevID == null) {
            break;
        }
        if (prevID != null) {
            prevID.classList.add("wrong");
            addMovement(prevID.id);
            if (type == 1) {
                setTimeout(mimikHandler, 800, prevID);
            }
            prevID = prevID.previousElementSibling;
        }
        if (nextID != null) {
            nextID.classList.add("wrong");
            addMovement(nextID.id);
            if (type == 1) {
                setTimeout(mimikHandler, 800, nextID);
            }
            nextID = nextID.nextElementSibling;
        }
    }
}

function mimikHandler(item) {
    item.style.marginTop = "3rem";
    item.style.opacity = "0";
    setTimeout(function(item) {
        item.style.display = "none";
    }, 300, item);
}


    /*
    let answerText = document.createElement("div");
    answerText.innerHTML = jsonHolder.questions[randNum].answer;
    answerText.setAttribute("id", "answerLine" + jsonHolder.questions[randNum].id);
    answerText.classList.add("qLine");
    answerText.classList.add("answer");
    answerText.classList.add("hiddenVar");
    questionSection.appendChild(answerText);
    */


/*
function startAnimations(ID) {
    let variantsBlock = document.getElementById(ID).parentElement;
    variantsBlock.style.marginTop = "15rem";
    variantsBlock.style.opacity = "0";
    setTimeout(showAndHide, 650, variantsBlock);
}
*/

/*
function showAndHide(variantsBlock) {
    variantsBlock.classList.add("hiddenVar");
    let answerBlock = variantsBlock.nextElementSibling;
    answerBlock.style.opacity = "0";
    answerBlock.classList.remove("hiddenVar");
    setTimeout(function() {
        answerBlock.style.opacity = "1";
    }, 250);    
}
*/

/*
function showNextQuestion(answerBlock) {
    let nextQuestion = answerBlock.parentElement.nextElementSibling;
    nextQuestion.style.opacity = "0";
    nextQuestion.classList.remove("hiddenVar");
    setTimeout(function() {
        answerBlock.style.opacity = "1";
        nextQuestion.style.opacity = "1";
        
    }, 250);
}
*/

/*
function wrongAnswer(buttonID) {
    document.getElementById(buttonID).classList.add("wrong");

    addMovement(buttonID);
    allSiblings(buttonID, 0);
    setTimeout(startAnimations, 2500, buttonID);
    variantsBlock.classList.add("hiddenVar");
    let answerBlock = variantsBlock.nextElementSibling;
    answerBlock.style.opacity = "0";
    answerBlock.classList.remove("hiddenVar");
    setTimeout(function() {
        answerBlock.style.opacity = "1";
    }, 250);
    setTimeout(startProgram, 1350);
}
*/