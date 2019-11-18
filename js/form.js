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
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');
  var adFormRoomsSelect = adForm.querySelector('#room_number');
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

  function typeClickHandler() {
    var MIN_BUNGALO_PRICE = 0;
    var MIN_FLAT_PRICE = 1000;
    var MIN_HOUSE_PRICE = 5000;
    var MIN_PALACE_PRICE = 10000;

    switch (adFormTypeSelect.value) {
      case 'bungalo':
        adFormPriceInput.placeholder = MIN_BUNGALO_PRICE;
        adFormPriceInput.min = MIN_BUNGALO_PRICE;
        break;
      case 'flat':
        adFormPriceInput.placeholder = MIN_FLAT_PRICE;
        adFormPriceInput.min = MIN_FLAT_PRICE;
        break;
      case 'house':
        adFormPriceInput.placeholder = MIN_HOUSE_PRICE;
        adFormPriceInput.min = MIN_HOUSE_PRICE;
        break;
      case 'palace':
        adFormPriceInput.placeholder = MIN_PALACE_PRICE;
        adFormPriceInput.min = MIN_PALACE_PRICE;
        break;
    }
  }

  function enterCoordinatesLoadHandler() {
    var centerPinX = Math.round(pin.offsetLeft + (pin.offsetWidth / 2));
    var centerPinY = Math.round(pin.offsetTop + (pin.offsetHeight / 2));

    adForm.querySelector('#address').value = centerPinX + ', ' + centerPinY;
  }

  function timeClickHandler(evt) {
    var changableSelect = (evt.target === adFormTimeInSelect) ? adFormTimeOutSelect : adFormTimeInSelect;

    changableSelect.value = evt.target.value;
  }

  function checkRoomsClickHandler() {
    var fragment = document.createDocumentFragment();

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

    adFormCapacitySelect.innerHTML = '';
    adFormCapacitySelect.appendChild(fragment);
  }
  checkRoomsClickHandler();

  function submitHandler(evt) {
    evt.preventDefault();

    function setSuccessListener() {
      var popup = document.querySelector('main').querySelector('.success');
      var popupMessage = popup.querySelector('.success__message');

      function closePopup() {
        popup.remove();
        document.removeEventListener('keydown', popupEscHandler);
        window.removeEventListener('click', closePopup);
      }

      function popupEscHandler(escEvt) {
        var ESC_KEYCODE = 27;

        if (escEvt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      }

      function popupClickHandler(clickEvt) {
        if (clickEvt.target !== popupMessage) {
          closePopup();
        }
      }

      document.addEventListener('keydown', popupEscHandler);
      window.addEventListener('click', popupClickHandler);
    }

    function successHandler() {
      adForm.reset();
      window.map.movePinToDefault();
      window.map.clearMap();
      window.card.removeCards();
      window.map.setPageInactive();

      var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');

      var successElement = successTemplate.cloneNode(true);

      document.querySelector('main').appendChild(successElement);
      setSuccessListener();
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

      function popupEscHandler(popupEscEvt) {
        var ESC_KEYCODE = 27;

        if (popupEscEvt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      }

      function popupClickHandler(popupClickEvt) {
        if (popupClickEvt.target !== popupMessage) {
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

    window.xhr.upload(new FormData(adForm), successHandler, errorHandler);
  }

  function resetHandler(evt) {
    evt.preventDefault();

    adForm.reset();
    window.map.movePinToDefault();
    window.map.clearMap();
    window.card.removeCards();
    window.map.setPageInactive();
    enterCoordinatesLoadHandler();
  }

  window.addEventListener('load', enterCoordinatesLoadHandler);
  adForm.addEventListener('submit', submitHandler);
  adForm.addEventListener('reset', resetHandler);
  adFormTypeSelect.addEventListener('change', function () {
    window.map.clearMap();
    typeClickHandler();
    window.map.updatePins();
  });
  adFormTimeInSelect.addEventListener('change', timeClickHandler);
  adFormTimeOutSelect.addEventListener('change', timeClickHandler);
  adFormRoomsSelect.addEventListener('change', checkRoomsClickHandler);

  window.form = {
    adFormTypeSelect: adFormTypeSelect,
    adForm: adForm,
    typeSelect: typeSelect,
    priceSelect: priceSelect,
    roomsSelect: roomsSelect,
    guestsSelect: guestsSelect,
    featuresFieldset: featuresFieldset,
    adFormHeaderFieldset: adFormHeaderFieldset,
    adFormFieldsets: adFormFieldsets
  };
})();
