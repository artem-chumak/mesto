//! Arrays


//! Variables:

//* BUTTON Edit Profile
let buttonEditProfile = document.querySelector('.profile__edit-button');
//* FIELD name
let nameProfile = document.querySelector('.profile__name');
//* FIELD occupation
let occupationProfile = document.querySelector('.profile__occupation');
//* POP-UP
let editForm = document.querySelector('.popup');
//* BUTTON close pop-up
let closeForm = document.querySelector('.popup__exit-button');
//* FORM
let formProfile = document.querySelector('.popup__container');
//* INPUT name
let nameInput = document.querySelector('input[name="name"]');
//* INPUT occupation
let occupationInput = document.querySelector('input[name="occupation"]');

//todo new code template
//todo Это добавление нового места.

//* BUTTON add place
let buttonAddPlace = document.querySelector('.profile__add-button');
//* TITLE element
let titleElement = document.querySelector('.element__title');
//* IMAGE element
let imageElement = document.querySelector('.element__image');
//* POP-UP
let addForm = document.querySelector('.popup-place');
//* BUTTON close pop-up
let closeAddForm = document.querySelector('.popup-place__exit-button');
//* FORM
let formAddElement = document.querySelector('.popup-place__container');
//* INPUT title
let titleInput = document.querySelector('input[name="place"]');
//* INPUT link
let linkInput = document.querySelector('input[name="link"]');
//* BUTTON add new place
let submitNewPlace =document.querySelector('.popup-place__save-button')

//* Open/Close popup
function toggleAddForm() {
  addForm.classList.toggle('popup_opened');
}

//рендер нового элемента
function addNewPlace(evt) {
  evt.preventDefault();
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__image').src = linkInput.value;
  htmlElement.querySelector('.element__title').innerText = titleInput.value;
  setEventListener(htmlElement);
  elementList.insertBefore(htmlElement, elementList.firstChild);
}

//* CLICK button add place
buttonAddPlace.addEventListener('click', toggleAddForm);

//* CLICK button clase popup
closeAddForm.addEventListener('click', toggleAddForm);

//* CLICK button add new place
submitNewPlace.addEventListener('click', addNewPlace);
submitNewPlace.addEventListener('click', toggleAddForm);

//todo Кнопка лайк

const likeButton = document.querySelector('element__like-button'); //! null надо выяснить почему
const deleteButton = document.querySelector('.element__delete-button'); //! null выяснить почему

function toggleLike () {
  buttonLike.classList.toggle('element__like-button_active');
}



// массив. Первые 6 объектов, когда страница загрузится.
const initialElements = [
  {
    name: 'Гора Ахун',
    link: './images/ahun.jpg'
  },
  {
    name: 'Ладожское озеро',
    link: './images/ladoga.jpg'
  },
  {
    name: 'Никола-Ленивец',
    link: './images/nikola.jpg'
  },
  {
    name: 'Печоры',
    link: './images/pechory.jpg'
  },
  {
    name: 'Мыс Тобизина',
    link: './images/tobizina.jpg'
  },
  {
    name: 'Калязин',
    link: './images/volga.jpg'
  }
]; 

const elementTemplate = document.querySelector('.element_template').content; // оъект ТЕМПЛЕЙТ
const elementList = document.querySelector('.elements__list'); // объект UL тот, куда будем записывать ТЕМПЛЕЙТ

//renderInitialElements () // коллбек функции. Т.к. она должна сработать при загрузки

function renderElements() {
  initialElements.forEach(renderElement);
}

//! Способ с template

//рендер элемента из массива
function renderElement (item) {
  const htmlElement = elementTemplate.cloneNode(true); //скопировал содержание темплейта
  htmlElement.querySelector('.element__image').src = item.link;
  htmlElement.querySelector('.element__title').innerText = item.name;
  setEventListener(htmlElement);
  elementList.appendChild(htmlElement);
}

//! Кнопка удаления. Для карточек из массива.

function handleDelete(evt) {
evt.target.closest('.element').remove();
}

function handleLike(evt) {
  evt.target.closest('.element__like-button').classList.toggle('element__like-button_active') //like
}

function setEventListener(element) {
  element.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  element.querySelector('.element__like-button').addEventListener('click', handleLike) //like
}

renderElements();

//! Functions:

//* Open/Close popup
function toggleEditForm() {
  editForm.classList.toggle('popup_opened');
}
//* Name and occupation from profile into form
//todo I think it could be one function
function transferNameToForm() {
  nameInput.value = nameProfile.textContent;
}
function transferOccupationToForm() {
  occupationInput.value = occupationProfile.textContent;
}
//* Transfer name and occupation from form into profile and close form
function formSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = occupationInput.value;
  toggleEditForm();
}

//! Events:

//* CLICK button edit profile
//? It seems that I can put all functions into one event but my attempt was failed.
buttonEditProfile.addEventListener('click', toggleEditForm);
buttonEditProfile.addEventListener('click', transferNameToForm);
buttonEditProfile.addEventListener('click', transferOccupationToForm);
//* CLICK button clase popup
closeForm.addEventListener('click', toggleEditForm);
//* CLICK button safe
formProfile.addEventListener('submit', formSubmit);