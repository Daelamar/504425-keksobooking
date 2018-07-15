'use strict';

(function () {
  var PinMapRestriction = {
    COORDS_MIN_Y: 130,
    COORDS_MAX_Y: 630,
    COORDS_MIN_X: 0,
    COORDS_MAX_X: 1140
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
  var attachEvents = function () {
    mapPinMainElement.addEventListener('mouseup', window.map.onUserPinClick);
  };
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
      inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_GAP);
      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMainElement.offsetTop - shift.y) > (PinMapRestriction.COORDS_MIN_Y - mapPinMainHeight - window.mainPin.AFTER_ELEMENT_GAP - errorValue) && (mapPinMainElement.offsetTop - shift.y) < (PinMapRestriction.COORDS_MAX_Y - mapPinMainHeight - window.mainPin.AFTER_ELEMENT_GAP + errorValue)) {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      }
      if ((mapPinMainElement.offsetLeft - shift.x) > PinMapRestriction.COORDS_MIN_X && (mapPinMainElement.offsetLeft - shift.x) < PinMapRestriction.COORDS_MAX_X) {
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
    AFTER_ELEMENT_GAP: 20,
    attachEvents: attachEvents
  };

  attachEvents();
})();
