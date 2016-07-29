angular.module('book_keeper', ['ui.router', 'ngMaterial'])
    .config(['$mdThemingProvider',function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange')
            .warnPalette('red')
    }])
    .constant('books_api_key', 'AIzaSyANMuiTSDKEbIiGPSbHQEy_adonbloQuhY');
