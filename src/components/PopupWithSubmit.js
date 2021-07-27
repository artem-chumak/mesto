import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form')
  }
  //! What is that ?
  handleFormSubmit(handler) {
    this.setFormSubmitHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit();
    });
  }

}