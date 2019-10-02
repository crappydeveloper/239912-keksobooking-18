var map = document.querySelector(".map");
var pin = map.querySelector(".map__pin--main");
var typeSelect = map.querySelector("#housing-type");
var priceSelect = map.querySelector("#housing-price");
var roomsSelect = map.querySelector("#housing-rooms");
var guestsSelect = map.querySelector("#housing-guests");
var featuresFieldset = map.querySelector("#housing-features");

var adForm = document.querySelector(".ad-form");
var adFormHeaderFieldset = adForm.querySelector(".ad-form-header");
var adFormFieldsets = adForm.querySelectorAll(".ad-form__element");

var pinData = getData();

typeSelect.disabled = "disabled";
priceSelect.disabled = "disabled";
roomsSelect.disabled = "disabled";
guestsSelect.disabled = "disabled";
featuresFieldset.disabled = "disabled";

adFormHeaderFieldset.disabled = "disabled";

(function() {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = "disabled";
  }
}());

//активирование/деактивирование карты по клику
function pinInactiveClickHandler() {
  map.classList.remove("map--faded");
  adForm.classList.remove("ad-form--disabled");
  typeSelect.disabled = "";
  priceSelect.disabled = "";
  roomsSelect.disabled = "";
  guestsSelect.disabled = "";
  featuresFieldset.disabled = "";

  adFormHeaderFieldset.disabled = "";

  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = "";
  }
};

//Нужно 3 обработчика: onload, mousedown, mousemove
//Заполнение формы адреса после клика/переноса метки
function enterCoordinatesLoadHandler() {
}
function enterCoordinatesMoveHandler() {
}
function enterCoordinatesClickHandler() {
  /*
  найти поле адреса. 
  addresInput.value = высчитать координаты конца пина
  Взаимодействие с меткой приводит к заполнению поля адреса. (Для этого и есть данная ф-ия)
  В поле записаны координаты острого конца метки.

  Поле адреса также должно быть заполнено сразу после открытия страницы. ()
  Детали определения координат для поля «адрес» перечислены в техническом задании.

  Для определения смещения координаты относительно левого верхнего угла метки можно использовать любой способ,
  в том числе, вычисление размеров метки. Кроме этого, можно хранить размеры метки как константу.

  4.1. Приблизительный адрес квартиры указывается перемещением специальной метки по карте Токио.
  Содержимое поля адреса должно соответствовать координатам метки:
    в неактивном режиме страницы подставляются координаты центра метки;
    при переходе страницы в активное состояние в поле адреса подставляются координаты острого конца метки;
    при перемещении (mousemove) метки в поле адреса подставляются координаты острого конца метки

  4.2. Формат значения поля адреса: {{x}}, {{y}}
  Координаты не должны быть дробными. (Math.round)

  4.3. Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
  Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка.
  (БЛЭТ, Я ЖЕ ИХ СЧИТАЛ В Ф-ИИ)

  4.4. При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока.
  При выходе за границы блока часть метки скрывается. Скрытие реализовано стилями блока.
  (Если нет св-ва overflow: hidden, то добавить через JS)
  */
}

//window.addEventListener("load", enterCoordinatesLoadHandler);
pin.addEventListener("mousedown", pinInactiveClickHandler);
//pin.addEventListener("mousemove", enterCoordinatesMoveHandler);

function getData() {
  var mockArray = [];
  var mapWidth = map.offsetWidth;
  var types = ["palace", "flat", "house", "bungalo"];

  function getRandomItems(arr) {
    return Math.floor(Math.random() * (arr.length + 1)) - 1;
  }

  function getFeatures() {
    var chosenFeatures = [];
    var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

    for (var i = 0; i <= getRandomItems(features); i++) {
      chosenFeatures.push(features[i]);
    }

    return chosenFeatures;
  }

  function getPhotos() {
    var photos = [];
    var sourcePhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

    for (var i = 0; i <= Math.floor(Math.random() * sourcePhotos.length); i++) {
      photos[i] = sourcePhotos[i];
    }

    return photos;
  }

  for (var i = 1; i <= 8; i++) {
    var location = {
      x: Math.floor(Math.random() * mapWidth),
      y: Math.random() * 500 + 130
    }

    mockArray.push({
      author: {
        avatar: "img/avatars/user0" + i + ".png"
      },
      location: location,
      offer: {
        title: "Мое предложение",
        address: location.x + ", " + location.y,
        price: 9876,
        type: types[Math.floor(Math.random() * types.length)],
        rooms: i,
        guests: i - 1,
        checkin: "13:00",
        checkout: "12:00",
        features: getFeatures(),
        description: "Строка с описанием",
        photos: getPhotos()
      }
    });
  }
  return mockArray;
}

function generatePins(pin) {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector("#pin")
    .content
    .querySelector(".map__pin");

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector("img").alt = pin.offer.title;
  pinElement.querySelector("img").src = pin.author.avatar;
  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + "px";
  pinElement.style.top = pin.location.y - PIN_HEIGHT + "px";

  return pinElement;
}

function renderPins() {
  var pinArea = map.querySelector(".map__pins");
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinData.length; i++) {
    fragment.appendChild(generatePins(pinData[i]));
  }

  pinArea.appendChild(fragment);
}
