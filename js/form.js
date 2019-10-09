// Модуль form.js
'use strict';

(function () {
  var map = window.data.map;

  var pin = map.querySelector('.map__pin--main');
  var typeSelect = map.querySelector('#housing-type');
  var priceSelect = map.querySelector('#housing-price');
  var roomsSelect = map.querySelector('#housing-rooms');
  var guestsSelect = map.querySelector('#housing-guests');
  var featuresFieldset = map.querySelector('#housing-features');

  var adForm = document.querySelector('.ad-form');
  var adFormHeaderFieldset = adForm.querySelector('.ad-form-header');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');

  var guests0 = adFormCapacitySelect.querySelector('option[value="0"]').cloneNode(true);
  var guests1 = adFormCapacitySelect.querySelector('option[value="1"]').cloneNode(true);
  var guests2 = adFormCapacitySelect.querySelector('option[value="2"]').cloneNode(true);
  var guests3 = adFormCapacitySelect.querySelector('option[value="3"]').cloneNode(true);

  typeSelect.disabled = 'disabled';
  priceSelect.disabled = 'disabled';
  roomsSelect.disabled = 'disabled';
  guestsSelect.disabled = 'disabled';
  featuresFieldset.disabled = 'disabled';

  adFormHeaderFieldset.disabled = 'disabled';

  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = 'disabled';
  }

  function pinInactiveClickHandler() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    typeSelect.disabled = '';
    priceSelect.disabled = '';
    roomsSelect.disabled = '';
    guestsSelect.disabled = '';
    featuresFieldset.disabled = '';

    adFormHeaderFieldset.disabled = '';

    for (var k = 0; k < adFormFieldsets.length; k++) {
      adFormFieldsets[k].disabled = '';
    }
  }

  function enterCoordinatesLoadHandler() {
    var pinXPosition = +pin.style.left.slice(0, -2);
    var pinYPosition = +pin.style.top.slice(0, -2);
    var centerPinX = Math.round(pinXPosition + (pin.offsetWidth / 2));
    var centerPinY = Math.round(pinYPosition + (pin.offsetHeight / 2));

    adForm.querySelector('#address').value = centerPinX + ', ' + centerPinY;
  }

  function enterCoordinatesClickHandler() {
    var pinXPosition = +pin.style.left.slice(0, -2);
    var pinYPosition = +pin.style.top.slice(0, -2);
    var centerPinX = Math.round(pinXPosition + (pin.offsetWidth / 2));
    var lowestPinY = Math.round(pinYPosition + pin.offsetHeight);

    adForm.querySelector('#address').value = centerPinX + ', ' + lowestPinY;
  }

  function checkRoomsClickHandler() {
    var adFormRoomsSelect = adForm.querySelector('#room_number');
    var fragment = document.createDocumentFragment();

    adFormCapacitySelect.innerHTML = '';

    switch (adFormRoomsSelect.value) {
      case '3':
        fragment.appendChild(guests3);
        fragment.appendChild(guests2);
        fragment.appendChild(guests1);
        break;
      case '2':
        fragment.appendChild(guests2);
        fragment.appendChild(guests1);
        break;
      case '1':
        fragment.appendChild(guests1);
        break;
      case '100':
        fragment.appendChild(guests0);
        break;
    }

    adFormCapacitySelect.appendChild(fragment);
  }

  window.addEventListener('load', enterCoordinatesLoadHandler);
  pin.addEventListener('mousedown', function () {
    pinInactiveClickHandler();
    enterCoordinatesClickHandler();
  });
  adFormCapacitySelect.addEventListener('mousedown', checkRoomsClickHandler);
})();
