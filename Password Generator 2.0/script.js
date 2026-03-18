// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthDisplay = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate-btn');
const copyButton = document.getElementById('copy-btn');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-container p');
const strengthLabel = document.getElementById('strength-label');

// Character sets
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numberCharacters = '0123456789';
const symbolCharacters = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener('click', generatePassword);

function generatePassword() {
  const length = Number(lengthSlider.value);
  const includeUpper = uppercaseCheckbox.checked;
  const includeLower = lowercaseCheckbox.checked;
  const includeNum = numbersCheckbox.checked;
  const includeSym = symbolsCheckbox.checked;

  if (!includeUpper && !includeLower && !includeNum && !includeSym) {
    alert('Please check atleast one of the box');
    return;
  }

  const newPassword = createPassword(
    length,
    includeUpper,
    includeLower,
    includeNum,
    includeSym,
  );
  passwordInput.value = newPassword;
}

function createPassword(
  length,
  includeUpper,
  includeLower,
  includeNum,
  includeSym,
) {
  let allCharacters = '';
  if (includeUpper) allCharacters += uppercaseLetters;
  if (includeLower) allCharacters += lowercaseLetters;
  if (includeNum) allCharacters += numberCharacters;
  if (includeSym) allCharacters += symbolCharacters;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }
  return password;
}
