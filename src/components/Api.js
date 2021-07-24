export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  handleCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  handleUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._handleResponse);
  }

  handleAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handleResponse);
  }
}

  // Что должно быть:
  //// загрузи карточки с сервера
  //// загрузи карточки на сервера
  //// загрузи профиль с сервера
  //// загрузи профиль на сервер
  //// загрузи аватар с сервера
  //// загрузи аватар на сервер
  //* загрузка
  //* поставь лайк
  //* поставь убери лайк
  //* удали свою карточку
  //* удали свою карточку

//* b0e0b94f-d543-4f9f-b125-9b741686cafd
//* cohort-26