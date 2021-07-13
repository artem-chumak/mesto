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
// POPUP EDIT PROFILE
const editForm = document.querySelector('#edit-profile'); // POPUP
const formEdit = editForm.querySelector('form'); // FORM edit profile
const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
const inputOccupation = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.querySelector('#add-place'); // POPUP
const formElement = addForm.querySelector('form'); // FORM
const inputTitle = addForm.querySelector('input[name="place"]'); // INPUT title
const inputLink = addForm.querySelector('input[name="link"]'); // INPUT link

//* Functions and Classes:

function handleCardClick(name, link) {
  popupTypeImage.open(name, link);
}

//NEW ELEMENT
const popupAddElement = new PopupWithForm('#add-place', handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  popupAddElement.open();
}

function handleFormAddElement() {
  listElements.prepend(creatNewElement());
  popupAddElement.close();
}

function creatNewElement() {
  const card = new Card({ name: inputTitle.value, link: inputLink.value }, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//EDIT PROFILE
const popupEditProfile = new PopupWithForm('#edit-profile', handleFormProfile)
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  inputName.value = userProfile.getUserInfo().name;
  inputOccupation.value = userProfile.getUserInfo().occupotion;
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

//CARDS-ELEMENTS
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
