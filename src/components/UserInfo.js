export default class UserInfo {
  constructor(userName, userOccupation, avatar, userId) {
    this._userName = userName;
    this._userOccupation = userOccupation;
    this._avatar = avatar;
    this._userId = userId;
  }

  getUserId () {
    return this._userId;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userOccupation.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
    this._userId = data._id;
    console.log(this._userId);
  }

}