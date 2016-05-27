appControllers

.controller('LoginCtrl', function($scope, $state, Auth, $ionicLoading, $ionicHistory, $rootScope) {
  $scope.credentials = {};

  $scope.showLoadingDialog = function() {
    $scope.errorMessage = "";
    $scope.isProgress = true;
    $ionicLoading.show();
  }

  $scope.hideLoadingDialog = function() {
    $ionicLoading.hide();
    $scope.isProgress = false;
  }

  $scope.login = function() {
    $scope.showLoadingDialog();

    var userId = $scope.credentials.username;

    Auth.login($scope.credentials, function (response) {
      $scope.hideLoadingDialog();
      $rootScope.userId = userId;
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('app.parcels', { getParcels: true });
    }, function(err) {
        $scope.hideLoadingDialog();
        $scope.errorMessage = response.message || "Unknown error";
    })
  };
})
