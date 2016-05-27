appControllers.controller('ObservationCtrl', function ($scope, $state, $stateParams, $ionicHistory, $rootScope, Scanner, Parcels, $ionicPopup, Location) {
  $scope.parcel = $stateParams.parcel;
  $scope.observation = {};

  $scope.pictures = [
  ];

  $scope.videos = [

  ];

  if($scope.parcel.mainImage != null && $scope.parcel.mainImage != "")
    $scope.pictures.push({prev: $scope.parcel.mainImage});

  $scope.addPicture = function () {
    Scanner.getPicture(function (image) {
      $scope.$apply(function () {
        $scope.pictures.push({ prev: image});
      });
    }, function(error) {

    });
  };

  $scope.removePicture = function (index) {
    if (index > -1) {
      $scope.pictures.splice(index, 1);
    }
  };

  $scope.removeVideo = function (index) {
    if (index > -1) {
      $scope.videos.splice(index, 1);
    }
  };

  $scope.addVideo = function () {
    Scanner.getVideo(function (video) {
      $scope.$apply(function () {
        $scope.videos.push({ prev: video});
      });
    }, function(error) {

    });
  };

  $scope.getBase64Picture = function(base64Picture) {
    if(base64Picture != "") {
      return "data:image/jpeg;base64,"+base64Picture;
    }

    return "";
  }

  $scope.getVideo = function(video) {
    if(video.fullPath != "") {
      return video.fullPath;
    }

    return "";
  }

  if ($stateParams.removeBackView) {
    console.log('Observation: gonna remove back view');
    $ionicHistory.removeBackView();
  } else {
    console.log('Observation: wont remove back view (is this parcel?)');
  }

  $scope.getLocation = function () {
    //return Settings.getLocation();
    return $rootScope.currentLocation;
  };

  $scope.getUserId = function () {
    return $rootScope.userId;
  };

  $scope.submitObservation = function () {

    var observationText = $scope.observation.text;
    var observationVideos = $scope.videos;
    var observationPictures = $scope.pictures;

    Parcels.update($scope.parcel.uuid,
      'Found at ' + $rootScope.currentLocation.name + '(' + $rootScope.currentLocation.code + ')',
      {
        text: observationText,
        videos: observationVideos,
        pictures: observationPictures
      }
    ); // TODO: video and pictures here on observation

    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableBack: true,
      historyRoot: true
    });
    $state.go('app.parcels');
  };

  $scope.showVideo = function (fullPath) {
    console.log(fullPath);
    var videoPopup = $ionicPopup.show({
      template: '<video style="width: 100%;height: 200px;" controls="controls">'+
                '<source style="max-width: 100%;" ng-src="'+fullPath+'" type="video/mp4">' +
                '</video>',
      title: 'Video',
      scope: $scope,
      buttons: [
        { text: 'Cancel' }
      ]
    });
  };

  $scope.mapView = null
  $scope.initGoogleMap = function(position) {
    var mapOption = {
      center: new google.maps.LatLng(50.451309,30.5231758),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.mapView = new google.maps.Map(document.getElementById("googleMap"), mapOption);
  }

  $scope.addMarker = function(position) {
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if($scope.mapView != null) {
      $scope.mapView.setCenter(location);
      if($scope.marker != null)
        $scope.marker.setMap(null);
      $scope.marker = new google.maps.Marker({position: {lat: position.coords.latitude, lng: position.coords.longitude}, map: $scope.mapView});
    }
  }

  $scope.initGoogleMap();

  Location.getCurrentPosition(function(position) {
    console.log(position);
    $scope.addMarker(position);
  }, function(err) {
    console.log(err);
  });
});
