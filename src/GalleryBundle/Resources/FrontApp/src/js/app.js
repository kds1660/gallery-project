'use strict';

/* App Module */

var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'galleryRoutes',
    'galleryControllers',
    'galleryDirectives',
    'galleryServices'
])
    .constant('pageNumberElement', 18)

    .run(['$rootScope', '$timeout', '$http', '$state', 'dirLocator',
        function ($rootScope, $timeout, $http, $state, dirLocator) {
            $rootScope.setAlert = function (trueFalse, text) {
                $rootScope.alert = {};
                $('.alert').show();

                if (trueFalse === true) {
                    $rootScope.alertTrue = true;
                    $rootScope.alert.text = text;
                }

                if (trueFalse === false) {
                    $rootScope.alertFalse = true;
                    $rootScope.alert.text = text;
                }
                $timeout(function () {
                    $rootScope.alertTrue = false;
                    $rootScope.alertFalse = false;
                }, 2000)
            };

            $http.get('folder').then(
                function (response) {
                    $rootScope.mainDir = response.data;
                },
                function () {
                    $rootScope.setAlert(false, response.data);
                }
            );

            $rootScope.mainPage = function () {
                $rootScope.dirPath = [];
                $state.go('gallery', {id: null});
            };

            $rootScope.cancel = function () {
                $state.go('gallery', {id: dirLocator.get()});
            }
        }]);
