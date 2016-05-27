appControllers.controller('ParcelsCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicPopup, Parcels ) {
  $scope.parcels = [];

  $scope.getParcels = function (showLoader) {
    if (showLoader) {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><p style="padding-top:1em;">Loading...</p>'
      });
    }
    Parcels.get(function (response) {
      if (response.success) {
        $scope.parcels = response.parcels;
        Parcels.save($scope.parcels);
      } else {
        var alertPopup = $ionicPopup.alert({
          title: "<h4>Can't get your list of parcels<h4>",
          template: response.message || 'Unknown Error',
          okType: 'button-assertive'
        });
      }
      $scope.$broadcast('scroll.refreshComplete');
      if (showLoader) {
        $ionicLoading.hide();
      }
    });
  };

  $scope.showDetails = function (parcel) {
    $state.go('app.parcelDetails', { parcel: parcel });
  };

  $scope.hasParcels = function () {
    return $scope.parcels.length > 0;
  };

  if ($stateParams.getParcels) {
    $scope.getParcels(true);
  } else {
    $scope.parcels = Parcels.getSaved();
  }

});
