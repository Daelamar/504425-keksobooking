'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var apartmentsType = function (type) {
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
  };

  window.cards = {
    renderCard: function (mapCards) {
      var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
      var popupElement = templateMapCard.cloneNode(true);

      popupElement.querySelector('.popup__title').textContent = mapCards.offer.title;
      popupElement.querySelector('.popup__text--address').textContent = mapCards.offer.address;
      popupElement.querySelector('.popup__text--price').textContent = mapCards.offer.price + ' ₽/ночь.';
      popupElement.querySelector('.popup__type').textContent = apartmentsType(mapCards.offer.type);
      popupElement.querySelector('.popup__text--capacity').textContent = mapCards.offer.rooms + ' комнаты для ' + mapCards.offer.guests + ' гостей.';
      popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCards.offer.checkin + ', выезд до ' + mapCards.offer.checkout;
      popupElement.querySelector('.popup__features').innerHTML = '';
      popupElement.querySelector('.popup__features').appendChild(window.data.createFeatures(mapCards.offer.features));
      popupElement.querySelector('.popup__description').textContent = mapCards.offer.description;
      popupElement.querySelector('.popup__photos').innerHTML = '';
      popupElement.querySelector('.popup__photos').appendChild(window.data.createPhotosList(mapCards.offer.photos));
      popupElement.querySelector('.popup__avatar').src = mapCards.author.avatar;
      return popupElement;
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
      window.cards.closeCard();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      window.cards.closeCard();
    }
  });
})();
