// Like и Plus не фиксил, т.к. сказали, что не надо.
import '../pages/index.css';
import { userIformation, avatar, buttonEditProfile, buttonAddPlace, listElements, templateElement, avatarForm, formAvatar, editForm, formEdit, inputName, inputOccupation, addForm, formElement, popupImage, popupDelete, allSubmits, url, token } from '../utils/variables.js'
import { arrayValidation } from '../utils/validation-list.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

//* Functions and Classes:
//ELEMENT
function handleCardClick(place, link) {
  popupTypeImage.open(place, link);
}

function handleDeleteButton(card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setNewHandler(() => {
    popupDeleteConfirmation.setButtonText(true);
    api.handleDelete(card.getCardId())
      .then(() => {
        card.handleDeleteCard();
        popupDeleteConfirmation.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupDeleteConfirmation.setButtonText(false);
      })
  });
}

function handleLikeClick(card, data) {
  const firstAction = card.isLiked(data) ? api.handleDislike(data._id) : api.handleLike(data._id);
  firstAction
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewElement (data) {
  const card = new Card ({
    data: data,
    cardSelector: templateElement,
    handleCardClick: handleCardClick,
    userId: userProfile.getUserInfo().userId,
    handleLikeClick: () => handleLikeClick(card, data),
    handleDeleteButton: () => handleDeleteButton(card),
  })
  return card.generateCard();
}

const cardList = new Section ({
  render: (item) => {
    cardList.addItem(createNewElement(item))
  },
  containerSelector: listElements
})

//POPUP ADD ELEMENT
const popupAddElement = new PopupWithForm(addForm, handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  validationAddElementForm.toggleButtonState();
  validationAddElementForm.hideError();
  popupAddElement.open();
}

function handleFormAddElement(data) {
  popupAddElement.setButtonText(true);
  api.handleCard(data)
    .then((data) => {
      cardList.addItem(createNewElement(data), false);;
      popupAddElement.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAddElement.setButtonText(false);
    })
}

//POPUP EDIT PROFILE
const popupEditProfile = new PopupWithForm(editForm, handleFormProfile)
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  const profile = userProfile.getUserInfo()
  inputName.value = profile.name;
  inputOccupation.value = profile.about;
  validationEditForm.toggleButtonState();
  validationEditForm.hideError();
}

function handleFormProfile(userData) {
  popupEditProfile.setButtonText(true);
  api.handleUserInfo(userData)
    .then((userData) => {
      userProfile.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupEditProfile.setButtonText(false);
    })
}

//POPUP EDIT AVATAR
const popupEditAvatar = new PopupWithForm(avatarForm, handleFormAvatar)
popupEditAvatar.setEventListeners();

function handleAvatar() {
  validationEditAvatarForm.toggleButtonState();
  validationEditAvatarForm.hideError();
  popupEditAvatar.open();
}

function handleFormAvatar(data) {
  popupEditAvatar.setButtonText(true);
  api.handleAvatar(data)
    .then((data) => {
      userProfile.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupEditAvatar.setButtonText(false);
    })
}

//POPUP DELETE CONFIRMATION
const popupDeleteConfirmation = new PopupWithSubmit(popupDelete);
popupDeleteConfirmation.setEventListeners();

//API
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

//USER INFO
const userProfile = new UserInfo(userIformation);

//POPUP IMAGE
const popupTypeImage = new PopupWithImage(popupImage);
popupTypeImage.setEventListeners();

//VALIDATIONS
const validationEditAvatarForm = new FormValidator(arrayValidation, formAvatar);
validationEditAvatarForm.enableValidation();

const validationEditForm = new FormValidator(arrayValidation, formEdit);
validationEditForm.enableValidation();

const validationAddElementForm = new FormValidator(arrayValidation, formElement);
validationAddElementForm.enableValidation();

//*Page render
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([initialElements, userData]) => {
    userProfile.setUserInfo(userData);
    cardList.renderItems(initialElements);
  })
  .catch((err) => {
    console.log(err)
  });

//* Events:
avatar.addEventListener('click', handleAvatar);
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonEditProfile.addEventListener('click', handleButtonEdit);