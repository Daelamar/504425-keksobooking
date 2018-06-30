'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobookin';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/daa';
  var TIMEOUT = 10000;
  var SERVER_CODES = {
    success: 200,
    badRequest: 400,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500
  };

  window.backend = {
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SERVER_CODES.success:
            onSuccess(xhr.response);
            break;
          case SERVER_CODES.badRequest:
            onError('Ошибка : ' + xhr.status + ' , некорректный запрос!');
            break;
          case SERVER_CODES.forbidden:
            onError('Ошибка : ' + xhr.status + ' , отказано в доступе!');
            break;
          case SERVER_CODES.notFound:
            onError('Ошибка : ' + xhr.status + ' , cтраница не найдена!');
            break;
          case SERVER_CODES.internalServerError:
            onError('Ошибка : ' + xhr.status + ' , внутренняя ошибка сервера!');
            break;
          default:
            onError('Ошибка : ' + xhr.status + '' + xhr.statusText);
        }
        xhr.timeout = TIMEOUT;

        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
        });

        return xhr;
      });

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    download: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL_DOWNLOAD);

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SERVER_CODES.success:
            onSuccess(xhr.response);
            break;
          case SERVER_CODES.badRequest:
            onError('Ошибка : ' + xhr.status + ' , некорректный запрос!');
            break;
          case SERVER_CODES.forbidden:
            onError('Ошибка : ' + xhr.status + ' , отказано в доступе!');
            break;
          case SERVER_CODES.notFound:
            onError('Ошибка : ' + xhr.status + ' , cтраница не найдена!');
            break;
          case SERVER_CODES.internalServerError:
            onError('Ошибка : ' + xhr.status + ' , внутренняя ошибка сервера!');
            break;
          default:
            onError('Ошибка : ' + xhr.status + '' + xhr.statusText);
        }
        xhr.timeout = TIMEOUT;

        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
        });

        return xhr;
      });

      xhr.send();
    }
  };
})();
