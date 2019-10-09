// Модуль data.js
'use strict';

(function () {
  var map = document.querySelector('.map');

  var mockArray = [];
  var mapWidth = map.offsetWidth;
  var types = ['palace', 'flat', 'house', 'bungalo'];

  function getRandomItems(arr) {
    return Math.floor(Math.random() * (arr.length + 1)) - 1;
  }

  function getFeatures() {
    var chosenFeatures = [];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    for (var j = 0; j <= getRandomItems(features); j++) {
      chosenFeatures.push(features[j]);
    }

    return chosenFeatures;
  }

  function getPhotos() {
    var photos = [];
    var sourcePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    for (var j = 0; j <= Math.floor(Math.random() * sourcePhotos.length); j++) {
      photos[j] = sourcePhotos[j];
    }

    return photos;
  }

  for (var j = 1; j <= 8; j++) {
    var location = {
      x: Math.floor(Math.random() * mapWidth),
      y: Math.random() * 500 + 130
    };

    mockArray.push({
      author: {
        avatar: 'img/avatars/user0' + j + '.png'
      },
      location: location,
      offer: {
        title: 'Мое предложение',
        address: location.x + ', ' + location.y,
        price: 9876,
        type: types[Math.floor(Math.random() * types.length)],
        rooms: j,
        guests: j - 1,
        checkin: '13:00',
        checkout: '12:00',
        features: getFeatures(),
        description: 'Строка с описанием',
        photos: getPhotos()
      }
    });
  }

  window.data = {
    map: map,
    mockArray: mockArray
  };
})();
