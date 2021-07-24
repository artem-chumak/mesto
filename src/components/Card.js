export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._place = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.element__title');
    this._imegeElement = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    this._imegeElement.src = this._link;
    this._imegeElement.alt = this._place;
    this._titleElement.textContent = this._place;
    return this._element;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._imegeElement.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
}
