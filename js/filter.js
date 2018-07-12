'use strict';

(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var filteredOffers;
  var filtersElement = document.querySelector('.map__filters');
  var typeFilterElement = filtersElement.querySelector('#housing-type');
  var priceFilterElement = filtersElement.querySelector('#housing-price');
  var roomsFilterElement = filtersElement.querySelector('#housing-rooms');
  var guestsFilterElement = filtersElement.querySelector('#housing-guests');
  var featuresFiltersElement = filtersElement.querySelectorAll('.map__checkbox');

  var filterByType = function (element, property) {
    if (element.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === element.value;
      });
    }
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
  };
  var filterByFeatures = function () {
    for (var i = 0; i < featuresFiltersElement.length; i++) {
      if (featuresFiltersElement[i].checked) {
        filteredOffers = filteredOffers.filter(function (offerData) {
          return offerData.offer.features.indexOf(featuresFiltersElement[i].value) >= 0;
        });
      }
    }
  };

  var updatePins = function () {
    filteredOffers = window.map.offers;
    window.map.deletePin();
    window.card.close();

    filterByType(typeFilterElement, 'type');
    filterByType(roomsFilterElement, 'rooms');
    filterByType(guestsFilterElement, 'guests');
    filterByPrice();
    filterByFeatures();
    window.map.createPins(filteredOffers);
  };

  filtersElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });
})();
