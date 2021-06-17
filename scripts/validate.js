/*
* 1. Переписал код как в тренажёре.
* 2. Сделал отдельный массив, т.к. так проще ссылаться в index.js
* 3. Сделал функции открытия/закрытия попапа. Вроде больше обработчики не висят.
* 4. Оставшиеся "можно лучше" доделаю в след спринте/итерации. 
*/
const arrayValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active',
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const showInputError = (formItem, inputElement, errorMessage, config) => {
  const errorElement = formItem.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (formItem, inputElement, config) => {
  const errorElement = formItem.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

const isValid = (formItem, inputElement, config) => {
  if (!inputElement.validity.valid || inputElement.validity.typeMismatch) {
    showInputError(formItem, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formItem, inputElement, config);
  }
}

const setEventListeners = (formItem, config) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
  const buttonElement = formItem.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      isValid(formItem, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formItem, config);
  })
}

enableValidation(arrayValidation);