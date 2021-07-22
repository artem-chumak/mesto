export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  //

}

fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 

// b0e0b94f-d543-4f9f-b125-9b741686cafd
// cohort-26