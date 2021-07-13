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
// TEMPLATE
const templateElement = '.element-template';

// POPUP EDIT PROFILE
const editForm = document.querySelector('#edit-profile'); // POPUP
const formEdit = editForm.querySelector('form'); // FORM edit profile
const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
const inputOccupation = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.querySelector('#add-place'); // POPUP
const formElement = addForm.querySelector('form'); // FORM

//* Functions and Classes:
// ADD ELEMENT
function handleCardClick(name, link) {
  popupTypeImage.open(name, link);
}

//NEW ELEMENT
const popupAddElement = new PopupWithForm('#add-place', handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  validotionAddElementForm.toggleButtonState();
  validotionAddElementForm.hideError();
  popupAddElement.open();
}

function handleFormAddElement(date) {
  listElements.prepend(creatNewElement(date));
  popupAddElement.close();
}

function creatNewElement(date) {
  const card = new Card(date, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//POPUP EDIT PROFILE
const popupEditProfile = new PopupWithForm('#edit-profile', handleFormProfile)
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  inputName.value = userProfile.getUserInfo().name;
  inputOccupation.value = userProfile.getUserInfo().occupotion;
  validationEditForm.toggleButtonState();
  validationEditForm.hideError();
}

function handleFormProfile(userData) {
  userProfile.setUserInfo(userData);
  popupEditProfile.close();
}

//USER INFO
const userProfile = new UserInfo(nameProfile, occupationProfile);

//POPUP IMAGE
const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

//VALIDATIONS
const validationEditForm = new FormValidator(arrayValidation, formEdit);
validationEditForm.enableValidation();

const validotionAddElementForm = new FormValidator(arrayValidation, formElement);
validotionAddElementForm.enableValidation();

//RENDER CARDS
const cardList = new Section({
  data: initialElements,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  },
}, '.elements__list');

cardList.renderItems();

//* Events:
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonEditProfile.addEventListener('click', handleButtonEdit);
