//* Variables:

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
let nameInput = document.querySelector('.popup__name');
//* INPUT occupation
let occupationInput = document.querySelector('.popup__occupation');

//* Functions:

//* Open/close popup
//? I though I can just switch on/off 'display: none/flex' in '.popup'. As a benefit one class less. 
function toggleEditForm () {
  editForm.classList.toggle('popup_opened');
}
//* Name and occupation from profile inte form
//todo I think it could be one function
function transferNameToForm () {
  nameInput.value = nameProfile.innerHTML;
}
function transferOccupationToForm () {
  occupationInput.value = occupationProfile.innerHTML;
}
//* Transfer name and occupation from form into profile
function formSubmit (evt) {
  evt.preventDefault();
  nameProfile.innerHTML = nameInput.value;
  occupationProfile.innerHTML = occupationInput.value;
}
  
//* Events:

//* CLICK button edit profile
//? It seems that I can put all functions into one event but my attempt was failed.
buttonEditProfile.addEventListener('click', toggleEditForm);
buttonEditProfile.addEventListener('click', transferNameToForm);
buttonEditProfile.addEventListener('click', transferOccupationToForm);
//* CLICK button clase popup
closeForm.addEventListener('click', toggleEditForm);
//* CLICK button safe
formProfile.addEventListener('submit', formSubmit);
formProfile.addEventListener('submit', toggleEditForm);