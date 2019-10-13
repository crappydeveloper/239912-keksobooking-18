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
    function onSuccess(data) {
      var pinArea = window.data.map.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < data.length; j++) {
        fragment.appendChild(generatePins(data[j]));
      }

      pinArea.appendChild(fragment);
    }

    function setListener() {
      var popup = window.data.map.querySelector('.error');
      var popupCloseButton = popup.querySelector('.error__button');

      function popupEscHandler(evt) {
        var ESC_KEYCODE = 27;

        if (evt.keyCode === ESC_KEYCODE) {
          popup.remove();
        }
      }

      function popupBtnCloseClickHandler() {
        popup.remove();
      }

      document.addEventListener('keydown', function (evt) {
        popupEscHandler(evt);
      })
      popupCloseButton.addEventListener('click', popupBtnCloseClickHandler)
    }

    function onError() {
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');

      var errorElement = errorTemplate.cloneNode(true);
      window.data.map.appendChild(errorElement);

      setListener();
    }

    var htmlacademyURL = 'htsaastps://js.dump.academy/keksobooking/data';
    window.xhr.load(htmlacademyURL, onSuccess, onError);
  }

  renderPins();

})();
