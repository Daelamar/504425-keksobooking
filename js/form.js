'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var RentValue = {
    FLAT: {
      min: 1000,
      max: 1000000,
      placeholder: 1000
    },
    HOUSE: {
      min: 5000,
      max: 1000000,
      placeholder: 5000
    },
    PALACE: {
      min: 10000,
      max: 1000000,
      placeholder: 10000
    },
    BUNGALO: {
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
  var filtersElement = document.querySelector('.map__filters');
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
  var successMessageElement = document.querySelector('.success');
  var avatarFileChooserElement = document.querySelector('#avatar');
  var previewAvatarElement = document.querySelector('.ad-form-header__avatar-image');
  var imageFileChooserElement = document.querySelector('#images');
  var imageFieldElement = document.querySelector('.ad-form__photo');
  var file;

  var onTypeChange = function () {
    var offerType = inputTypeFormElement.value;
    inputPriceFormElement.min = RentValue[offerType.toUpperCase()].min;
    inputPriceFormElement.max = RentValue[offerType.toUpperCase()].max;
    inputPriceFormElement.placeholder = RentValue[offerType.toUpperCase()].placeholder;
  };
  var onAmountCapacityChange = function () {
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
  var deleteUserImages = function () {
    var userImage = imageFieldElement.querySelectorAll('.ad-form__photo-user_image');
    userImage.forEach(function (item) {
      imageFieldElement.removeChild(item);
    });
  };
  var deleteUserAvatar = function () {
    previewAvatarElement.src = 'img/muffin-grey.svg';
  };
  var onButtonResetClick = function () {
    advertFormElement.reset();
    filtersElement.reset();
    mapPinMainElement.style.top = 375 + 'px';
    mapPinMainElement.style.left = 570 + 'px';
    disableFields();
    inputPriceFormElement.placeholder = RentValue.FLAT.min;
    advertAddressInputElement.value = inputAddressLeft + ', ' + inputAddressTop;
    mapElement.classList.add('map--faded');
    window.card.close();
    window.map.deletePin();
    window.mainPin.attachEvents();
    deleteUserImages();
    deleteUserAvatar();
  };
  var setFieldsRequired = function () {
    advertAddressInputElement.readonly = true;
    inputTitleFormElement.required = true;
    inputPriceFormElement.required = true;
  };
  var setMinAndMaxLength = function () {
    inputTitleFormElement.minLength = MIN_LENGTH;
    inputTitleFormElement.maxLength = MAX_LENGTH;
  };
  var disableFields = function () {
    advertFormElement.classList.add('ad-form--disabled');

    advertFormFieldElement.forEach(function (item) {
      item.disabled = true;
    });
  };
  var enableForm = function () {
    setFieldsRequired();
    setMinAndMaxLength();
  };
  var onUploadSuccess = function () {
    successMessageElement.classList.remove('hidden');
    onButtonResetClick();
    successMessageElement.addEventListener('click', function () {
      successMessageElement.classList.add('hidden');
    });
    document.addEventListener('keydown', onDocumentKeydown);
  };
  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      successMessageElement.classList.add('hidden');
    }
  };
  var fileTypeChecked = function (fileChooserElement) {
    file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };
  window.form = {
    enableFields: function () {
      advertFormElement.classList.remove('ad-form--disabled');
      advertFormFieldElement.forEach(function (item) {
        item.disabled = false;
      });
      onAmountCapacityChange();
      onTypeChange();
    }
  };

  inputTypeFormElement.addEventListener('change', onTypeChange);
  inputTimeInFormElement.addEventListener('change', function () {
    setTime(inputTimeOutFormElement, inputTimeInFormElement);
  });
  inputTimeOutFormElement.addEventListener('change', function () {
    setTime(inputTimeInFormElement, inputTimeOutFormElement);
  });
  inputRoomsNumFormElement.addEventListener('change', function () {
    onAmountCapacityChange();
  });
  inputCapacityFormElement.addEventListener('change', function () {
    onAmountCapacityChange();
  });
  formResetButtonElement.addEventListener('click', onButtonResetClick);
  advertFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(advertFormElement), onUploadSuccess, window.utils.onError);
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  avatarFileChooserElement.addEventListener('change', function () {
    if (fileTypeChecked(avatarFileChooserElement)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatarElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  imageFileChooserElement.addEventListener('change', function () {
    if (fileTypeChecked(imageFileChooserElement)) {
      var reader = new FileReader();
      var newImage = document.createElement('img');
      imageFieldElement.style = 'display: flex';
      newImage.classList.add('ad-form__photo-user_image');
      imageFieldElement.appendChild(newImage);
      newImage.width = 70;
      reader.addEventListener('load', function () {
        newImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  disableFields();
  enableForm();
})();
