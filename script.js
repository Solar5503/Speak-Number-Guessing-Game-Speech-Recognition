const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>Вы сказали:</div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (!Number.isFinite(num)) {
    msgEl.innerHTML += '<div>Это некорректное число!</div>';
    return;
  }

  // Check in range
  if (num > 101 || num < 2) {
    msgEl.innerHTML += `<div>Число должно быть в диапазоне между 2 и 101!</div>`;
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Поздравляю! 🥇 Вы угадали число! 🏆<br><br>
    Это было ${num} 😛</h2>
    <button class='play-again' id='play-again'>Новая игра 🚀</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>Число меньше</div>';
  } else {
    msgEl.innerHTML += '<div>Число больше</div>';
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 2;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End speak
recognition.addEventListener('end', recognition.start);

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') location.reload();
});
