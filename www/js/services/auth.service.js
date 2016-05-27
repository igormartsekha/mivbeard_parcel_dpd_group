appServices

/* Authentication service */
.service('Auth', function ($timeout) {

  var Auth = {
    // dummy login function
    login: function (credentials, onSuccess, onError) {
      $timeout(function () {
        // success callback
        onSuccess();
      }, 1000);
    }
  };

  return Auth;
});
