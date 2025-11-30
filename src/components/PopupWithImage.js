import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  openPopup(imageSrc, imageAlt, imageTitle) {
    super.openPopup();
    this._popup.querySelector(".popup__image").src = imageSrc;
    this._popup.querySelector(".popup__image").alt = imageAlt;
    this._popup.querySelector(".popup__image-title").textContent = imageTitle;
  }
}
