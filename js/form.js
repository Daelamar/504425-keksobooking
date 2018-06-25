'use strict';

(function () {
  var RENT_VALUE = {
    flat: {
      min: 1000,
      max: 1000000,
      placeholder: 1000
    },
    house: {
      min: 5000,
      max: 1000000,
      placeholder: 5000
    },
    palace: {
      min: 10000,
      max: 1000000,
      placeholder: 10000
    },
    bungalo: {
      min: 0,
      max: 1000000,
      placeholder: 0
    }
  };
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinMainLeft = mapPinMainElement.offsetLeft;
  var mapPinMainTop = mapPinMainElement.offsetTop;
  var mapPinMainWidth = mapPinMainElement.offsetWidth;
  var mapPinMainHeight = mapPinMainElement.offsetHeight;
  var inputAddressLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
  var inputAddressTop = Math.round(mapPinMainTop + mapPinMainHeight / 2);
  var advertFormElement = document.querySelector('.ad-form');
  var advertFormFieldElement = advertFormElement.querySelectorAll('fieldset');
  var inputTitleFormElement = advertFormElement.querySelector('#title');
  var inputTypeFormElement = advertFormElement.querySelector('#type');
  var inputPriceFormElement = advertFormElement.querySelector('#price');
  var inputTimeInFormElement = advertFormElement.querySelector('#timein');
  var inputTimeOutFormElement = advertFormElement.querySelector('#timeout');
  var inputRoomsNumFormElement = advertFormElement.querySelector('#room_number');
  var inputCapacityFormElement = advertFormElement.querySelector('#capacity');
  var formResetButtonElement = advertFormElement.querySelector('.ad-form__reset');
  var advertAddressInputElement = advertFormElement.querySelector('#address');

  var setPrice = function () {
    var offerType = inputTypeFormElement.value;
    inputPriceFormElement.min = RENT_VALUE[offerType].min;
    inputPriceFormElement.max = RENT_VALUE[offerType].max;
    inputPriceFormElement.placeholder = RENT_VALUE[offerType].placeholder;
  };
  var checkRoomsAndGuests = function () {
    if ((inputRoomsNumFormElement.value === '100') && (inputCapacityFormElement.value !== '0')) {
      inputCapacityFormElement.setCustomValidity('Не для гостей!');
    } else if ((inputRoomsNumFormElement.value !== '100') && (inputCapacityFormElement.value === '0')) {
      inputCapacityFormElement.setCustomValidity('Выберите корректный вариант!');
    } else if (inputRoomsNumFormElement.value < inputCapacityFormElement.value) {
      inputCapacityFormElement.setCustomValidity('Недостаточное кол-во комнат для размещения гостей');
    } else {
      inputCapacityFormElement.setCustomValidity('');
    }
  };
  var setTime = function (targetElement, mainElement) {
    targetElement.value = mainElement.value;
  };
  var resetForm = function () {
    advertFormElement.reset();
    mapPinMainElement.style.top = 375 + 'px';
    mapPinMainElement.style.left = 570 + 'px';
    window.form.disableFields();
    advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
    mapElement.classList.add('map--faded');
    window.cards.closeCard();
    window.pins.deletePins();

    mapPinMainElement.addEventListener('mouseup', window.map.enablePage);
  };

  window.form = {

    setFieldsRequired: function () {
      advertAddressInputElement.readonly = true;
      inputTitleFormElement.required = true;
      inputPriceFormElement.required = true;
    },
    setMinAndMaxLength: function () {
      inputTitleFormElement.minLength = 30;
      inputTitleFormElement.maxLength = 100;
    },
    enableFields: function () {
      advertFormElement.classList.remove('ad-form--disabled');

      for (var i = 0; i < advertFormFieldElement.length; i++) {
        advertFormFieldElement[i].disabled = false;
      }
      checkRoomsAndGuests();
      setPrice();
    },
    disableFields: function () {
      advertFormElement.classList.add('ad-form--disabled');

      for (var i = 0; i < advertFormFieldElement.length; i++) {
        advertFormFieldElement[i].disabled = true;
      }
    }
  };

  inputTypeFormElement.addEventListener('change', setPrice);

  inputTimeInFormElement.addEventListener('change', function () {
    setTime(inputTimeOutFormElement, inputTimeInFormElement);
  });

  inputTimeOutFormElement.addEventListener('change', function () {
    setTime(inputTimeInFormElement, inputTimeOutFormElement);
  });

  inputRoomsNumFormElement.addEventListener('change', checkRoomsAndGuests);

  inputCapacityFormElement.addEventListener('change', checkRoomsAndGuests);

  formResetButtonElement.addEventListener('click', resetForm);
})();