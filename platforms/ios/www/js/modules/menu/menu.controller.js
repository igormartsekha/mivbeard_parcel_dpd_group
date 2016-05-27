appControllers.controller('MenuCtrl', function($scope, $state, $ionicHistory, Scanner, $timeout, $ionicLoading) {

  $scope.scanLabel = function () {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner><p style="padding-top:1em;">Scanner emulation...</p>'
    });
    console.log('Current state is ' + $ionicHistory.currentStateName());
    if($ionicHistory.currentStateName() == "app.observation") {
      $ionicLoading.hide();
      console.log($ionicHistory.currentView())
    } else {
      Scanner.scan(function (parcel) {
        $ionicLoading.hide();
        $state.go('app.parcelDetails', { scanned: true, parcel: parcel, removeBackView: ($ionicHistory.currentStateName() !== 'app.parcels') });
      }, function(error) {
        $ionicLoading.hide();
        console.log("Error in scan: "+error);
      });
    }
  };

  $scope.goSettings = function () {
    $state.go('app.settings', { removeBackView: ($ionicHistory.currentStateName() !== 'app.parcels') });
  };

});
