import { openPicturePopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick(evt) {
    const imageSrc = evt.target.src;
    const imageAlt = evt.target.alt;
    openPicturePopup(imageSrc, imageAlt, this._name);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".like-button");
    likeButton.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });
    const deleteButton = this._element.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", (evt) => {
      this._handleImageClick(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt =
      "picture of " + this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
