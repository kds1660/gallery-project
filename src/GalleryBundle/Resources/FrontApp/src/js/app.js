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

    .run(['$rootScope', '$timeout', '$http', function ($rootScope, $timeout, $http) {
        $rootScope.setAlert = function (trueFalse, text) {
            $rootScope.alert = {};
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
                console.log($rootScope.mainDir);
            },
            function () {
                $rootScope.setAlert(false, response.data);
            }
        );

    }]);

