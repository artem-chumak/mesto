export default class UserInfo {
  constructor(userName, userOccupation) {
    this._userName = userName;
    this._userOccupation = userOccupation;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      occupotion: this._userOccupation.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.occupotion;
  }

}