export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteClick,
      handleLikeClick,
      currentUserId,
    },
    cardSelector
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked || false;
    this._ownerId = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._currentUserId = currentUserId || null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleImageClick() {
    this._handleCardClick({
      name: this._name,
      link: this._link,
    });
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".like-button");
    likeButton.addEventListener("click", (evt) => {
      this._handleLikeClick(this._id, this._isLiked);
    });
    const deleteButton = this._element.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", (evt) => {
      this._handleImageClick(evt);
    });
  }

  _isOwnCard() {
    return this._ownerId === this._currentUserId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt =
      "picture of " + this._name;

    const likeButton = this._element.querySelector(".like-button");
    if (this._isLiked) {
      likeButton.classList.add("like-button_active");
    }

    const deleteButton = this._element.querySelector(".delete-button");
    if (!this._isOwnCard()) {
      deleteButton.style.display = "none";
    }

    this._setEventListeners();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
  }

  updateLikeState(isLiked) {
    this._isLiked = isLiked;

    const likeButton = this._element.querySelector(".like-button");
    if (isLiked) {
      likeButton.classList.add("like-button_active");
    } else {
      likeButton.classList.remove("like-button_active");
    }
  }
}
