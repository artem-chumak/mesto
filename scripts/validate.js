function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('input', (event) => handleFormInput(event, config));
  })
}

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;

  //* 1 Set error rules
  setCustomerError(input, config);

  //* 2 Set error message
  setFieldError(input);

  //* 3 Set rules for submit buttons
  setSubmitButtonState(form, config);
}

//* 1
function setCustomerError(input, config) {
  const validity = input.validity;
  input.setCustomValidity('');
  

  if (input.value.length === 0) {
    input.setCustomValidity(config.errorMissedField);
  }

  if (validity.tooShort || input.value.length === 0) {
    input.classList.add('popup__input_error');
  } else {
    input.classList.remove('popup__input_error');
  }

  if (validity.typeMismatch) {
    input.setCustomValidity(config.errorMissedUrl);
    input.classList.add('popup__input_error');
  }
}

//* 2
function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

//* 3
function setSubmitButtonState(form, config) {
  const button = form.querySelector('button');
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.add(config.popupValid);
    button.classList.remove(config.popupInvalid);
    button.removeAttribute('disabled');
  } else {
    button.classList.remove(config.popupValid);
    button.classList.add(config.popupInvalid);
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation({
  form: '.popup__form',
  errorMissedField: 'Вы пропустили это поле',
  errorMissedUrl: 'Введите адрес сайта',
  popupValid: 'popup__save-button',
  popupInvalid: 'popup__save-button_disabled',
})