// Модуль xhr.js
'use strict';

(function () {
  function load(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.addEventListener('timeout', function () {
      errorHandler();
    });

    xhr.timeout = 4000;

    xhr.open('GET', url);
    xhr.send();
  }

  function upload(data, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.addEventListener('timeout', function () {
      errorHandler();
    });

    xhr.timeout = 4000;

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.xhr = {
    load: load,
    upload: upload,
  };
})();
