const editButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button");
const formElement = document.querySelector(".popup__form");
const saveButton = document.querySelector(".popup__save-button");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let nameInput = document.querySelector("[name='name']");
let aboutInput = document.querySelector("[name='about']");

function openPopup() {
  popup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove("popup_open");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  popup.classList.remove("popup_open");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
