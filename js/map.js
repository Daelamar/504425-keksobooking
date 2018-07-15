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
    inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT);
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
      var pinsArrayLengthCalc = mapPins.slice(0, OFFERS_COUNT);
      pinsArrayLengthCalc.forEach(function (item) {
        fragment.appendChild(window.pin.render(item));
      });
      window.pin.listElement.appendChild(fragment);
    },
    deletePin: function () {
      var pinElement = window.pin.listElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinElement.forEach(function (item) {
        window.pin.listElement.removeChild(item);
      });
    },
    onUserPinClick: function () {
      if (window.map.offers.length > 0) {
        enablePage();
      } else {
        window.backend.download(enablePage, window.utils.onError);
      }
    }
  };

  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
