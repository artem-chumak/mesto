import { initialElements } from './initial-сards.js';
import { arrayValidation } from './validation-list.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';

//* Variables and constants:
// PROFILE
const buttonEditProfile = document.querySelector('.profile__edit-button'); // BUTTON EDIT PROFILE
const buttonAddPlace = document.querySelector('.profile__add-button'); // BUTTON ADD PLACE
const nameProfile = document.querySelector('.profile__name'); // FIELD name
const occupationProfile = document.querySelector('.profile__occupation'); // FIELD occupation
// ELEMENTS
const listElements = document.querySelector('.elements__list'); // UL
const cardListSection = '.elements__list';
// TEMPLATE
// const templateElement = document.querySelector('.element-template').content; // TEMPLATE CONTENT
// ELEMENT
// const titleElement = document.querySelector('.element__title'); // TITLE element
// const imageElement = document.querySelector('.element__image'); // IMAGE element
// POPUP EDIT PROFILE
const editForm = document.querySelector('#edit-profile'); // POPUP
// const buttonCloseEditForm = editForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
// const formProfile = editForm.querySelector('.popup__container'); // POPUP FORM
const formEdit = editForm.querySelector('form'); // FORM edit profile
const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
const inputOccupation = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.querySelector('#add-place'); // POPUP
const formElement = addForm.querySelector('form'); // FORM
// const buttonCloseAddForm = addForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
// const formAddElement = addForm.querySelector('.popup__container'); // POPUP FORM
const inputTitle = addForm.querySelector('input[name="place"]'); // INPUT title
const inputLink = addForm.querySelector('input[name="link"]'); // INPUT link
//POPUP IMAGE
// const popupImage = document.querySelector('.popup_type_image'); // POPUP
// const buttonClosePopupImage = popupImage.querySelector('.popup__exit-button'); // BUTTON close pop-up
// const imagePopupImage = popupImage.querySelector('.popup__image'); // IMAGE
// const captionPopupImage = popupImage.querySelector('.popup__caption'); //CAPTION

//* Functions:
//! click on image
function handleCardClick(name, link) {
  popupTypeImage.open(name, link);
}
//!
//POPUP
// function handleEsc(event) {
//   const popup = document.querySelector('.popup_opened');
//   if (event.key === 'Escape') {
//     closePopup(popup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened')
//   document.addEventListener('keydown', handleEsc);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEsc);
// }

//EDIT PROFILE
// function handleButtonEditProfile() {
//   openPopup(editForm);
//   inputName.value = nameProfile.textContent;
//   inputOccupation.value = occupationProfile.textContent;
// }



//ADD NEW ELEMENT
// function handleButtonAddElement() {
//   openPopup(addForm);
//   formElement.reset();
//   validotionAddElementForm.toggleButtonState();
// }

function creatNewElement() {
  const card = new Card({ name: inputTitle.value, link: inputLink.value }, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleFormAddElement(evt) {
  // evt.preventDefault();
  listElements.prepend(creatNewElement());
  popupAddElement.close();
}
//! add element

function handleButtonAddElement() {
  popupAddElement.open();
}

buttonAddPlace.addEventListener('click', handleButtonAddElement);

const popupAddElement = new PopupWithForm('#add-place', handleFormAddElement);
popupAddElement.setEventListeners();

//!


//! edit profile

function handleFormProfile(evt) {
  // evt.preventDefault();
  nameProfile.textContent = inputName.value;
  occupationProfile.textContent = inputOccupation.value;
  popupEditProfile.close();
}

function handleButtonEdit() {
  popupEditProfile.open();
  inputName.value = nameProfile.textContent;
  inputOccupation.value = occupationProfile.textContent;
}

buttonEditProfile.addEventListener('click', handleButtonEdit);

const popupEditProfile = new PopupWithForm('#edit-profile', handleFormProfile)
popupEditProfile.setEventListeners();
//!

//* Initials
//CARDS-ELEMENTS
//! class Section
const cardList = new Section({
  data: initialElements,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  },
}, cardListSection);

cardList.renderItems();
//!

//! popup image

const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

//! popup form


//VALIDATIONS
const validationEditForm = new FormValidator(arrayValidation, formEdit);
validationEditForm.enableValidation();

const validotionAddElementForm = new FormValidator(arrayValidation, formElement);
validotionAddElementForm.enableValidation();

//* Events:
// EDIT PROFILE
// buttonEditProfile.addEventListener('click', handleButtonEditProfile);
// buttonCloseEditForm.addEventListener('click', () => closePopup(editForm));
// formProfile.addEventListener('submit', handleFormProfile);
// editForm.addEventListener('click', (event) => { // overlay click => close popup
//   if (event.target === event.currentTarget) {
//     closePopup(editForm);
//   }
// })

// ADD PLACE
// buttonAddPlace.addEventListener('click', handleButtonAddElement);
// buttonCloseAddForm.addEventListener('click', () => closePopup(addForm));
// formAddElement.addEventListener('submit', handleFormAddElement);
// addForm.addEventListener('click', (event) => { // overlay click => close popup
//   if (event.target === event.currentTarget) {
//     closePopup(addForm);
//   }
// })

// POPUP-IMAGE
// buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));
// popupImage.addEventListener('click', (event) => { // overlay click => close popup
//   if (event.target === event.currentTarget) {
//     closePopup(popupImage);
//   }
// })