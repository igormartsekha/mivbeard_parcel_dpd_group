appServices.service('Scanner', function ($timeout, Parcels) {
  var Scanner = {

    getPicture: function(onSuccess, onError) {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
      }

      navigator.camera.getPicture(function(image) {
        onSuccess(image);
      }, function(error) {
          console.log("Unable to obtain picture: " + error, "app");
          onError(error);
      }, options);
    },
    getVideo: function(onSuccess, onError) {
      navigator.device.capture.captureVideo(function(video){
          navigator.createThumbnail(video[0].fullPath, function(err, imageData) {
            if(err != null) {
              onError()
              return;
            }
            
            video[0].thumbnail = imageData;
            onSuccess(video[0]);
          });
        }, function(error){
          console.log("Unable to obtain video: " + error, "app");
          onError(error);
        }, {limit:1});
    },
    scan: function (onSuccess, onError) {
      var currentVariant = Parcels.getMockupNewParcel();
      
      this.getPicture(function(image){
        currentVariant.mainImage = image;
        currentVariant.labelScanned = dateFormat(new Date(), "d mmmm yyyy h:MM");
        currentVariant.date = dateFormat(new Date(), "d mmmm yyyy h:MM");
        if (currentVariant != null) {
          Parcels.addParcel(currentVariant);
        }
        onSuccess(currentVariant);
      }, onError);
    }
  };

  return Scanner;
});
