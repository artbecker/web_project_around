export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._descriptionSelector.textContent,
    };
  }
  setUserInfo(userData) {
    this._nameSelector.textContent = userData.name;
    this._descriptionSelector.textContent = userData.about;
    if (userData.avatar) {
      this._avatarSelector.src = userData.avatar;
    }
  }
}
