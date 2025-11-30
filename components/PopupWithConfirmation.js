import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
  }

  setAction(action) {
    this._handleConfirmClick = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleConfirmClick();
    });
  }
}
