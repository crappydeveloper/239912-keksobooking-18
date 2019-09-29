var map = document.querySelector(".map");
map.classList.remove("map--faded");
var pinData = getData();

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