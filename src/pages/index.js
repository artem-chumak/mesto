import '../pages/index.css';
import { buttonEditProfile, buttonAddPlace, nameProfile, occupationProfile, listElements, templateElement, editForm, formEdit, inputName, inputOccupation, addForm, formElement, popupImage } from '../utils/variables.js'
import { initialElements } from '../utils/initial-сards.js';
import { arrayValidation } from '../utils/validation-list.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

//* Functions and Classes:
// ADD ELEMENT
function handleCardClick(place, link) {
  popupTypeImage.open(place, link);
}

//NEW ELEMENT
const popupAddElement = new PopupWithForm(addForm, handleFormAddElement);
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
  const card = new Card(date, templateElement, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//POPUP EDIT PROFILE
const popupEditProfile = new PopupWithForm(editForm, handleFormProfile)
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
const popupTypeImage = new PopupWithImage(popupImage);
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
    const card = new Card(item, templateElement, handleCardClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  },
}, listElements);

cardList.renderItems();

//* Events:
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonEditProfile.addEventListener('click', handleButtonEdit);