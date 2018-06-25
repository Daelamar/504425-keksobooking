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
  var inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);
  var advertFormElement = document.querySelector('.ad-form');
  var advertAddressInputElement = advertFormElement.querySelector('#address');

  window.map = {
    enablePage: function () {
      inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);
      mapElement.classList.remove('map--faded');
      window.pin.create(offers);
      window.form.enableFields();
      window.form.setFieldsRequired();
      window.form.setMinAndMaxLength();
      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
      mapPinMainElement.removeEventListener('mouseup', window.map.enablePage);
    }
  };

  mapPinMainElement.addEventListener('mouseup', window.map.enablePage);
  window.form.disableFields();
  offers = window.data.createAdvertisement(8);
  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
