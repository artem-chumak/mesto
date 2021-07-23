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

  handleCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // checkTwo() {
  //   return fetch(`${this._baseUrl}users/me`, {
  //     headers: this._headers
  //   })
  //   .then(this._handleResponse);
  // }

//   handleAvatar() {
//     return fetch(`${this._baseUrl}users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({avatar: 'https://images.unsplash.com/photo-1604575852414-a634d32ecf57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1833&q=80'}),
//     })
//     .then(this._handleResponse);
//   }

//   handleUserInfo() {
//     return fetch(`${this._baseUrl}users/me`, {
//             method: 'PATCH',
//             headers: this._headers,
//             body: JSON.stringify({
//                 name: 'Cat',
//                 about: 'Red'
//             })
//         })
//         .then(this._handleResponse)
// }


// Что должно быть:
//* загрузи карточки с сервера
//* загрузи карточки на сервера
//* загрузи профиль с сервера
//* загрузи профиль на сервер
//* загрузи аватар с сервера
//* загрузи аватар на сервер
//* поставь лайк
//* поставь убери лайк
//* удали свою карточку
//* удали свою карточку

}

// fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

//* b0e0b94f-d543-4f9f-b125-9b741686cafd
//* cohort-26