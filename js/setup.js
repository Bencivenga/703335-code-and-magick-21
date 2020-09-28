'use strict';

document.querySelector(`.setup`).classList.remove(`hidden`);
document.querySelector(`.setup-similar`).classList.remove(`hidden`);

const WIZARDS__AMOUNT = 4;

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const WIZARD_COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

// Получение случайного элемента из массива
let getRandomArrElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Получение случайного имени мага
let getRandomName = () => {
  return getRandomArrElement(WIZARD_NAMES) + ` ` + getRandomArrElement(WIZARD_SURNAMES);
};

// Cоздание объекта с описанием мага

let createWizardObj = () => {
  return {
    name: getRandomName(),
    coatColor: getRandomArrElement(WIZARD_COAT_COLORS),
    eyesColor: getRandomArrElement(WIZARD_EYES_COLORS),
  };
};

// Создание массива магов
let createArrOfWizards = () => {
  let arr = [];
  for (let i = 0; i < WIZARDS__AMOUNT; i++) {
    arr.push(createWizardObj());
  }
  return arr;
};

let wizards = createArrOfWizards();

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
document.querySelector(`.setup-similar`).classList.remove(`hidden`);

// Генерируем DOM-элемент с магом
let renderWizard = (wizard) => {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

// Отрисовываем магов в DOM
let wizardFragment = document.createDocumentFragment();

for (let i = 0; i < wizards.length; i++) {
  wizardFragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(wizardFragment);
