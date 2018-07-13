'use strict';

(function () {
  var OFFERS_COUNT = 5;
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

  var enablePage = function (data) {
    if (data) {
      window.map.offers = data.slice();
    }
    inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);
    mapElement.classList.remove('map--faded');
    window.form.enableFields();
    window.map.createPins(window.map.offers);
    advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
    mapPinMainElement.removeEventListener('mouseup', window.map.onUserPinClick);
  };

  window.map = {
    offers: [],
    createPins: function (mapPins) {
      var fragment = document.createDocumentFragment();
      var pinsArrayLengthCalc = (mapPins.length > OFFERS_COUNT) ? OFFERS_COUNT : mapPins.length;
      for (var i = 0; i < pinsArrayLengthCalc; i++) {
        fragment.appendChild(window.pin.render(mapPins[i]));
      }
      window.pin.mapPinListElement.appendChild(fragment);
    },
    deletePin: function () {
      var pinElement = window.pin.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.pin.mapPinListElement.removeChild(pinElement[i]);
      }
    },
    onUserPinClick: function () {
      if (window.map.offers.length === 0) {
        window.backend.download(enablePage, window.utils.onError);
      } else {
        enablePage();
      }
    }
  };

  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
