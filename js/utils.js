'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var errorElement = document.createElement('div');
  var lastTimeout;
  var hideErrorMessage = function () {
    setTimeout(function () {
      errorElement.remove();
    }, 5000);
  };
  window.utils = {
    onError: function (errorMessage) {
      errorElement.classList.add('error-massage');
      errorElement.style.backgroundColor = 'white';
      errorElement.style.color = 'black';
      errorElement.style.textAlign = 'center';
      errorElement.style.position = 'fixed';
      errorElement.style.width = '400px';
      errorElement.style.height = '100px';
      errorElement.style.border = '4px solid black';
      errorElement.style.left = '39%';
      errorElement.style.top = '20%';
      errorElement.style.fontSize = '28px';
      errorElement.style.zIndex = '2';
      errorElement.textContent = errorMessage;
      document.body.appendChild(errorElement);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          errorElement.remove();
        }
      });
      hideErrorMessage();
    },
    debounce: function (action) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
    }
  };
})();

