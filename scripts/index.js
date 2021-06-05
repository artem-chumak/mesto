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
  imagePopupImage.src = evt.target.closest('.element__image').src;
  captionPopupImage.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  captionPopupImage.textContent = evt.target.closest('.element__image').alt;
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