//* Arrays:
const initialElements = [
  {
    name: 'Gran Canaria, Spain',
    link: 'https://images.unsplash.com/photo-1619280422582-c49e61e8d64b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80'
  },
  {
    name: 'Tyrol, Austria',
    link: 'https://images.unsplash.com/photo-1617538781355-7aacae1e2575?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1576&q=80'
  },
  {
    name: 'Duhok, Iraq',
    link: 'https://images.unsplash.com/photo-1619143921821-61e111505f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1617&q=80'
  },
  {
    name: 'Leysin, Leysin, Suisse',
    link: 'https://images.unsplash.com/photo-1613934070005-e2f7a68561ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1692&q=80'
  },
  {
    name: 'Grigna Meridionale, Italy',
    link: 'https://images.unsplash.com/photo-1540508664702-7839b9d38075?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80'
  },
  {
    name: 'Fronalpstock, Switzerland',
    link: 'https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1651&q=80'
  }
]; 

//* Variables and constants:
// PROFILE
const buttonEditProfile = document.querySelector('.profile__edit-button'); // BUTTON EDIT PROFILE
const buttonAddPlace = document.querySelector('.profile__add-button'); // BUTTON ADD PLACE
const nameProfile = document.querySelector('.profile__name'); // FIELD name
const occupationProfile = document.querySelector('.profile__occupation'); // FIELD occupation
// ELEMENTS
const listElements = document.querySelector('.elements__list'); // UL
// TEMPLATE
const templateElement = document.querySelector('.element_template').content; // TEMPLATE CONTENT
// ELEMENT
const titleElement = document.querySelector('.element__title'); // TITLE element
const imageElement = document.querySelector('.element__image'); // IMAGE element
// POPUP EDIT PROFILE
const editForm = document.getElementById('edit-profile'); // POPUP
const buttonCloseEditForm = editForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formProfile = editForm.querySelector('.popup__container'); // POPUP FORM
const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
const inputOccupation = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.getElementById('add-place'); // POPUP
const buttonCloseAddForm = addForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formAddElement = addForm.querySelector('.popup__container'); // POPUP FORM
const inputTitle = addForm.querySelector('input[name="place"]'); // INPUT title
const InputLink = addForm.querySelector('input[name="link"]'); // INPUT link
//POPUP IMAGE
const popupImage = document.querySelector('.popup-image'); // POPUP
const buttonClosePopupImage = popupImage.querySelector('.popup-image__exit-button'); // BUTTON close pop-up
const imagePopupImage = popupImage.querySelector('.popup-image__image'); // IMAGE
const titlePopupImage = popupImage.querySelector('.popup-image__title'); //TITLE

//* Functions:
// EDIT PROFILE
function toggleEditForm() {
  editForm.classList.toggle('popup_opened');  //todo сделать один toggle для всех попапов не получилось пока. 
}                                             //todo события не видят функцию :(

function transferNameToForm() {
  inputName.value = nameProfile.textContent;
}

function transferOccupationToForm() {
  inputOccupation.value = occupationProfile.textContent;
}

function handleButtonEditProfile () {
  toggleEditForm();
  transferNameToForm();
  transferOccupationToForm();
}

function handleFormProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  occupationProfile.textContent = inputOccupation.value;
  toggleEditForm();
}

//ADD NEW ELEMENT
function toggleFormAddElement() {
  addForm.classList.toggle('popup_opened');
}

function cleanFormAddElement () {
  InputLink.value = '';
  inputTitle.value = '';
}

function handleButtonAddElement () {
  toggleFormAddElement();
  cleanFormAddElement ();
}

function handleFormAddElement(evt) {
  evt.preventDefault();
  renderElement (InputLink.value, inputTitle.value) 
  toggleFormAddElement();
}

//TEMPLATE + ARRAY => 6 CARDS
function renderElements() {
  initialElements.forEach(renderArreyElement);
}

renderElements();

function renderArreyElement (item) {
  renderElement (item.link, item.name)
}
//todo думаю, что это лишняя итерация. Не понимаю, как записать в renderElements

function renderElement (link, title) {
  const htmlElement = templateElement.cloneNode(true);
  htmlElement.querySelector('.element__image').src = link;
  htmlElement.querySelector('.element__title').innerText = title;
  setEventListener(htmlElement);
  listElements.insertBefore(htmlElement, listElements.firstChild);
}
//todo отрисовка с конца массива, чтобы можно было применить для добавления нового элемента.
//todo может эту строчку можно вынести из функции, но у меня пока не получилось.

// DELETE ELEMENT
function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

// LIKE ELEMENT
function handleLike(evt) {
  evt.target.closest('.element__like-button').classList.toggle('element__like-button_active')
}

// POPUP-IMAGE
function toggleImage() {
  popupImage.classList.toggle('popup_opened');
}

function handleImage(evt) {
  imagePopupImage.src = evt.target.closest('.element__image').src;
  titlePopupImage.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
}

// LISTENERS for Render element
function setEventListener(element) {
  element.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  element.querySelector('.element__like-button').addEventListener('click', handleLike);
  element.querySelector('.element__image').addEventListener('click', toggleImage);
  element.querySelector('.element__image').addEventListener('click', handleImage);
}

//* Events:
// EDIT PROFILE
buttonEditProfile.addEventListener('click', handleButtonEditProfile);
buttonCloseEditForm.addEventListener('click', toggleEditForm);
formProfile.addEventListener('submit', handleFormProfile);
// ADD PLACE
buttonAddPlace.addEventListener('click', handleButtonAddElement);
buttonCloseAddForm.addEventListener('click', toggleFormAddElement);
formAddElement.addEventListener('submit', handleFormAddElement);
// POPUP-IMAGE
buttonClosePopupImage.addEventListener('click', toggleImage);