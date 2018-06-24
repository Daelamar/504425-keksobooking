'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  window.creatingCards = {
    renderCard: function (mapCards) {
      var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
      var popupElement = templateMapCard.cloneNode(true);

      popupElement.querySelector('.popup__title').textContent = mapCards.offer.title;
      popupElement.querySelector('.popup__text--address').textContent = mapCards.offer.address;
      popupElement.querySelector('.popup__text--price').textContent = mapCards.offer.price + ' ₽/ночь.';
      popupElement.querySelector('.popup__type').textContent = window.creatingCards.apartmentsType(mapCards.offer.type);
      popupElement.querySelector('.popup__text--capacity').textContent = mapCards.offer.rooms + ' комнаты для ' + mapCards.offer.guests + ' гостей.';
      popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCards.offer.checkin + ', выезд до ' + mapCards.offer.checkout;
      popupElement.querySelector('.popup__features').innerHTML = '';
      popupElement.querySelector('.popup__features').appendChild(window.generateOffers.createNewFeatures(mapCards.offer.features));
      popupElement.querySelector('.popup__description').textContent = mapCards.offer.description;
      popupElement.querySelector('.popup__photos').innerHTML = '';
      popupElement.querySelector('.popup__photos').appendChild(window.generateOffers.createNewPhotosList(mapCards.offer.photos));
      popupElement.querySelector('.popup__avatar').src = mapCards.author.avatar;
      return popupElement;
    },

    apartmentsType: function (type) {
      var typeOffer = '';
      switch (type) {
        case 'flat':
          typeOffer = 'Квартира';
          break;
        case 'bungalo':
          typeOffer = 'Бунгало';
          break;
        case 'house':
          typeOffer = 'Дом';
          break;
        case 'palace':
          typeOffer = 'Дворец';
          break;
      }
      return typeOffer;
    },
    createCard: function (pinElement, cardElement) {
      pinElement.addEventListener('click', function () {
        window.creatingCards.closeCard();
        mapElement.insertBefore(cardElement, filtersContainerElement);
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          window.creatingCards.closeCard();
          mapElement.insertBefore(cardElement, filtersContainerElement);
        }
      });
    },

    closeCard: function () {
      var oldCardElement = document.querySelector('.popup');
      if (oldCardElement) {
        oldCardElement.remove();
      }
    }
  };

  mapElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      window.creatingCards.closeCard();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      window.creatingCards.closeCard();
    }
  });

})();
