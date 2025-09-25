const editButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button");
const formElement = document.querySelector(".popup__form");
const saveButton = document.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("[name='name']");
const aboutInput = document.querySelector("[name='about']");

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
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
