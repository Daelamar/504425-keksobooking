'use strict';

(function () {
  var OFFERS_COUNT = 5;
  var offers = [];
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinMainLeft = mapPinMainElement.offsetLeft;
  var mapPinMainTop = mapPinMainElement.offsetTop;
  var mapPinMainWidth = mapPinMainElement.offsetWidth;
  var mapPinMainHeight = mapPinMainElement.offsetHeight;
  var inputAddressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
  var inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);
  var advertFormElement = document.querySelector('.ad-form');
  var advertAddressInputElement = advertFormElement.querySelector('#address');

  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < OFFERS_COUNT; i++) {
      fragment.appendChild(window.pin.render(data[i]));
    }
    window.pin.mapPinListElement.appendChild(fragment);
    offers = data.slice();
  };

  window.map = {
    enablePage: function () {
      inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);
      mapElement.classList.remove('map--faded');
      window.form.enableFields();
      createPins(offers);
      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
      mapPinMainElement.removeEventListener('mouseup', window.map.enablePage);
      if (advertFormElement) {
        advertFormElement.addEventListener('reset', function () {
          mapPinMainElement.addEventListener('mouseup', window.map.enablePage);
        });
      }
    },
    deletePin: function () {
      var pinElement = window.pin.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.pin.mapPinListElement.removeChild(pinElement[i]);
      }
    }
  };
  window.backend.download(createPins, window.utils.onError);
  mapPinMainElement.addEventListener('mouseup', window.map.enablePage);
  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
