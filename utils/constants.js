export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const nameInput = document.querySelector("input[name='name']");
export const aboutInput = document.querySelector("input[name='description']");
export const titleInput = document.querySelector("input[name='title']");
export const linkInput = document.querySelector("input[name='url']");
export const editButton = document.querySelector(".edit-button");
export const addButton = document.querySelector(".add-button");
export const gallery = document.querySelector(".gallery");
export const gallerySelector = ".gallery";
export const profileFormElement = document.querySelector(
  ".popup__form_profile"
);
export const pictureFormElement = document.querySelector(
  ".popup__form_picture"
);

export const initialCards = [
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
