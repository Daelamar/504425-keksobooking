'use strict';

var getRandom = function (min, max) {
  var rand = Math.random() * (max - min) + min;
  rand = Math.floor(rand);
  return rand;
};

var notices = [];
var pinWidth = 40;
var pinHeight = 40;
var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var checkinAndCheckoutList = ['12:00', '13:00', '14:00'];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var locationX = getRandom(300, 900);
var locationY = getRandom(130, 630);
var featureValue = function () {
  var featuresList = [];
  var randomValue = getRandom(0, features.length - 1);
  for (var index = 0; index < randomValue; index++) {
    featuresList.push(features[index]);
  }
  return featuresList;
};
var photosList = [];
var photosValue = function () {

  while (photos.length > 0) {
    var randomValue = getRandom(0, photos.length - 1);
    var randomPhoto = photos.splice(randomValue, 1);
    photosList.push(randomPhoto);
  }
  return photosList;
};

var getCreateAdvertisement = function (numbersOfAdvertisement) {
  for (var i = 0; i < numbersOfAdvertisement; i++) {
    var offers = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        title: titleList[i],
        address: locationX + ', ' + locationY,
        price: getRandom(1000, 1000000),
        type: typeList[getRandom(0, typeList.length - 1)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 10),
        checkin: checkinAndCheckoutList[getRandom(0, checkinAndCheckoutList.length - 1)],
        checkout: checkinAndCheckoutList[getRandom(0, checkinAndCheckoutList.length - 1)],
        features: featureValue,
        description: '',
        photos: photosValue
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    notices.push(offers);
  }
  return notices;
};

getCreateAdvertisement(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (mapPins) {
  console.log(mapPins);
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
