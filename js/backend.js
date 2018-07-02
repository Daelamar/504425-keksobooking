'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var ServerCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var setupHttpRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ServerCodes.SUCCESS:
          onSuccess(xhr.response);
          break;
        case ServerCodes.BAD_REQUEST:
          onError('Ошибка : ' + xhr.status + ' , некорректный запрос!');
          break;
        case ServerCodes.FORBIDDEN:
          onError('Ошибка : ' + xhr.status + ' , отказано в доступе!');
          break;
        case ServerCodes.NOT_FOUND:
          onError('Ошибка : ' + xhr.status + ' , cтраница не найдена!');
          break;
        case ServerCodes.INTERNAL_SERVER_ERROR:
          onError('Ошибка : ' + xhr.status + ' , внутренняя ошибка сервера!');
          break;
        default:
          onError('Ошибка : ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.backend = {
    upload: function (data, onSuccess, onError) {
      var xhr = setupHttpRequest(onSuccess, onError);

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    download: function (onSuccess, onError) {
      var xhr = setupHttpRequest(onSuccess, onError);

      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    }
  };
})();

