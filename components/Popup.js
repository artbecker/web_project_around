export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  openPopup() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  closePopup() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (this._popup.classList.contains("popup_open") && evt.key === "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    const closeButton = this._popup.querySelector(".close-button");

    closeButton.addEventListener("click", () => {
      this.closePopup();
    });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.closePopup();
      }
    });
  }
}
