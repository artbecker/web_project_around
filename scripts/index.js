const editButton = document.querySelector(".edit-button");
const addButton = document.querySelector(".add-button");
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_profile");
const addPicturePopup = document.querySelector(".popup_add-picture");
const picturePopup = document.querySelector(".popup_picture");
const profileFormElement = document.querySelector(".popup__form_profile");
const pictureFormElement = document.querySelector(".popup__form_picture");
const closeButtons = document.querySelectorAll(".close-button");
const nameInput = document.querySelector("[name='name']");
const aboutInput = document.querySelector("[name='about']");
const titleInput = document.querySelector("[name='title']");
const linkInput = document.querySelector("[name='url']");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card-template");

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

function openProfilePopup() {
  profilePopup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
}

function openAddPicturePopup() {
  addPicturePopup.classList.add("popup_open");
  titleInput.value = "";
  linkInput.value = "";
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
  const newCard = createCard(titleInput.value, linkInput.value);
  gallery.prepend(newCard);
  closePopup();
}

function createCard(name, link) {
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = "picture of " + name;
  const likeButton = card.querySelector(".like-button");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("like-button_active");
  });
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", function (evt) {
    card.remove();
  });
  const cardImage = card.querySelector(".card__image");
  cardImage.addEventListener("click", function (evt) {
    const imageSrc = evt.target.src;
    const imageAlt = evt.target.alt;
    const imageTitle = card.querySelector(".card__title").textContent;
    openPicturePopup(imageSrc, imageAlt, imageTitle);
  });
  return card;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  gallery.prepend(cardElement);
});

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", openAddPicturePopup);

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

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

pictureFormElement.addEventListener("submit", handlePictureFormSubmit);
