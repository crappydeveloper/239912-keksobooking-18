var map = document.querySelector(".map");
map.classList.remove("map--faded");

function createArray() {
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
    var photosArr = [];
    var sourcePhotosArr = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

    for (var i = 0; i <= getRandomItems(sourcePhotosArr); i++) {
      photosArr[i] = sourcePhotosArr[i];
    }

    return photosArr;
  }

  for (var i = 1; i <= 8; i++) {
    mockArray.push({
      author: {
        avatar: "img/avatars/user0" + i + ".png"
      },
      offer: {
        title: "Мое предложение",
        address: location.x + "," + location.y,
        price: 9876,
        type: types[getRandomItems(types)],
        rooms: i,
        guests: i - 1,
        checkin: "13:00",
        checkout: "12:00",
        features: getFeatures(),
        description: "Строка с описанием",
        "photos": getPhotos()
      },
      location: {
        x: Math.floor(Math.random() * mapWidth),
        y: Math.random() * 500 + 130
      }
    });
  }
  return mockArray;
}