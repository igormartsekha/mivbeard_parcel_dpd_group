// controllers entry
var appControllers = angular.module('starter.controllers', []);
// services entry
var appServices = angular.module('starter.services', []);

// angular app
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {

    $rootScope.currentLocation = {
      name: 'Oldbury',
      code: '0030'
    };
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'js/modules/login/login.view.html',
      controller: 'LoginCtrl'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'js/modules/menu/menu.view.html',
      controller: 'MenuCtrl'
    })

    .state('app.parcels', {
      url: '/parcels',
      views: {
        'menuContent': {
          templateUrl: 'js/modules/parcels/parcels.view.html',
          controller: 'ParcelsCtrl'
        }
      },
      params: {
        getParcels: false
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'js/modules/settings/settings.view.html',
          controller: 'SettingsCtrl'
        }
      },
      params: {
        removeBackView: false
      }
    })

    .state('app.parcelDetails', {
      url: '/parcelDetails',
      views: {
        'menuContent': {
          templateUrl: 'js/modules/details/details.view.html',
          controller: 'DetailsCtrl'
        }
      },
      params: {
        parcel: false,
        scanned: false,
        removeBackView: false
      }
    })

    .state('app.observation', {
      url: '/observation',
      cached: false,
      views: {
        'menuContent': {
          templateUrl: 'js/modules/observation/observation.view.html',
          controller: 'ObservationCtrl'
        }
      },
      params: {
        parcel: false,
        removeBackView: false
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
