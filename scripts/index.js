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
//новый попап

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
//* INPUT name
let titleInput = document.querySelector('input[name="place"]');
//* INPUT occupation
let linkInput = document.querySelector('input[name="link"]');

//Тут нужно навешать еще формулы и прочее говно.


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

const elementTemplate = document.querySelector('.element_template'); // оъект ТЕМПЛЕЙТ
const elementList = document.querySelector('.elements__list'); // объект UL тот, куда будем записывать ТЕМПЛЕЙТ

// function renderInitialElements () {
//   for (let index = 0; index < initialElements.length; index++) { //Конструкция FOR LOOP. 1. И=0 2. И меньше длины массива. 3. +1 к каждой новой итерации. индекс=индекс+1
//     const title = initialElements[index].name; //сделали переменную, в которой будет имя из объекта в массиве
//     const image = initialElements[index].link; //тоже само, но для ссылки

//     elementList.insertAdjacentHTML('beforeend',`
//     <li class="element">
//       <img class="element__image" src="${image}" alt="Фото места">
//       <div class="element__info">
//         <h2 class="element__title">${title}</h2>
//         <button class="button element__like-button" aria-label="Понравилось" type="button"></button>
//       </div>
//     </li>
//     `) //тут мы поместили перед концам UL наш темплейт. те моменты, что отличались, мы заполнили данными
//   }
// }
//
//renderInitialElements () // коллбек функции. Т.к. она должна сработать при загрузки

initialElements.forEach((item) => { //функция принимает три аргумента 1.Элемент массива 2.Номер элемента 3. Сам массив(редко нужно) Тут мы используем только элемент массива. Остальные не заполняли
    elementList.insertAdjacentHTML('beforeend',`
    <li class="element">
      <img class="element__image" src="${item.link}" alt="Фото места">
      <div class="element__info">
        <h2 class="element__title">${item.name}</h2>
        <button class="button element__like-button" aria-label="Понравилось" type="button"></button>
      </div>
    </li>
    `)
})



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