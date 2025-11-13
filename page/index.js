import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  config,
  profileFormElement,
  pictureFormElement,
  gallery,
  editButton,
  addButton,
  titleInput,
  linkInput,
  initialCards,
  gallerySelector,
  nameInput,
  aboutInput,
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(config, profileFormElement);
const pictureFormValidator = new FormValidator(config, pictureFormElement);

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();

function createCard(cardData) {
  return new Card(
    {
      data: cardData,
      handleCardClick: (cardData) => {
        imagePopup.openPopup(cardData.link, cardData.name, cardData.name);
      },
    },
    "#card-template"
  );
}

const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  gallerySelector
);

cardGallery.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const profilePopup = new PopupWithForm(".popup_profile", (formData) => {
  userInfo.setUserInfo(formData);
  profilePopup.closePopup();
});

profilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  profilePopup.openPopup();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.description;
  profileFormValidator.resetValidation();
});

const addPicturePopup = new PopupWithForm(".popup_add-picture", () => {
  const cardData = { name: titleInput.value, link: linkInput.value };
  const cardInstance = createCard(cardData);
  const cardElement = cardInstance.generateCard();
  cardGallery.addItem(cardElement);
  addPicturePopup.closePopup();
});

addPicturePopup.setEventListeners();

addButton.addEventListener("click", () => {
  addPicturePopup.openPopup();
  pictureFormValidator.resetValidation();
});

profileFormValidator.enableValidation();
pictureFormValidator.enableValidation();
