import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._confirmButton = this._form.querySelector('.popup__save-button');
    this._inputs =this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputList = Array.from(this._inputs);
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setButtonText(isDeleting) {
    if (isDeleting) {
      this._confirmButton.textContent = 'Сохранение...'
    } else {
      this._confirmButton.textContent = 'Сохранить'
    }
  }

}