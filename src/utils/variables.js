export const userIformation = {
  userName: '.profile__name',
  userAbout: '.profile__occupation',
  userAvatar: '.profile__avatar',
  userId: null,
};

export const popups = {
  avatar: '#edit-avatar',
  profile: '#edit-profile',
  addPlace: '#add-place',
  image: '#image-popup',
  delete: '#delete-conformation'
}

export const forms = {
  avatar: '#avatar-edit-form',
  plofile: '#plofile-edit-form',
  place: '#add-element-form',
  delete: '#delete-conformation-form'
}

export const buttons = {
  avatar: document.querySelector('.profile__avatar'),
  editProfile: document.querySelector('.profile__edit-button'),
  addPlace: document.querySelector('.profile__add-button')
}

export const template = {
  listElements: '.elements__list',
  element: '.element-template'
}

export const apiInfo = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  token: 'b0e0b94f-d543-4f9f-b125-9b741686cafd'
}