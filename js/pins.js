'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapElement = document.querySelector('.map');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  window.pins = {
    mapPinListElement: document.querySelector('.map__pins'),
    renderPin: function (mapPins) {
      var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');
      var mapPinElement = templateMapPin.cloneNode(true);
      var newCardElement = window.cards.renderCard(mapPins);

      mapPinElement.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
      mapPinElement.querySelector('img').src = mapPins.author.avatar;
      mapPinElement.querySelector('img').alt = mapPins.offer.title;

      window.pins.createCard(mapPinElement, newCardElement);

      return mapPinElement;
    },
    createPins: function (mapPins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < mapPins.length; i++) {
        fragment.appendChild(window.pins.renderPin(mapPins[i]));
      }
      window.pins.mapPinListElement.appendChild(fragment);
    },
    deletePins: function () {
      var pinElement = window.pins.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.pins.mapPinListElement.removeChild(pinElement[i]);
      }
    },
    createCard: function (pinElement, cardElement) {
      pinElement.addEventListener('click', function () {
        window.cards.closeCard();
        mapElement.insertBefore(cardElement, filtersContainerElement);
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          window.cards.closeCard();
          mapElement.insertBefore(cardElement, filtersContainerElement);
        }
      });
    }
  };
})();
