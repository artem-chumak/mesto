//* Variables and constants:
// PROFILE
const buttonEditProfile = document.querySelector('.profile__edit-button'); // BUTTON EDIT PROFILE
const buttonAddPlace = document.querySelector('.profile__add-button'); // BUTTON ADD PLACE
const nameProfile = document.querySelector('.profile__name'); // FIELD name
const occupationProfile = document.querySelector('.profile__occupation'); // FIELD occupation
// ELEMENTS
const listElements = document.querySelector('.elements__list'); // UL
// TEMPLATE
const templateElement = document.querySelector('.element-template').content; // TEMPLATE CONTENT
// ELEMENT
const titleElement = document.querySelector('.element__title'); // TITLE element
const imageElement = document.querySelector('.element__image'); // IMAGE element
// POPUP EDIT PROFILE
const editForm = document.querySelector('#edit-profile'); // POPUP
const buttonCloseEditForm = editForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formProfile = editForm.querySelector('.popup__container'); // POPUP FORM
const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
const inputOccupation = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.querySelector('#add-place'); // POPUP
const buttonCloseAddForm = addForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formAddElement = addForm.querySelector('.popup__container'); // POPUP FORM
const inputTitle = addForm.querySelector('input[name="place"]'); // INPUT title
const inputLink = addForm.querySelector('input[name="link"]'); // INPUT link
const buttonSubmitAddElement = addForm.querySelector('button[type="submit"]'); //!
//POPUP IMAGE
const popupImage = document.querySelector('.popup_type_image'); // POPUP
const buttonClosePopupImage = popupImage.querySelector('.popup__exit-button'); // BUTTON close pop-up
const imagePopupImage = popupImage.querySelector('.popup__image'); // IMAGE
const captionPopupImage = popupImage.querySelector('.popup__caption'); //CAPTION

//* Functions:
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function handleButtonEditProfile () {
  togglePopup(editForm);
  inputName.value = nameProfile.textContent;
  inputOccupation.value = occupationProfile.textContent;
}

function handleFormProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  occupationProfile.textContent = inputOccupation.value;
  togglePopup(editForm);
}

//ADD NEW ELEMENT
function handleButtonAddElement () {
  togglePopup(addForm);
  addForm.querySelector('form').reset();
  buttonSubmitAddElement.classList.add('popup__save-button_disabled'); //!
}

function creatElement (link, title) {
  const htmlElement = templateElement.cloneNode(true);
  htmlElement.querySelector('.element__image').src = link;
  htmlElement.querySelector('.element__image').alt = title
  htmlElement.querySelector('.element__title').innerText = title;
  setEventListener(htmlElement);
  return htmlElement;
}

function addElement (container, element) {
  container.prepend(element);
}

function handleFormAddElement(evt) {
  evt.preventDefault();
  addElement(listElements,creatElement(inputLink.value, inputTitle.value)); 
  togglePopup(addForm);
}

//TEMPLATE + ARRAY => 6 CARDS
function renderElements () {
  initialElements.forEach((item)=> listElements.appendChild(creatElement(item.link, item.name)));
}

renderElements();

// DELETE ELEMENT
function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

