//*ОБЪЕКТ-01 Кнопка редактирования профиля
let buttonEditProfile = document.querySelector('.profile__edit-button');

//*ОБЪЕКТ-02 Попап, весь. С оверлеем и формой 
let editForm = document.querySelector('.popup');

//*ОБЪЕКТ-03 Кнопка закрыть форму
let closeForm = document.querySelector('.popup__exit-button');

//*ФУКЦИЯ-01 ОБЪЕКТ-02 Тогл-прибавить/убавить класс всему попапу
function toggleEditForm () {
  editForm.classList.toggle('popup_opened');
}

//? можно ведь просто поменять параметр дисплей на флекс или нане

//* СОБЫТИЕ клик по кнопке редактировать ОБЪЕКТ-01 запускает ФУКЦИЯ-01 прибавть/убавить класс
buttonEditProfile.addEventListener('click', toggleEditForm);
//! тут нужно сделать функцию, что изначально загружаются данные из полей профайла

//* СОБЫТИЕ клик по кнопке закрыть ОБЪЕКТ-03 запускает ФУКЦИЯ-01 прибавть/убавить класс
closeForm.addEventListener('click', toggleEditForm);


//todo ОБЪЕКТ-01
//* Форма. Работает
let formProfile = document.querySelector('.popup__container');

//todo ОБЪКТ-02
//*Поле имя. Работает
let nameInput = document.querySelector('.popup__name');

//todo ОБЪКТ-03
//* Поле род занятий. Работает
let occupationInput = document.querySelector('.popup__occupation');

//todo ФУНКЦИЯ-01
//*Получить значиения из атрибута VALUE у ОБЪЕКТА-02 Имени
console.log(nameInput.value);

//todo ФУНКЦИЯ-02
//* Получить значение из атрибута VOLUE у ОБЪЕКТА-03
console.log(occupationInput.value);

//todo ОБЪЕКТ-04
//* Поле имая куда должен быть записано значение из Инпута
let nameProfile = document.querySelector('.profile__name');
//* Содержимое ОБЪЕКТА-04
nameProfile.innerHTML;

//todo ОБЪЕКТ-05
// *Поле вида деятельности
let occupationProfile = document.querySelector('.profile__occupation');
//* Содержимое ОБЪЕКТА-05
occupationProfile.innerHTML;

//todo ФУНЦИЯ-03
// *Замена ОБЪЕКТА-04 на ФУНКЦИЮ-01 Замена имени в профиле на имя из формы
// nameProfile.innerHTML = nameInput.value;

//todo ФУНКЦИЯ-04
//* Замена ОБЪЕКТА-05 на ФУНКЦИЮ-03 Замена рода деятельности в профиле на значение из формы
// occupationProfile.innerHTML = occupationInput.value;

//todo ФУНКЦИИ-05
//* Все сразу: берем из формы и заменяем в профиле

function formSubmit (evt) {
  evt.preventDefault();
  nameProfile.innerHTML = nameInput.value;
  occupationProfile.innerHTML = occupationInput.value;
}

formProfile.addEventListener('submit', formSubmit);
formProfile.addEventListener('submit', toggleEditForm);


// Находим форму в DOM
//todo let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
//todo let nameInput = // Воспользуйтесь инструментом .querySelector()
//todo let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
//todo function formSubmitHandler (evt) {
//todo    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
//todo }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//todo formElement.addEventListener('submit', formSubmitHandler); 