import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".form__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
