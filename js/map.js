'use strict';

(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var OFFERS_COUNT = 5;
  var offers = [];
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
  var filtersElement = document.querySelector('.map__filters');
  var typeFilterElement = filtersElement.querySelector('#housing-type');
  var priceFilterElement = filtersElement.querySelector('#housing-price');
  var roomsFilterElement = filtersElement.querySelector('#housing-rooms');
  var guestsFilterElement = filtersElement.querySelector('#housing-guests');
  var featuresFiltersElement = filtersElement.querySelectorAll('.map__checkbox');

  var createPins = function (mapPins) {
    var fragment = document.createDocumentFragment();
    var pinsArrayLengthCalc = (mapPins.length > OFFERS_COUNT) ? OFFERS_COUNT : mapPins.length;
    for (var i = 0; i < pinsArrayLengthCalc; i++) {
      fragment.appendChild(window.pin.render(mapPins[i]));
    }
    window.pin.mapPinListElement.appendChild(fragment);
  };
  var updatePins = function () {
    var filteredOffers = offers;
    window.map.deletePin();
    window.card.close();

    var filterByValue = function (element, property) {
      if (element.value !== 'any') {
        filteredOffers = filteredOffers.filter(function (offerData) {
          return offerData.offer[property].toString() === element.value;
        });
      }
      return filteredOffers;
    };

    var filterByPrice = function () {
      if (priceFilterElement.value !== 'any') {
        filteredOffers = filteredOffers.filter(function (offerData) {
          var priceFilterValues = {
            'low': offerData.offer.price < Price.MIN,
            'middle': offerData.offer.price >= Price.MIN && offerData.offer.price < Price.MAX,
            'high': offerData.offer.price >= Price.MAX
          };
          return priceFilterValues[priceFilterElement.value];
        });
      }
      return filteredOffers;
    };

    var filterByFeatures = function () {
      for (var i = 0; i < featuresFiltersElement.length; i++) {
        if (featuresFiltersElement[i].checked) {
          filteredOffers = filteredOffers.filter(function (offerData) {
            return offerData.offer.features.indexOf(featuresFiltersElement[i].value) >= 0;
          });
        }
      }
      return filteredOffers;
    };

    filterByValue(typeFilterElement, 'type');
    filterByValue(roomsFilterElement, 'rooms');
    filterByValue(guestsFilterElement, 'guests');
    filterByPrice();
    filterByFeatures();
    createPins(filteredOffers);
  };
  window.map = {
    enablePage: function (data) {
      if (data) {
        offers = data.slice();
      }
      inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight + window.mainPin.AFTER_ELEMENT_MAIN_PIN);
      mapElement.classList.remove('map--faded');
      window.form.enableFields();
      createPins(offers);
      advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
      mapPinMainElement.removeEventListener('mouseup', window.map.onUserPinClick);
    },
    deletePin: function () {
      var pinElement = window.pin.mapPinListElement.querySelectorAll('.map__pin');
      for (var i = 1; i < pinElement.length; i++) {
        window.pin.mapPinListElement.removeChild(pinElement[i]);
      }
    },
    onUserPinClick: function () {
      if (offers.length === 0) {
        window.backend.download(window.map.enablePage, window.utils.onError);
      } else {
        window.map.enablePage();
      }
    }
  };

  filtersElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
})();
