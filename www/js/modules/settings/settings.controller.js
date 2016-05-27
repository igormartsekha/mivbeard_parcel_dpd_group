appControllers

.controller('SettingsCtrl', function($scope, $stateParams, $ionicHistory, $rootScope) {

  if ($stateParams.removeBackView) {
    console.log('Settings: gonna remove back view');
    $ionicHistory.removeBackView();
  } else {
    console.log('Settings: wont remove back view (is this parcel?)');
  }

  $scope.locations = [
    {
      name: 'North Highlands',
      code: '0083'
    },
    {
      name: 'Nottingham',
      code: '0041'
    },
    {
      name: 'Oldbury',
      code: '0030'
    },
    {
      name: 'Orkney Shetland',
      code: '0082'
    },
    {
      name: 'Peterborough',
      code: '0033'
    }
  ];

  $scope.currentLocation = $rootScope.currentLocation;

  $scope.isCurrent = function (code) {
    return $scope.currentLocation.code === code;
  };

  $scope.setCurrent = function (location) {
    $scope.currentLocation = location;
    $rootScope.currentLocation = location;
  };

});
