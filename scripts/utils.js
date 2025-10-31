import Card from "./Card.js";

const profilePopup = document.querySelector(".popup_profile");
const nameInput = document.querySelector("[name='name']");
const profileName = document.querySelector(".profile__name");
const aboutInput = document.querySelector("[name='about']");
const profileDescription = document.querySelector(".profile__description");
const addPicturePopup = document.querySelector(".popup_add-picture");
const titleInput = document.querySelector("[name='title']");
const linkInput = document.querySelector("[name='url']");
const picturePopup = document.querySelector(".popup_picture");
const gallery = document.querySelector(".gallery");

function openProfilePopup(validator) {
  profilePopup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  validator.resetValidation();
}

function openAddPicturePopup(validator) {
  addPicturePopup.classList.add("popup_open");
  titleInput.value = "";
  linkInput.value = "";
  validator.resetValidation();
}

function openPicturePopup(imageSrc, imageAlt, imageTitle) {
  picturePopup.classList.add("popup_open");
  picturePopup.querySelector(".popup__image").src = imageSrc;
  picturePopup.querySelector(".popup__image").alt = imageAlt;
  picturePopup.querySelector(".popup__image-title").textContent = imageTitle;
}

function closePopup() {
  const openedPopup = document.querySelector(".popup_open");
  openedPopup.classList.remove("popup_open");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup();
}

function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: linkInput.value };
  const cardInstance = new Card(cardData, "#card-template");
  const cardElement = cardInstance.generateCard();
  gallery.prepend(cardElement);
  closePopup();
}

export {
  openProfilePopup,
  openAddPicturePopup,
  openPicturePopup,
  closePopup,
  handleProfileFormSubmit,
  handlePictureFormSubmit,
};
