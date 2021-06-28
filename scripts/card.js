export default class Card {
  constructor(data, cardSelector, imagePopupImage, captionPopupImage, openPopup, popupImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imagePopupImage = imagePopupImage;
    this._captionPopupImage = captionPopupImage;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').innerText = this._name;
    return this._element;
  }

  _setEventListeners () {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDelete();
    });
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImage();
    });
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleImage() {
    this._imagePopupImage.src = this._element.querySelector('.element__image').src;
    this._imagePopupImage.alt = this._element.querySelector('.element__image').alt;
    this._captionPopupImage.textContent = this._element.querySelector('.element__title').textContent;
    this._openPopup(this._popupImage);
  }
}
