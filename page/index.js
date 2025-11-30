import api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  config,
  profileFormElement,
  pictureFormElement,
  avatarFormElement,
  editButton,
  addButton,
  avatar,
  gallerySelector,
  nameInput,
  aboutInput,
} from "../utils/constants.js";

// variables

let cardGallery;
let currentUserId = null;

// instances

const profileFormValidator = new FormValidator(config, profileFormElement);
const pictureFormValidator = new FormValidator(config, pictureFormElement);
const avatarFormValidator = new FormValidator(config, avatarFormElement);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__pic-image",
});

const profilePopup = new PopupWithForm(".popup_profile", (formData) => {
  api
    .updateUserInfo(formData)
    .then((updatedUserInfo) => {
      userInfo.setUserInfo(updatedUserInfo);
      profilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
});

const avatarPopup = new PopupWithForm(".popup_avatar", (formData) => {
  api
    .updateAvatar(formData)
    .then((updatedAvatar) => {
      userInfo.setUserInfo(updatedAvatar);
      avatarPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
});

const addPicturePopup = new PopupWithForm(".popup_add-picture", (cardData) => {
  api
    .addCard(cardData)
    .then((newCardData) => {
      const cardInstance = createCard(newCardData);
      const cardElement = cardInstance.generateCard();
      cardGallery.addItem(cardElement);
      addPicturePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
});

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();

const deleteConfirmationPopup = new PopupWithConfirmation(".popup_confirm");
deleteConfirmationPopup.setEventListeners();

// functions

function createCard(cardData) {
  const card = new Card(
    {
      data: cardData,
      handleCardClick: (cardData) => {
        imagePopup.openPopup(cardData.link, cardData.name, cardData.name);
      },
      handleDeleteClick: (cardId) => {
        deleteConfirmationPopup.setAction(() => {
          api
            .deleteCard(cardId)
            .then(() => {
              card.deleteCard();
              deleteConfirmationPopup.closePopup();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        deleteConfirmationPopup.openPopup();
      },
      handleLikeClick: (cardId, isLiked) => {
        if (!isLiked) {
          api.likeCard(cardId).then((updatedCardData) => {
            card.updateLikeState(updatedCardData.isLiked);
          });
        } else {
          api.unlikeCard(cardId).then((updatedCardData) => {
            card.updateLikeState(updatedCardData.isLiked);
          });
        }
      },
      currentUserId: currentUserId,
    },
    "#card-template"
  );
  return card;
}

// api methods

api
  .getInitialCards()
  .then((initialCards) => {
    cardGallery = new Section(
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
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

// listeners

profilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  profilePopup.openPopup();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  profileFormValidator.resetValidation();
});

addPicturePopup.setEventListeners();

addButton.addEventListener("click", () => {
  addPicturePopup.openPopup();
  pictureFormValidator.resetValidation();
});

avatarPopup.setEventListeners();

avatar.addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarFormValidator.resetValidation();
});

// validators

profileFormValidator.enableValidation();
pictureFormValidator.enableValidation();
avatarFormValidator.enableValidation();
