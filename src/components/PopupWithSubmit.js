import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._confirmButton = this._form.querySelector('.popup__save-button')
  }

  handleFormSubmit(action) {
    this._handleFormSubmitdelet = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmitdelet();
    });
  }

  setButtonText(isDeleting) {
    if (isDeleting) {
      this._confirmButton.textContent = 'Удаление...'
    } else {
      this._confirmButton.textContent = 'Да'
    }
  }

}