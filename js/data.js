'use strict';

(function () {
  var TITLE_LIST = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var CHECKIN_AND_CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
  var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LIST = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var createOffer = function (index) {
    var locationX = window.utils.getRandomNumber(300, 900);
    var locationY = window.utils.getRandomNumber(130, 630);

    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: TITLE_LIST[index],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(1000, 1000000),
        type: TYPE_LIST[window.utils.getRandomNumber(0, TYPE_LIST.length - 1)],
        rooms: window.utils.getRandomNumber(1, 5),
        guests: window.utils.getRandomNumber(1, 10),
        checkin: CHECKIN_AND_CHECKOUT_LIST[window.utils.getRandomNumber(0, CHECKIN_AND_CHECKOUT_LIST.length - 1)],
        checkout: CHECKIN_AND_CHECKOUT_LIST[window.utils.getRandomNumber(0, CHECKIN_AND_CHECKOUT_LIST.length - 1)],
        features: window.utils.getRandomLengthArray(FEATURES_LIST),
        description: '',
        photos: window.utils.shuffleArray(PHOTOS_LIST)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  window.data = {
    createAdvertisement: function (numbersOfAdvertisement) {
      var notices = [];
      for (var i = 0; i < numbersOfAdvertisement; i++) {
        notices.push(createOffer(i));
      }
      return notices;
    },

    createFeatures: function (addFeatures) {
      var newFeature = document.createDocumentFragment();
      for (var j = 0; j < addFeatures.length; j++) {
        var newLi = document.createElement('li');
        newLi.classList.add('popup__feature');
        newLi.classList.add('popup__feature--' + addFeatures[j]);
        newFeature.appendChild(newLi);
      }
      return newFeature;
    },

    createPhotosList: function (newPhotoList) {
      var photoList = document.createDocumentFragment();
      for (var index = 0; index < PHOTOS_LIST.length; index++) {
        var mapCardPhoto = document.createElement('img');
        mapCardPhoto.classList.add('popup__photo');
        mapCardPhoto.src = newPhotoList[index];
        mapCardPhoto.width = '45';
        mapCardPhoto.height = '40';
        mapCardPhoto.alt = 'Фотография жилья';
        photoList.appendChild(mapCardPhoto);
      }
      return photoList;
    }
  };
})();
