appControllers.controller('DetailsCtrl', function($scope, $state, $stateParams, $ionicHistory) {
    $scope.parcel = $stateParams.parcel;
    $scope.scanned = $stateParams.scanned;

    if ($stateParams.removeBackView) {
      console.log('Parcel: gonna remove back view');
      $ionicHistory.removeBackView();
    } else {
      console.log('Parcel: wont remove back view (is this parcel?)');
    }

    $scope.title = $scope.scanned ? "Label Scanned" : "Parcel Details";

    $scope.addObservation = function () {
      $state.go('app.observation', { parcel: $scope.parcel, removeBackView: true }, { reload: true });
    };

    $scope.getBase64Picture = function(base64Picture) {
      if(base64Picture != "") {
        return "data:image/jpeg;base64,"+base64Picture;
      }

      return "";
    }

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
});
