appServices

.service('Location', function() {
  var Location = {
    getCurrentPosition: function(onSuccess, onError) {
      navigator.geolocation.getCurrentPosition(function(data) {
        onSuccess(data);
      }, function(err) {
          console.log(err);
          onError();
      });
    }
  }

  return Location;
});
