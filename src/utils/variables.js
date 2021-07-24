// PROFILE
export const avatar = document.querySelector('.profile__avatar');
export const buttonEditProfile = document.querySelector('.profile__edit-button'); // BUTTON EDIT PROFILE
export const buttonAddPlace = document.querySelector('.profile__add-button'); // BUTTON ADD PLACE
export const nameProfile = document.querySelector('.profile__name'); // FIELD name
export const occupationProfile = document.querySelector('.profile__occupation'); // FIELD occupation
// ELEMENTS
export const listElements = document.querySelector('.elements__list'); // UL
// TEMPLATE
export const templateElement = document.querySelector('.element-template').content; // TEMPLATE CONTENT
// POPUP EDIT AVATAR
export const avatarForm = document.querySelector('#edit-avatar'); // POPUP
export const formAvatar = avatarForm.querySelector('form'); // FORM edit avatar
// POPUP EDIT PROFILE
export const editForm = document.querySelector('#edit-profile'); // POPUP
export const formEdit = editForm.querySelector('form'); // FORM edit profile
export const inputName = editForm.querySelector('input[name="name"]'); // INPUT name
export const inputOccupation = editForm.querySelector('input[name="about"]'); // INPUT occupation
//POPUP ADD ELEMENT
export const addForm = document.querySelector('#add-place'); // POPUP
export const formElement = addForm.querySelector('form'); // FORM
//POPUP IMAGE
export const popupImage = document.querySelector('.popup_type_image'); // POPUP
//API
export const url = 'https://mesto.nomoreparties.co/v1/cohort-26/'; // URL
export const token = 'b0e0b94f-d543-4f9f-b125-9b741686cafd'; // TOKEN