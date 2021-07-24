// Like и Plus не фиксил, т.к. сказали, что не надо.
import '../pages/index.css';
import { avatar, buttonEditProfile, buttonAddPlace, nameProfile, occupationProfile, listElements, templateElement, editForm, formEdit, inputName, inputOccupation, addForm, formElement, popupImage, url, token } from '../utils/variables.js'
import { arrayValidation } from '../utils/validation-list.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

//* Functions and Classes:
// ADD ELEMENT
function handleCardClick(place, link) {
  popupTypeImage.open(place, link);
}

//NEW ELEMENT
const popupAddElement = new PopupWithForm(addForm, handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  validationAddElementForm.toggleButtonState();
  validationAddElementForm.hideError();
  popupAddElement.open();
}

function createNewElement(data) {
  const card = new Card(data, templateElement, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleFormAddElement(data) {
  listElements.prepend(createNewElement(data));
  popupAddElement.close();
  api.handleCard(data);
}

//POPUP EDIT PROFILE
const popupEditProfile = new PopupWithForm(editForm, handleFormProfile)
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  const profile = userProfile.getUserInfo() // надеюсь я правильно понял
  inputName.value = profile.name;
  inputOccupation.value = profile.about;
  validationEditForm.toggleButtonState();
  validationEditForm.hideError();
}

function handleFormProfile(userData) {
  userProfile.setUserInfo(userData);
  api.handleUserInfo(userData);
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

const validationAddElementForm = new FormValidator(arrayValidation, formElement);
validationAddElementForm.enableValidation();

//RENDER CARDS


//* Events:
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonEditProfile.addEventListener('click', handleButtonEdit);

//! API
//* API
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([initialElements, userData]) => {
    const cardList = new Section({
      items: initialElements,
      renderer: (item) => {
        const card = new Card(item, templateElement, handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    }, listElements);
    cardList.renderItems(); //* Всю простыню, что выше скопировал ради ItitianalElements, наверное можно это сократить до renderItems и оставить это на прежнем месте.

    userProfile.setUserInfo(userData);

    avatar.src = userData.avatar;

  })
  .catch((err) => {
    console.log(err)
  })

console.log(api.getCards());
console.log(api.getUserInfo());
console.log(avatar.src);