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
  var pins = [];

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

  function updatePins() {
    var pinArea = window.data.map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var filteredByTypePins = [];
    var filteredPins = [];

    function filterByType() {
      filteredByTypePins = pins.filter(function (it) {
        return it.offer.type === window.form.adFormTypeSelect.value;
      })
    }
    filterByType();

    function filterByNumber(number) {
      filteredPins = filteredByTypePins.filter(function (it, index) {
        return index < number;
      });
    }
    filterByNumber();

    for (var j = 0; j < filteredPins.length; j++) {
      fragment.appendChild(generatePins(filteredPins[j]));
    }

    pinArea.appendChild(fragment);
  }

  function renderPins() {
    function successHandler(data) {
      pins = data;
      updatePins();
    }

    function setListener() {
      var popup = window.data.map.querySelector('.error');
      var popupMessage = popup.querySelector('.error__message');
      var popupCloseButton = popup.querySelector('.error__button');

      function closePopup() {
        popup.remove();
        document.removeEventListener('keydown', popupEscHandler);
        window.removeEventListener('click', closePopup);
      }

      function popupEscHandler(evt) {
        var ESC_KEYCODE = 27;

        if (evt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      }

      function popupClickHandler(evt) {
        if (evt.target !== popupMessage) {
          closePopup();
        }
      }

      document.addEventListener('keydown', popupEscHandler);
      popupCloseButton.addEventListener('click', closePopup);
      window.addEventListener('click', popupClickHandler);
    }

    function errorHandler() {
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');

      var errorElement = errorTemplate.cloneNode(true);

      window.data.map.appendChild(errorElement);
      setListener();
    }

    var htmlacademyURL = 'https://js.dump.academy/keksobooking/data';
    window.xhr.load(htmlacademyURL, successHandler, errorHandler);
  }

  function clearMap() {
    var renderedPins = window.data.map.querySelectorAll('button[type="button"]');

    renderedPins.forEach(function (it) {
      it.remove();
    })
  }

  renderPins();

  window.map = {
    updatePins: updatePins,
    clearMap: clearMap
  }
})();
