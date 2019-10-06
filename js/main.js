var map = document.querySelector(".map");
var pin = map.querySelector(".map__pin--main");
var typeSelect = map.querySelector("#housing-type");
var priceSelect = map.querySelector("#housing-price");
var roomsSelect = map.querySelector("#housing-rooms");
var guestsSelect = map.querySelector("#housing-guests");
var featuresFieldset = map.querySelector("#housing-features");

var adForm = document.querySelector(".ad-form");
var adFormHeaderFieldset = adForm.querySelector(".ad-form-header");
var adFormCapacitySelect = adForm.querySelector("#capacity");
var adFormFieldsets = adForm.querySelectorAll(".ad-form__element");

var guests0 = adFormCapacitySelect.querySelector("option[value='0']").cloneNode(true);
var guests1 = adFormCapacitySelect.querySelector("option[value='1']").cloneNode(true);
var guests2 = adFormCapacitySelect.querySelector("option[value='2']").cloneNode(true);
var guests3 = adFormCapacitySelect.querySelector("option[value='3']").cloneNode(true);

var pinData = getData();

typeSelect.disabled = "disabled";
priceSelect.disabled = "disabled";
roomsSelect.disabled = "disabled";
guestsSelect.disabled = "disabled";
featuresFieldset.disabled = "disabled";

adFormHeaderFieldset.disabled = "disabled";

for (var i = 0; i < adFormFieldsets.length; i++) {
  adFormFieldsets[i].disabled = "disabled";
}

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

  for (var k = 0; k < adFormFieldsets.length; k++) {
    adFormFieldsets[k].disabled = "";
  }
}

function enterCoordinatesLoadHandler() {
  var pinXPosition = +pin.style.left.slice(0, -2);
  var pinYPosition = +pin.style.top.slice(0, -2);
  var centerPinX = Math.round(pinXPosition + (pin.offsetWidth / 2));
  var centerPinY = Math.round(pinYPosition + (pin.offsetHeight / 2));

  adForm.querySelector("#address").value = centerPinX + ", " + centerPinY;
}

function enterCoordinatesClickHandler() {
  var pinXPosition = +pin.style.left.slice(0, -2);
  var pinYPosition = +pin.style.top.slice(0, -2);
  var centerPinX = Math.round(pinXPosition + (pin.offsetWidth / 2));
  var lowestPinY = Math.round(pinYPosition + pin.offsetHeight);

  adForm.querySelector("#address").value = centerPinX + ", " + lowestPinY;
}

function checkRoomsClickHandler() {
  var roomsSelect = adForm.querySelector("#room_number");
  var fragment = document.createDocumentFragment();

  adFormCapacitySelect.innerHTML = "";

  switch (roomsSelect.value) {
    case "3":
      fragment.appendChild(guests3);
      fragment.appendChild(guests2);
      fragment.appendChild(guests1);
      break;
    case "2":
      fragment.appendChild(guests2);
      fragment.appendChild(guests1);
      break;
    case "1":
      fragment.appendChild(guests1);
      break;
    case "100":
      fragment.appendChild(guests0);
  }

  adFormCapacitySelect.appendChild(fragment);
}

window.addEventListener("load", enterCoordinatesLoadHandler);
pin.addEventListener("mousedown", function() {
  pinInactiveClickHandler();
  enterCoordinatesClickHandler();
});
adFormCapacitySelect.addEventListener("mousedown", checkRoomsClickHandler);

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

  for (var j = 0; j < pinData.length; j++) {
    fragment.appendChild(generatePins(pinData[j]));
  }

  pinArea.appendChild(fragment);
}
