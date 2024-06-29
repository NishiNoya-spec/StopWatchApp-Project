
let milliseconds = JSON.parse(localStorage.getItem('milliseconds')) || 0;
let seconds = JSON.parse(localStorage.getItem('seconds')) || 0;
let minutes = JSON.parse(localStorage.getItem('minutes')) || 0;
let hours = JSON.parse(localStorage.getItem('hours')) || 0;
let cmdWord = JSON.parse(localStorage.getItem('cmdWord')) || 'default';
let millisecondsString = JSON.parse(localStorage.getItem('millisecondsString')) || '';
let secondsString = JSON.parse(localStorage.getItem('secondsString')) || '';
let minutesString = JSON.parse(localStorage.getItem('minutesString')) || '';
let hoursString = JSON.parse(localStorage.getItem('hoursString')) || '';
let intervalTimerID;
let isCounterRunning = false;
let endRiched = false;
let flagsArray = JSON.parse(localStorage.getItem('flagsArray')) || [];

const counterTable = document.querySelector('.js-counter');
const buttonStart = document.querySelector('.js-button-start');
const buttonStop = document.querySelector('.js-button-stop');
const buttonReset = document.querySelector('.js-button-reset');
const buttonFlag = document.querySelector('.js-button-flag');
const flagsField = document.querySelector('.js-flags');

buttonStart.addEventListener('click', () => {
  timer('start');
});

buttonStop.addEventListener('click', () => {
  timer('stop');
});

buttonReset.addEventListener('click', () => {
  timer('reset');
});

buttonFlag.addEventListener('click', () => {
  flagsArray.push(`${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`);
  renderFlags();
});

timer(cmdWord);
renderFlags();

function timer(commandWord) {

  cmdWord = commandWord;

  if(commandWord === 'start' && !isCounterRunning && !endRiched) {
    intervalTimerID = setInterval(function run() {

      isCounterRunning = true;

      milliseconds++;
    
      if (milliseconds <= 9) {
        millisecondsString = `0${milliseconds}`;
      } else if (milliseconds >= 10 && milliseconds <= 99) {
        millisecondsString = `${milliseconds}`;
      } else if (milliseconds >= 100) {
        milliseconds = 0;
        millisecondsString = `0${milliseconds}`;
        seconds++;
      }
    
      if (seconds <= 9) {
        secondsString = `0${seconds}`;
      } else if (seconds >= 10 && seconds <= 59) {
        secondsString = `${seconds}`;
      } else if (seconds === 60) {
        seconds = 0;
        secondsString = `0${seconds}`;
        minutes++;
      }

      if (minutes <= 9) {
        minutesString = `0${minutes}`;
      } else if (minutes >= 10 && minutes <= 59) {
        minutesString = `${minutes}`;
      } else if (minutes === 60) {
        minutes = 0;
        minutesString = `0${minutes}`;
        hours++;
      }

      if (hours <= 9) {
        hoursString = `0${hours}`;
      } else if (hours >= 10 && hours <= 99) {
        hoursString = `${hours}`;
      }

      if ( milliseconds === 99 && seconds === 59 && minutes === 59 && hours === 99 ) {
        endRiched = true;
        isCounterRunning = false;
        clearInterval(intervalTimerID);
      }

      counterTable.innerHTML = `${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`;
      saveParams();

    }, 10);

  } else if (commandWord === 'stop' && isCounterRunning) {
    isCounterRunning = false;
    clearInterval(intervalTimerID);
    saveParams();

  } else if (commandWord === 'reset') {
    endRiched = false;
    milliseconds = 0;
    millisecondsString = `0${milliseconds}`;
    seconds = 0;
    secondsString = `0${seconds}`;
    minutes = 0;
    minutesString = `0${minutes}`;
    hours = 0;
    hoursString = `0${hours}`;
    saveParams();
  }

  counterTable.innerHTML = `${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`;

}

function saveParams() {
  localStorage.setItem('milliseconds', JSON.stringify(milliseconds));
  localStorage.setItem('seconds', JSON.stringify(seconds));
  localStorage.setItem('minutes', JSON.stringify(minutes));
  localStorage.setItem('hours', JSON.stringify(hours));
  localStorage.setItem('cmdWord', JSON.stringify(cmdWord));
  localStorage.setItem('millisecondsString', JSON.stringify(millisecondsString));
  localStorage.setItem('secondsString', JSON.stringify(secondsString));
  localStorage.setItem('minutesString', JSON.stringify(minutesString));
  localStorage.setItem('hoursString', JSON.stringify(hoursString));
}

function renderFlags() {
  flagsField.innerHTML = '';
  let html = '';
  flagsArray.forEach((element, index) => {
    html = `<div class="flag-row">
    <div class="number-flag">${index + 1}.</div>
      <div class="flag-text">${element}<div>
      <div class="button-delete-div">
        <button class="js-button-delete-flag button-delete-flag">delete</button>
      </div>
    </div>`;
    flagsField.innerHTML += html;
  });
  
  document.querySelectorAll('.js-button-delete-flag').forEach((element, index) => {
    element.addEventListener('click', (element, index) => {
      flagsArray.splice(index, 1);
      renderFlags();
    });
  });
  localStorage.setItem('flagsArray', JSON.stringify(flagsArray));

}