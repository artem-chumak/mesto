const arrayValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active',
}

class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

_toggleButtonState = (inputList, buttonElement) => {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

_showInputError = (inputElement, errorMessage) => {
  const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
}

_hideInputError = (inputElement) => {
  const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
}

_isValid = (inputElement) => {
  if (!inputElement.validity.valid || inputElement.validity.typeMismatch) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
   this._hideInputError(inputElement);
  }
}

_setEventListeners = (formItem) => {
  const inputList = Array.from(formItem.querySelectorAll(this._inputSelector));
  const buttonElement = formItem.querySelector(this._submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    })
  })
}

enableValidation = () => {
  //* buttons update function
  this._setEventListeners(this._form);
  this._form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}
}

const validationEditForm = new FormValidator (arrayValidation, editFormProfile);
validationEditForm.enableValidation();

const validotionAddElementForm = new FormValidator(arrayValidation, addFormElement);
validotionAddElementForm.enableValidation();


// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }

// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', 'disabled');
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// }

// const showInputError = (formItem, inputElement, errorMessage, config) => {
//   const errorElement = formItem.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// }

// const hideInputError = (formItem, inputElement, config) => {
//   const errorElement = formItem.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// }

// const isValid = (formItem, inputElement, config) => {
//   if (!inputElement.validity.valid || inputElement.validity.typeMismatch) {
//     showInputError(formItem, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formItem, inputElement, config);
//   }
// }

// const setEventListeners = (formItem, config) => {
//   const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
//   const buttonElement = formItem.querySelector(config.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function() {
//       isValid(formItem, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     })
//   })
// }

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formItem) => {
//     formItem.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//   setEventListeners(formItem, config);
//   })
// }

// enableValidation(arrayValidation);
