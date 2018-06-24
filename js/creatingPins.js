'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.creatingPins = {
    mapPinListElement: document.querySelector('.map__pins'),
    renderPin: function (mapPins) {
      var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');
      var mapPinElement = templateMapPin.cloneNode(true);
      var newCardElement = window.creatingCards.renderCard(mapPins);

      mapPinElement.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
      mapPinElement.querySelector('img').src = mapPins.author.avatar;
      mapPinElement.querySelector('img').alt = mapPins.offer.title;

      window.creatingCards.createCard(mapPinElement, newCardElement);

      return mapPinElement;
    },
    createPins: function (mapPins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < mapPins.length; i++) {
        fragment.appendChild(window.creatingPins.renderPin(mapPins[i]));
      }
      window.creatingPins.mapPinListElement.appendChild(fragment);
    },
    deletePins: function () {
      var pinElement = window.creatingPins.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.creatingPins.mapPinListElement.removeChild(pinElement[i]);
      }
    }
  };
})();
