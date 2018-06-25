'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapElement = document.querySelector('.map');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

  var showCard = function (pinElement, cardElement) {
    pinElement.addEventListener('click', function () {
      window.card.close();
      mapElement.insertBefore(cardElement, filtersContainerElement);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        window.card.close();
        mapElement.insertBefore(cardElement, filtersContainerElement);
      }
    });
  };

  window.pin = {
    mapPinListElement: document.querySelector('.map__pins'),
    render: function (mapPins) {
      var mapPinElement = templateMapPin.cloneNode(true);
      var newCardElement = window.card.render(mapPins);

      mapPinElement.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
      mapPinElement.querySelector('img').src = mapPins.author.avatar;
      mapPinElement.querySelector('img').alt = mapPins.offer.title;

      showCard(mapPinElement, newCardElement);

      return mapPinElement;
    },
    create: function (mapPins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < mapPins.length; i++) {
        fragment.appendChild(window.pin.render(mapPins[i]));
      }
      window.pin.mapPinListElement.appendChild(fragment);
    },
    delete: function () {
      var pinElement = window.pin.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.pin.mapPinListElement.removeChild(pinElement[i]);
      }
    }
  };
})();
