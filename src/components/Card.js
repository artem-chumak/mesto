export default class Card {
  constructor({ data, cardSelector, handleCardClick, userId, handleLikeClick, handleDeleteButton }) {
    this._data = data;
    this._place = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardSelector = document.querySelector(cardSelector).content;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButton = handleDeleteButton;
  }

  getCardId() {
    return this._cardId;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked = data.likes.filter((item) => { return item._id == this._userId; }).length > 0;
    this._likeCounter.textContent = data.likes.length;
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.element__title');
    this._imegeElement = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    this._imegeElement.src = this._link;
    this._imegeElement.alt = this._place;
    this._titleElement.textContent = this._place;
    this._hideDeleteButton();
    this.setLike(this._data);
    return this._element;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._imegeElement.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
