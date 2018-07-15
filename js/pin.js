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
      document.addEventListener('keydown', window.card.onDocumentKeydown);
    });
  };

  window.pin = {
    listElement: document.querySelector('.map__pins'),
    render: function (mapPins) {
      var mapPinElement = templateMapPin.cloneNode(true);
      var newCardElement = window.card.render(mapPins);

      mapPinElement.style.left = mapPins.location.x - PIN_WIDTH / 2 + 'px';
      mapPinElement.style.top = mapPins.location.y - PIN_HEIGHT + 'px';
      mapPinElement.querySelector('img').src = mapPins.author.avatar;
      mapPinElement.querySelector('img').alt = mapPins.offer.title;

      showCard(mapPinElement, newCardElement);

      return mapPinElement;
    }
  };
})();
