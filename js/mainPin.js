'use strict';

(function () {
  var PIN_MAP_RESTRICTION = {
    coordsMinY: 130,
    coordsMaxY: 630,
    coordsMinX: 0,
    coordsMaxX: 1140
  };

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

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var errorValue = 1;
      mapPinMainLeft = mapPinMainElement.offsetLeft;
      mapPinMainTop = mapPinMainElement.offsetTop;
      inputAddressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
      inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);
      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMainElement.offsetTop - shift.y) > (PIN_MAP_RESTRICTION.coordsMinY - mapPinMainHeight - window.mainPin.AFTER_ELEMENT_MAIN_PIN - errorValue) && (mapPinMainElement.offsetTop - shift.y) < (PIN_MAP_RESTRICTION.coordsMaxY - mapPinMainHeight - window.mainPin.AFTER_ELEMENT_MAIN_PIN + errorValue)) {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      }
      if ((mapPinMainElement.offsetLeft - shift.x) > PIN_MAP_RESTRICTION.coordsMinX && (mapPinMainElement.offsetLeft - shift.x) < PIN_MAP_RESTRICTION.coordsMaxX) {
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };
      mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    AFTER_ELEMENT_MAIN_PIN: 20
  };
})();
