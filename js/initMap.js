'use strict';

(function () {
  var offers;
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinMainLeft = mapPinMainElement.offsetLeft;
  var mapPinMainTop = mapPinMainElement.offsetTop;
  var mapPinMainWidth = mapPinMainElement.offsetWidth;
  var mapPinMainHeight = mapPinMainElement.offsetHeight;
  var inputAddressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
  var inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);

  window.initMap = {
    enablePage: function () {
      mapElement.classList.remove('map--faded');
      var advertFormElement = document.querySelector('.ad-form');
      var advertAddressInputElement = advertFormElement.querySelector('#address');

      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;

      window.creatingPins.createPins(offers);
      window.form.enableFields();
      window.form.setFieldsRequired();
      window.form.setMinAndMaxLength();

      mapPinMainElement.removeEventListener('mouseup', window.initMap.enablePage);
    }
  };

  mapPinMainElement.addEventListener('mouseup', window.initMap.enablePage);
  window.form.disableFields();
  offers = window.generateOffers.createAdvertisement(8);
  window.form.advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
