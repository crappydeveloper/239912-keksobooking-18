'use strict';

// Модуль card.js
/*
(function () {

  console.log('Модуль card создан!');

  window.card = {

  };
})();
*/

// Модуль pin.js
(function () {
  function generatePins(pinStyle) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').alt = pinStyle.offer.title;
    pinElement.querySelector('img').src = pinStyle.author.avatar;
    pinElement.style.left = pinStyle.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pinStyle.location.y - PIN_HEIGHT + 'px';

    return pinElement;
  }

  function renderPins() {
    var pinData = window.data.mockArray;
    var pinArea = window.data.map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < pinData.length; j++) {
      fragment.appendChild(generatePins(pinData[j]));
    }

    pinArea.appendChild(fragment);
  }

  renderPins();

})();