// LIKE ELEMENT
function handleLike(evt) {
  evt.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

// POPUP-IMAGE
function handleImage(evt) {
  imagePopupImage.src = evt.target.closest('.element__image').src; //спасибо за коммертарии, допилю их в след. спринт
  imagePopupImage.alt = evt.target.closest('.element__image').alt  //боюсь что-то накосячить)))
  captionPopupImage.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  togglePopup(popupImage);
}

// LISTENERS for Render element
function setEventListener(element) {
  element.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  element.querySelector('.element__like-button').addEventListener('click', handleLike);
  element.querySelector('.element__image').addEventListener('click', handleImage);
}

//* Events:
// EDIT PROFILE
buttonEditProfile.addEventListener('click', handleButtonEditProfile);
buttonCloseEditForm.addEventListener('click', ()=> togglePopup(editForm));
formProfile.addEventListener('submit', handleFormProfile);
// ADD PLACE
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonCloseAddForm.addEventListener('click', ()=> togglePopup(addForm));
formAddElement.addEventListener('submit', handleFormAddElement);
// POPUP-IMAGE
buttonClosePopupImage.addEventListener('click', ()=> togglePopup(popupImage));

/*
! Попап закрытие по клику на оверлей.
*/

editForm.addEventListener('click', (event)=> {
  if(event.target === event.currentTarget) {
    togglePopup(editForm);
  }
})
addForm.addEventListener('click', (event)=> {
  if(event.target === event.currentTarget) {
    togglePopup(addForm);
  }
})
popupImage.addEventListener('click', (event)=> {
  if(event.target === event.currentTarget) {
    togglePopup(popupImage);
  }
})

//Можно выделить все попапы и потом пройтишь по каждому и дать такие параметры. Одной функцией.

/*
! validation
! 1. Валидация добавления карточки.

todo 2. Это очень костыльный вариант. Нужно посмотреть как его улучшить.

*/

function enableValidation() {
  const form = document.querySelector('.popup__form[name="add-element-form"]');

  // form.addEventListener('submit', handleFormSubmit); // 1.
  form.addEventListener('input', handleFormInput);  // 2.
}

// 2.
function handleFormInput (event) {
  const input = event.target;
  const form = event.currentTarget;

  //1. определить невалидные поля и подготовить сообщение об ошибке

  setCustomerError(input);

  //2. показываем ошибки на форме

  setFieldError(input);

  //3. делаем кнопку активной или неактивной

  setSubmitButtonState(form);

}

// 1.
function setCustomerError (input) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (input.value.length === 0) {
    input.setCustomValidity('Вы пропустили это поле');
    input.classList.add('popup__input_error');
  } else {
    input.classList.remove('popup__input_error');
  }

  if (input.value.length < 2 && input.value.length > 0) {
    input.setCustomValidity(' ');  //! костыль ? как от него избавиться ? еще оно убивает кнопу, которая завязана на Валидности
  }

  if (validity.typeMismatch) {
    input.setCustomValidity('Введите адрес сайта');
    input.classList.add('popup__input_error');
  }

}

// 2.
function setFieldError (input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

// 3.
function setSubmitButtonState (form) {
  const button = form.querySelector('button');
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.add('popup__save-button');
    button.classList.remove('popup__save-button_disabled');
    button.removeAttribute('disabled');
  } else {
    button.classList.remove('popup__save-button');
    button.classList.add('popup__save-button_disabled');
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation();

//! 2. Валидация изменения персональной информации.

function profileValidation() {
  const formProfile = document.querySelector('.popup__form[name="profile-edit-form"]');

  formProfile.addEventListener('input', handleFormInputProfile);  // 2.
}


// 2.
function handleFormInputProfile (event) {
  const input = event.target;
  const formProfile = event.currentTarget;

  //1. определить невалидные поля и подготовить сообщение об ошибке

  setCustomerErrorProfile(input);

  //2. показываем ошибки на форме

  setFieldErrorProfile(input);

  //3. делаем кнопку активной или неактивной

  setSubmitButtonStateProfile(formProfile);

}

// 1.
function setCustomerErrorProfile (input) {

  input.setCustomValidity('');

  if (input.value.length < 2) {
    input.classList.add('popup__input_error');
  } else {
    input.classList.remove('popup__input_error');
  }

  if (input.value.length === 0) {
    input.setCustomValidity('Вы пропустили это поле');
  }

}

// 2.
function setFieldErrorProfile (input) {
  const span = formProfile.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

// 3.
function setSubmitButtonStateProfile (formProfile) {
  const button = formProfile.querySelector('button');
  const isValid = formProfile.checkValidity();

  if (isValid) {
    button.classList.add('popup__save-button');
    button.classList.remove('popup__save-button_disabled');
    button.removeAttribute('disabled');
  } else {
    button.classList.remove('popup__save-button');
    button.classList.add('popup__save-button_disabled');
    button.setAttribute('disabled', 'disabled');
  }
}

profileValidation();

//! Закрытие по esc

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

document.addEventListener ('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup(popupImage);
  }
})
document.addEventListener ('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup(addForm);
  }
})
document.addEventListener ('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup(editForm);
  }
})
