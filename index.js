const testword = Array.from(document.querySelectorAll('.testword'));
const button1 = document.getElementById('button_1');
const verdict = document.querySelector('.verdict');
const popup = document.querySelector('.popup');
const wordsLeft = document.querySelector('.numWordsLeft');
const nextLevelButton = document.querySelector('.nextLevel');
const levelChoice = document.getElementById('levelChoice');
const level = document.querySelector('.current-level-num');
const main = document.querySelector('.headword');
const maxLevel = document.getElementById('max-level');


function changeBackground(value)
{   let colour = value;
    
    document.body.style.backgroundColor = colour;
    localStorage.setItem('bgColor', value);}

function changeFontColor(value) {
    let colour = value;
    testword.forEach((cell) => {cell.style.color = colour})
    main.style.color = colour;
    localStorage.setItem('fontColor', value)
    ;

}
let bgColor = localStorage.getItem('bgColor');
if (bgColor) {changeBackground(bgColor)}

let fontColor = localStorage.getItem('fontColor');
if (fontColor) {changeFontColor(fontColor)}



let headword = document.querySelector('.headword');

let question = 'word';
let answers = 'translation';
level.innerHTML = 1;

//формат нужен - при проверке ответа; при показе хедворда; при показе ответов. 
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

const slova = Array.from(words);  
//слайс нужен чтобы создать отдельную копию массива
const allWords = shuffle(slova);
//(или может шаффл currentLevel?)


let numOfWordsInALevel = localStorage.getItem('numOfWordsInALevel');
if (numOfWordsInALevel) {setWordsInLevel(numOfWordsInALevel)
} else {
    numOfWordsInALevel = 10;
}


function setWordsInLevel(value) {
    numOfWordsInALevel = value;
    localStorage.setItem('numOfWordsInALevel', numOfWordsInALevel);
}

const numOfLevels = Math.floor(slova.length / numOfWordsInALevel);

levelChoice.setAttribute('max', numOfLevels);
maxLevel.innerHTML = numOfLevels;


let currentLevelNum = 0;
let currentLevel = shuffle(slova.slice());
console.log(numOfLevels, 'numOfL')

//если остается еще несколько слов после последнего уровня, но на целый уровень не хватит,
// подгеребем их в последний уровень
function chooseLevel(value) {
    
    if (value > numOfLevels) {alert('bad level')}
    currentLevelNum = value;
    let startOfTheLevel = numOfWordsInALevel * (currentLevelNum-1);
    let endOfTheLevel= startOfTheLevel +  numOfWordsInALevel;
    if (slova.length - endOfTheLevel < numOfWordsInALevel) endOfTheLevel = slova.length; 
    level.innerHTML = currentLevelNum;
    if (value === 'all') 
        {
            numOfWordsInALevel = slova.length
            startOfTheLevel=0;
            endOfTheLevel = slova.length;
            level.innerHTML = 'все слова';
        };

    
    currentLevel = shuffle(slova.slice(startOfTheLevel, endOfTheLevel ))
    wordsLeft.innerHTML = currentLevel.length;
       
    showNewWord ();
}

chooseLevel(1);

function goToNextLevel() {
    nextLevelButton.classList.add('invisible')
    chooseLevel(currentLevelNum*1 + 1)
}

function setFormat(headword, answerOptions) {
    
    question = headword;
    answers = answerOptions;
    showNewWord ();
}

// Делаем массив со всеми ответами и при каждом новом слове надо приписывать кнопкам 
//набор из 1 правильного ответа и остальных (по числу кнопок) неправильных.

//номер текущего уровня

function showVerdict(result) 
{
    if (result === 'correct')
        {
            verdict.classList.remove('verdict_wrong');
            verdict.classList.add('verdict_true');
        }
    else {
        verdict.classList.remove('verdict_true');
        verdict.classList.add('verdict_wrong');
    
    }
}

function closePopup() {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape);

}
function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_visible')
        closePopup(openedPopup);
    }
}

function openPopup() {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape);
}

// popup.addEventListener('click',
//     function(event) {
//         if (event.target.classList.contains('popup_visible')) {
//             closePopup()
//         }
//         if (event.target.classList.contains('popup__close-button')) {
//             closePopup()
//         }
//     })

let numWrongAnswers = 0;
let numCorrectAnswers = 0;

function checkAnswer (e) {
   
    if (e.target.innerText === currentLevel[0][answers]) {
        console.log('Правильно: ', currentLevel[0][answers], 'Вот и Твой ответ: ', e.target.innerText);
        showVerdict('correct');
        setTimeout(showNewWord, 500);
        currentLevel.shift();
        } else { 
            showVerdict('wrong');
            setTimeout(showNewWord, 500);
            currentLevel.push(currentLevel[0]);
            numWrongAnswers +=1;
            console.log('Правильно: ', currentLevel[0][answers], 'Твой ответ: ', e.target.innerText);
            
    }
    wordsLeft.innerHTML = currentLevel.length;
    console.log('current one level', currentLevel)
}

function showNewWord () {
    if (verdict.classList.contains('verdict_true')) {verdict.classList.remove('verdict_true')};
    if (verdict.classList.contains('verdict_wrong')) {verdict.classList.remove('verdict_wrong')};
    
    if (currentLevel.length !== 0)
        
        {
            shuffle(currentLevel)
            headword.innerText = currentLevel[0][question];
        let wordsForAnswerOptions = Array();
        
            //добавляем в массив ответов правильное слово
        wordsForAnswerOptions.push(currentLevel[0][answers]);
        let testwords_to_buttons = 1;

        for (let i=0; testwords_to_buttons <= testword.length; i++ ) 
            { if (allWords[i][question] !== headword.innerText)  
                wordsForAnswerOptions.push(allWords[i][answers]);
                testwords_to_buttons+=1 }
            shuffle(wordsForAnswerOptions);

        testword.forEach((word) => { 
            word.addEventListener('click', checkAnswer);
            word.innerHTML = wordsForAnswerOptions[0];
            wordsForAnswerOptions.shift();
        });
    }
    else {
        headword.innerText =  'Ваш результат'
        score(20);
    }
}
// showNewWord ();

function score (numOfWordsInTheLevel) {
    if (numWrongAnswers === 0) {
        headword.innerText =  'Офигеть! Ваще без ошибок' }
    else {headword.innerText =  `Ну ты и лузер, ошибок у тебя -  ${numWrongAnswers}`}
//если существуют еще уровни, то показываем кнопку перехода на следующий уровень
    if (currentLevelNum < numOfLevels) {nextLevelButton.classList.remove('invisible')};
}

