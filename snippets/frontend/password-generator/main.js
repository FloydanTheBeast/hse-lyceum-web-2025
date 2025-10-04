const settingsCheckboxes = Array.from(
  document.querySelectorAll('input[type=checkbox]')
);
const generatedPasswordDiv = document.querySelector('.generated-password');
const generatePasswordBtn = document.querySelector('#generate-password-btn');
const passwordLengthInput = document.querySelector('input[type=range]');
const passwordLengthText = document.querySelector('#password-length-text');

// Генерация массива чисел от from до to включительно
const generateRange = (from, to) => {
  const arr = [];

  for (let i = from; i <= to; i++) {
    arr.push(i);
  }

  return arr;
};

const UPPERCASE_LETTERS = generateRange(65, 90).map(i =>
  String.fromCharCode(i)
);
const LOWERCASE_LETTERS = generateRange(97, 122).map(i =>
  String.fromCharCode(i)
);
const DIGITS = generateRange(48, 57).map(i => String.fromCharCode(i));
const SPECIAL_SYMBOLS = ['$', '#', '!', '?', '&', '@'];

const handleGenerateBtnClick = () => {
  const passwordLength = passwordLengthInput.value;

  const settings = {};

  for (const checkbox of settingsCheckboxes) {
    settings[checkbox.dataset.setting] = checkbox.checked;
  }

  generatedPasswordDiv.textContent = generatePassword(passwordLength, settings);
};

// Функция для генерации пароля
const generatePassword = (length, settings) => {
  if (!Object.values(settings).some(Boolean)) {
    alert('Выберите по крайней мере один набор символов');
    return;
  }

  const allowedChars = [];

  if (settings.uppercase) {
    allowedChars.push(...UPPERCASE_LETTERS);
  }

  if (settings.lowercase) {
    allowedChars.push(...LOWERCASE_LETTERS);
  }

  if (settings.digits) {
    allowedChars.push(...DIGITS);
  }

  if (settings['special-symbols']) {
    allowedChars.push(...SPECIAL_SYMBOLS);
  }

  let password = '';

  for (let i = 0; i < length; i++) {
    const charIndex = Math.random() * allowedChars.length;

    password += allowedChars[Math.floor(charIndex)];
  }

  return password;
};

passwordLengthInput.addEventListener(
  'change',
  e => (passwordLengthText.textContent = e.target.value)
);
generatePasswordBtn.addEventListener('click', handleGenerateBtnClick);
