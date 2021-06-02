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
const elementList = document.querySelector('.elements__list'); // UL
// TEMPLATE
const elementTemplate = document.querySelector('.element_template').content; // TEMPLATE CONTENT
// ELEMENT
const titleElement = document.querySelector('.element__title'); // TITLE element
const imageElement = document.querySelector('.element__image'); // IMAGE element
const likeButton = document.querySelector('element__like-button'); //BUTTON like
const deleteButton = document.querySelector('.element__delete-button'); //BUTTON delete
// POPUP EDIT PROFILE
const editForm = document.getElementById('edit-profile'); // POPUP
const closeForm = editForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formProfile = editForm.querySelector('.popup__container'); // POPUP FORM
const nameInput = editForm.querySelector('input[name="name"]'); // INPUT name
const occupationInput = editForm.querySelector('input[name="occupation"]'); // INPUT occupation
//POPUP ADD ELEMENT
const addForm = document.getElementById('add-place'); // POPUP
const closeAddForm = addForm.querySelector('.popup__exit-button'); // BUTTON close pop-up
const formAddElement = addForm.querySelector('.popup__container'); // POPUP FORM
const titleInput = addForm.querySelector('input[name="place"]'); // INPUT title
const linkInput = addForm.querySelector('input[name="link"]'); // INPUT link
//POPUP IMAGE
const popupImage = document.querySelector('.popup-image'); // POPUP
const popupImageExitButton = popupImage.querySelector('.popup-image__exit-button'); // BUTTON close pop-up
const imagePopupImage = popupImage.querySelector('.popup-image__image'); // IMAGE
const imagePopupTitle = popupImage.querySelector('.popup-image__title'); //TITLE

//* Functions:
// EDIT PROFILE
function toggleEditForm() {                 // Open/Close popup
  editForm.classList.toggle('popup_opened');
}

function transferNameToForm() {             // Name and occupation from profile into form
  nameInput.value = nameProfile.textContent;
}

function transferOccupationToForm() {
  occupationInput.value = occupationProfile.textContent;
}

function formSubmit(evt) {                // Transfer name and occupation from form into profile and close form
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = occupationInput.value;
  toggleEditForm();
}

//ADD NEW ELEMENT
function toggleAddForm() {               // Open/close popup
  addForm.classList.toggle('popup_opened');
}

function cleanForm () {                 // Clean form
  linkInput.value = '';
  titleInput.value = '';
}

function addNewPlace(evt) {            // Add new Element
  evt.preventDefault();
  const htmlElement = elementTemplate.cloneNode(true);  // clone template
  htmlElement.querySelector('.element__image').src = linkInput.value;  // add link
  htmlElement.querySelector('.element__title').innerText = titleInput.value;  // add title
  setEventListener(htmlElement);                                             //! навешиваем события на элементы темплейта
  elementList.insertBefore(htmlElement, elementList.firstChild); // insert into html
  toggleAddForm();                                              //  close popup
}

//TEMPLATE + ARRAY => 6 CARDS
function renderElements() {           // array + render template 6th (array langth) times
  initialElements.forEach(renderElement);
}

renderElements();                     // callback

function renderElement (item) {
  const htmlElement = elementTemplate.cloneNode(true); // clone template
  htmlElement.querySelector('.element__image').src = item.link;  // add link
  htmlElement.querySelector('.element__title').innerText = item.name;  // add title
  setEventListener(htmlElement);                                      //! навешиваем события на элементы темплейта
  elementList.appendChild(htmlElement);                              // insert into html
}

// DELETE ELEMENT
function handleDelete(evt) {           //  remove element
  evt.target.closest('.element').remove();
}

// LIKE ELEMENT
function handleLike(evt) {             //  like active
  evt.target.closest('.element__like-button').classList.toggle('element__like-button_active')
}

// POPUP-IMAGE
function toggleImage() {                 //  Open/close popup
  popupImage.classList.toggle('popup_opened');
}

function handleImage(evt) {             // Transfer src and title
  imagePopupImage.src = evt.target.closest('.element__image').src;
  imagePopupTitle.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
}

// LISTENERS for Render element
function setEventListener(element) {
  element.querySelector('.element__delete-button').addEventListener('click', handleDelete); //delete
  element.querySelector('.element__like-button').addEventListener('click', handleLike); //like
  element.querySelector('.element__image').addEventListener('click', toggleImage); // open popup-image
  element.querySelector('.element__image').addEventListener('click', handleImage); // transfer src and title into popup-image
}

//* Events:
// EDIT PROFILE
buttonEditProfile.addEventListener('click', toggleEditForm);  //BUTTON edi
buttonEditProfile.addEventListener('click', transferNameToForm);
buttonEditProfile.addEventListener('click', transferOccupationToForm);
closeForm.addEventListener('click', toggleEditForm);  //BUTTON exit
formProfile.addEventListener('submit', formSubmit);  //BUTTON submit
// ADD PLACE
buttonAddPlace.addEventListener('click', toggleAddForm);  //BUTTON add place
buttonAddPlace.addEventListener('click', cleanForm);
closeAddForm.addEventListener('click', toggleAddForm);  //BUTTON exit
formAddElement.addEventListener('submit', addNewPlace); //BUTTON submit
// POPUP-IMAGE
popupImageExitButton.addEventListener('click', toggleImage); //BUTTON exit


//todo 1. Функция рендеринга элемента. Сделать одну и потом добавить.
//todo 2. Функцию тоггл можно сделать одну для двух попапов точно. А может и трёх
//todo 3. Проверить все названия по БЭМ. Как сказали в чеклисте.
//? посмотреть как в одно событие добавить несколько функций 
//? посмотреть рекомендацию по 4му спринту, которую я не учёл
//? очистка данных попапа с картинкой, чтобы не было артифактов при открытии нового попапа. Кажется они есть. Проверить.
//todo 4. Проверить плавность закрытия попапа с картинкой, решить проблему
//todo 5. Длина подписи под картинкой. Поискать решение