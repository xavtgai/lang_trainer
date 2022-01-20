const testword = Array.from(document.querySelectorAll('.testword'));
const button1 = document.getElementById('button_1');
const verdict = document.querySelector('.verdict');
const popup = document.querySelector('.popup');

let headword = document.querySelector('.headword');

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
let numOfWordsInALevel = 3;
const numOfLevels = Math.floor(slova.length / numOfWordsInALevel)

console.log(numOfLevels, 'numOfL')

let oneLevel = shuffle(slova.slice())
    
console.log('onelevel', oneLevel );

// Делаем массив со всеми ответами и при каждом новом слове надо приписывать кнопкам 
//набор из 1 правильного ответа и остальных (по числу кнопок) неправильных.


function chooseLevel() {
    prompt('are you ready?')
}

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

popup.addEventListener('click',
    function(event) {
        if (event.target.classList.contains('popup_visible')) {
            closePopup()
        }
        if (event.target.classList.contains('popup__close-button')) {
            closePopup()
        }
    })

let numWrongAnswers = 0;
let numCorrectAnswers = 0;

function checkAnswer (e) {
    console.log('smth', e.target.innerText);
    if (e.target.innerText === headword.innerText) {
        console.log('Правильно: ', headword.innerText, 'Вот и Твой ответ: ', e.target.innerText);
        showVerdict('correct');
        setTimeout(showNewWord, 2000);
        oneLevel.shift();
        } else { 
            showVerdict('wrong');
            setTimeout(showNewWord, 1000);
            oneLevel.push(headword.innerText);
            numWrongAnswers +=1;
            console.log('Правильно: ', headword.innerText, 'Твой ответ: ', e.target.innerText);
    }
}

const allWords = shuffle(slova);
//(или может шаффл Onelevel?)


function showNewWord () {
    if (verdict.classList.contains('verdict_true')) {verdict.classList.remove('verdict_true')};
    if (verdict.classList.contains('verdict_wrong')) {verdict.classList.remove('verdict_wrong')};
    console.log(oneLevel, 'onelevel');
    console.log(slova, 'slova');
    
    if (oneLevel.length !== 0)
        {headword.innerText = oneLevel[0];
        let wordsForAnswerOptions = Array();
            //добавляем в массив ответов правильное слово
        wordsForAnswerOptions.push(headword.innerText);
        for (let i=0; i< testword.length; i++ ) 
            { if (allWords[i] !== headword.innerText)  wordsForAnswerOptions.push(allWords[i]) }
            shuffle(wordsForAnswerOptions);
            console.log(wordsForAnswerOptions, 'options');
            console.log(allWords, 'allwords');

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
showNewWord ();

function score (numOfWordsInTheLevel) {
    if (numWrongAnswers === 0) {headword.innerText =  'Офигеть! Ваще без ошибок' }
    else {headword.innerText =  `Ну ты и лузер, ошибок у тебя -  ${numWrongAnswers}`}
}

function setFormat(headword, answerOptions) {
    if (headword == 'word' && answerOption == 'translation') {}
}