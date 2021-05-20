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
let nameInput = document.querySelector('input[name="name"]');
//* INPUT occupation
let occupationInput = document.querySelector('input[name="occupation"]');

//* Functions:

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