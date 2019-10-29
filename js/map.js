'use strict';

// Модуль card.js
(function () {
  var pinArea = window.data.map.querySelector('.map__pins');

  function generateCards(data) {
    var cardTemplate = document.querySelector('#card')
        .content
        .querySelector('.map__card');

    var cardElement = cardTemplate.cloneNode(true);
    var optionsInElement = cardElement.querySelectorAll('.popup__feature');
    var photo = cardElement.querySelector('.popup__photo');

    var typeToName = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    photo.style.display = 'none';

    cardElement.querySelectorAll('.popup__feature').forEach(function (it) {
      it.style.display = 'none';
    });

    cardElement.querySelector('.popup__title').innerText = data.offer.title;
    cardElement.querySelector('.popup__text--address').innerText = data.offer.address;
    cardElement.querySelector('.popup__text--price').innerText = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').innerText = typeToName[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').innerText = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    for (var i = 0; i < data.offer.features.length; i++) {
      for (var j = 0; j < optionsInElement.length; j++) {
        if (optionsInElement[j].classList.contains('popup__feature--' + data.offer.features[i])) {
          optionsInElement[j].style.display = 'inline-block';
        }
      }
    }

    cardElement.querySelector('.popup__description').innerText = data.offer.description;

    for (var k = 0; k < data.offer.photos.length; k++) {
      var imageElement = photo.cloneNode(true);
      imageElement.style.display = 'inline';
      imageElement.src = data.offer.photos[i];
      cardElement.appendChild(imageElement);
    }

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    return cardElement;
  }

  function renderCards() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.mockArray.length; i++) {
      fragment.appendChild(generateCards(window.data.mockArray[i]));
    }

    pinArea.appendChild(fragment);
  }

  renderCards();

  window.card = {

  };
})();


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
    debugger;
    var pinArea = window.data.map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var filteredByTypePins = [];
    var filteredPins = [];

    function filterByType() {
      filteredByTypePins = pins.filter(function (it) {
        return it.offer.type === window.form.adFormTypeSelect.value;
      });
    }
    filterByType();

    function filterByNumber(number) {
      filteredPins = filteredByTypePins.filter(function (it, index) {
        return index < number;
      });
    }
    filterByNumber(5);

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
    });
  }

  renderPins();

  window.map = {
    updatePins: updatePins,
    clearMap: clearMap
  };
})();
