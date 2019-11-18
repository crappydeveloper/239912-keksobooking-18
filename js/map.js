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

    cardElement.style.display = 'none';

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

  function removeCards() {
    var cards = pinArea.querySelectorAll('.map__card.popup');

    cards.forEach(function (it) {
      it.style.display = 'none';
    });
  }

  function setCardListeners() {

    var buttonsClose = pinArea.querySelectorAll('.popup__close');

    function cardEscHandler(evt) {
      var ESC_KEYCODE = 27;

      if (evt.keyCode === ESC_KEYCODE) {
        removeCards();
      }
    }

    function clickButtonCloseHandler(evt) {
      evt.target.parentNode.style.display = 'none';
    }

    buttonsClose.forEach(function (it) {
      it.addEventListener('click', clickButtonCloseHandler);
    });
    document.addEventListener('keydown', cardEscHandler);
  }

  renderCards();
  setCardListeners();

  window.card = {
    removeCards: removeCards
  };
})();


// Модуль pin.js
(function () {
  var pins = [];
  var pin = window.data.map.querySelector('.map__pin--main');
  var PIN_LEFT_PX = pin.style.left;
  var PIN_TOP_PX = pin.style.top;

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

      var pinsOnMap = window.data.map.querySelectorAll('.map__pin[type="button"]');

      function pinClickHandler(evt) {
        var cards = window.data.map.querySelectorAll('.map__card.popup');

        window.card.removeCards();
        cards.forEach(function (it) {
          if (it.querySelector('img').getAttribute('src') === evt.currentTarget.querySelector('img').getAttribute('src')) {
            it.style.display = 'block';
          }
        });
      }

      pinsOnMap.forEach(function (it) {
        it.addEventListener('click', pinClickHandler);
      });
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

  // movePin

  function pinInactiveClickHandler() {
    window.data.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.typeSelect.disabled = '';
    window.form.priceSelect.disabled = '';
    window.form.roomsSelect.disabled = '';
    window.form.guestsSelect.disabled = '';
    window.form.featuresFieldset.disabled = '';

    window.form.adFormHeaderFieldset.disabled = '';

    for (var k = 0; k < window.form.adFormFieldsets.length; k++) {
      window.form.adFormFieldsets[k].disabled = '';
    }
	
	renderPins();
  }

  function enterCoordinatesClickHandler() {
    var centerPinX = Math.floor(pin.offsetLeft + (pin.offsetWidth / 2));
    var lowestPinY = Math.floor(pin.offsetTop + pin.offsetHeight);

    window.form.adForm.querySelector('#address').value = centerPinX + ', ' + lowestPinY;
  }

  pin.addEventListener('mousedown', function () {
    pinInactiveClickHandler();
    enterCoordinatesClickHandler();
  });

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var MIN_Y = 130;
      var MAX_Y = 630;
      var MAP_WIDTH = window.data.map.offsetWidth;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pin.style.top = (pin.offsetTop - shift.y) + 'px';
      pin.style.left = (pin.offsetLeft - shift.x) + 'px';

      if (pin.offsetLeft + pin.offsetWidth / 2 >= MAP_WIDTH) {
        pin.style.left = MAP_WIDTH - pin.offsetWidth / 2 + 'px';
      } else if (pin.offsetLeft <= 0 - pin.offsetWidth / 2) {
        pin.style.left = 0 - pin.offsetWidth / 2 + 'px';
      }

      if (pin.offsetTop > MAX_Y - pin.offsetHeight) {
        pin.style.top = MAX_Y - pin.offsetHeight + 'px';
      } else if (pin.offsetTop < MIN_Y - pin.offsetHeight) {
        pin.style.top = MIN_Y - pin.offsetHeight + 'px';
      }

      enterCoordinatesClickHandler();
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      enterCoordinatesClickHandler();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  function setPageInactive() {
    window.data.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.typeSelect.disabled = 'disabled';
    window.form.priceSelect.disabled = 'disabled';
    window.form.roomsSelect.disabled = 'disabled';
    window.form.guestsSelect.disabled = 'disabled';
    window.form.featuresFieldset.disabled = 'disabled';

    window.form.adFormHeaderFieldset.disabled = 'disabled';

    for (var k = 0; k < window.form.adFormFieldsets.length; k++) {
      window.form.adFormFieldsets[k].disabled = 'disabled';
    }
  }

  function movePinToDefault() {
    pin.style.left = PIN_LEFT_PX;
    pin.style.top = PIN_TOP_PX;
  }

  window.map = {
    updatePins: updatePins,
    clearMap: clearMap,
    setPageInactive: setPageInactive,
    movePinToDefault: movePinToDefault
  };
})();