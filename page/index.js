import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openProfilePopup,
  openAddPicturePopup,
  closePopup,
  handleProfileFormSubmit,
  handlePictureFormSubmit,
} from "../components/utils.js";

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const editButton = document.querySelector(".edit-button");
const addButton = document.querySelector(".add-button");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".close-button");
const gallery = document.querySelector(".gallery");
const profileFormElement = document.querySelector(".popup__form_profile");
const pictureFormElement = document.querySelector(".popup__form_picture");
const profileFormValidator = new FormValidator(config, profileFormElement);
const pictureFormValidator = new FormValidator(config, pictureFormElement);

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Vanoise National Park ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => {
  const cardData = { name: card.name, link: card.link };
  const cardInstance = new Card(cardData, "#card-template");
  const cardElement = cardInstance.generateCard();
  gallery.prepend(cardElement);
});

editButton.addEventListener("click", () => {
  openProfilePopup(profileFormValidator);
});

addButton.addEventListener("click", () => {
  openAddPicturePopup(pictureFormValidator);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

popups.forEach((emptySpace) => {
  emptySpace.addEventListener("click", function (evt) {
    if (evt.target === emptySpace) {
      closePopup();
    }
  });
});

document.addEventListener("keydown", function (evt) {
  const openedPopup = document.querySelector(".popup_open");
  if (openedPopup && evt.key === "Escape") {
    closePopup();
  }
});

profileFormValidator.enableValidation();
pictureFormValidator.enableValidation();

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
pictureFormElement.addEventListener("submit", handlePictureFormSubmit);
