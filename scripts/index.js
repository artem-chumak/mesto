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
const formElement = addForm.querySelector('form'); // FORM
const buttonCloseAddForm = addForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formAddElement = addForm.querySelector('.popup__container'); // POPUP FORM
const inputTitle = addForm.querySelector('input[name="place"]'); // INPUT title
const inputLink = addForm.querySelector('input[name="link"]'); // INPUT link
//POPUP IMAGE
const popupImage = document.querySelector('.popup_type_image'); // POPUP
const buttonClosePopupImage = popupImage.querySelector('.popup__exit-button'); // BUTTON close pop-up
const imagePopupImage = popupImage.querySelector('.popup__image'); // IMAGE
const captionPopupImage = popupImage.querySelector('.popup__caption'); //CAPTION

//* Functions:
function handleEsc(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', handleEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
}

function handleButtonEditProfile() {
  openPopup(editForm);
  inputName.value = nameProfile.textContent;
  inputOccupation.value = occupationProfile.textContent;
}

function handleFormProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  occupationProfile.textContent = inputOccupation.value;
  closePopup(editForm);
}

//ADD NEW ELEMENT
function handleButtonAddElement() {
  openPopup(addForm);
  formElement.reset();
  const inputList = Array.from(formElement.querySelectorAll('input'));
  const buttonElement = formElement.querySelector('button');
  toggleButtonState(inputList, buttonElement, arrayValidation);
}

//! Поменял функцию.

function handleFormAddElement(evt) {
  evt.preventDefault();
  const card = new Card ({name: inputTitle.value, link: inputLink.value}, '.element-template');
  const cardElement = card.generateCard();
  listElements.prepend(cardElement);
  closePopup(addForm);
}

//! new code

initialElements.forEach((item) => {
  const card = new Card (item, '.element-template');
  const cardElement = card.generateCard();
  const listElements = document.querySelector('.elements__list')
  listElements.prepend(cardElement);
})

//! new code end

//* Events:
// EDIT PROFILE
buttonEditProfile.addEventListener('click', handleButtonEditProfile);
buttonCloseEditForm.addEventListener('click', () => closePopup(editForm));
formProfile.addEventListener('submit', handleFormProfile);
editForm.addEventListener('click', (event) => { // overlay click => close popup
  if (event.target === event.currentTarget) {
    closePopup(editForm);
  }
})

// ADD PLACE
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonCloseAddForm.addEventListener('click', () => closePopup(addForm));
formAddElement.addEventListener('submit', handleFormAddElement);
addForm.addEventListener('click', (event) => { // overlay click => close popup
  if (event.target === event.currentTarget) {
    closePopup(addForm);
  }
})

// POPUP-IMAGE
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));
popupImage.addEventListener('click', (event) => { // overlay click => close popup
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
  }
})