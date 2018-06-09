'use strict';

var getRandom = function (min, max) {
  var rand = Math.random() * (max - min) + min;
  rand = Math.floor(rand);
  return rand;
};

var notices = [];
var pinWidth = 40;
var pinHeight = 40;


var getCreateAdvertisement = function (numbersOfAdvertisement) {
  for (var i = 0; i < numbersOfAdvertisement; ++i) {

    var titleList = ['Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'];

    var checkinAndCheckoutList = ['12:00', '13:00', '14:00'];

    var typeList = ['palace', 'flat', 'house', 'bungalo'];

    var offers = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        title: titleList[i],
        address: location.x + ', ' + location.y,
        price: getRandom(1000, 1000000),
        type: typeList[getRandom(1, typeList.length)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 10),
        checkin: checkinAndCheckoutList[getRandom(1, checkinAndCheckoutList.length)],
        checkout: checkinAndCheckoutList[getRandom(1, checkinAndCheckoutList.length)],
        features: function () {
          var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
          var featuresList = [];
          var randomValue = getRandom(0, features.length);
          for (var index = 0; index < randomValue; index++) {
            featuresList.push(features[i]);
          }
          return featuresList;
        },
        description: '',
        photos: function () {
          var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
          var photosList = [];
          while (photos.length > 0) {
            var randomValue = getRandom(0, photos.length);
            var randomPhoto = photos.splice(randomValue, 1);
            photosList.push(randomPhoto);
          }
          return photosList;
        }
      },
      location: {
        x: getRandom(300, 900),
        y: getRandom(130, 630)
      }
    };

    notices.push(offers[i]);
  }
  return notices;
};

getCreateAdvertisement(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (mapPins) {
  var mapPin = templateMapPin.cloneNode(true);

  mapPin.style = 'left: ' + mapPins.location.x - pinWidth / 2 + 'px; top: ' + mapPins.location.y - pinHeight + 'px;';
  mapPin.querySelector('img').src = mapPins.author.avatar;
  mapPin.querySelector('img').alt = mapPins.offer.title;

  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < notices.length; i++) {
  fragment.appendChild(renderPin(notices[i]));
}
mapPinList.appendChild(fragment);
