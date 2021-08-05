import '../pages/index.css';
import { userIformation, popups, forms, buttons, template, apiInfo} from '../utils/variables.js'
import { arrayValidation } from '../utils/validation-list.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

//ELEMENT
function handleCardClick(place, link) {
  popupTypeImage.open(place, link);
}

function handleDeleteButton(card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setNewHandler(() => {
    popupDeleteConfirmation.setButtonText(true);
    api.setDelete(card.getCardId())
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
  const firstAction = card.isLiked(data) ? api.setDislike(data._id) : api.setLike(data._id);
  firstAction
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewElement(data) {
  const card = new Card({
    data: data,
    cardSelector: template.element,
    handleCardClick: handleCardClick,
    userId: userProfile.getUserInfo().userId,
    handleLikeClick: () => handleLikeClick(card, data),
    handleDeleteButton: () => handleDeleteButton(card),
  })
  return card.generateCard();
}

const cardList = new Section({
  render: (item) => {
    cardList.addItem(createNewElement(item))
  },
  containerSelector: template.listElements
})

//POPUP ADD ELEMENT
const popupAddElement = new PopupWithForm(popups.addPlace, handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  validationAddElementForm.toggleButtonState();
  validationAddElementForm.hideError();
  popupAddElement.open();
}

function handleFormAddElement(data) {
  popupAddElement.setButtonText(true);
  api.setCard(data)
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
const popupEditProfile = new PopupWithForm(popups.profile, handleFormProfile)
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  const profile = userProfile.getUserInfo()
  popupEditProfile.setAutoFill(profile);
  validationEditForm.toggleButtonState();
  validationEditForm.hideError();
}

function handleFormProfile(userData) {
  popupEditProfile.setButtonText(true);
  api.setUserInfo(userData)
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
const popupEditAvatar = new PopupWithForm(popups.avatar, handleFormAvatar)
popupEditAvatar.setEventListeners();

function handleAvatar() {
  validationEditAvatarForm.toggleButtonState();
  validationEditAvatarForm.hideError();
  popupEditAvatar.open();
}

function handleFormAvatar(data) {
  popupEditAvatar.setButtonText(true);
  api.setAvatar(data)
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
const popupDeleteConfirmation = new PopupWithSubmit(popups.delete);
popupDeleteConfirmation.setEventListeners();

//API
const api = new Api({
  baseUrl: apiInfo.url,
  headers: {
    authorization: apiInfo.token,
    'Content-Type': 'application/json'
  }
});

//USER INFO
const userProfile = new UserInfo(userIformation);

//POPUP IMAGE
const popupTypeImage = new PopupWithImage(popups.image);
popupTypeImage.setEventListeners();

//VALIDATIONS
const validationEditAvatarForm = new FormValidator(arrayValidation, forms.avatar);
const validationEditForm = new FormValidator(arrayValidation, forms.plofile);
const validationAddElementForm = new FormValidator(arrayValidation, forms.place);
validationAddElementForm.enableValidation();
validationEditForm.enableValidation();
validationEditAvatarForm.enableValidation();

//*Page render
api.getAllneededData().then(data => {
  const [ cards, userData ] = data;
  userProfile.setUserInfo(userData);
  cardList.renderItems(cards);
})
  .catch((err) => {
    console.log(err)
  }
);

//* Events:
buttons.avatar.addEventListener('click', handleAvatar);
buttons.addPlace.addEventListener('click', handleButtonAddElement);
buttons.editProfile.addEventListener('click', handleButtonEdit);