export default class UserInfo {
  constructor({userName, userAbout, userAvatar, userId}) {
    this._userName = userName;
    this._userOccupation = userAbout;
    this._avatar = userAvatar;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userOccupation.textContent,
      avatar: this._avatar,
      userId: this._userId
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
    this._userId = data._id;
  }
}