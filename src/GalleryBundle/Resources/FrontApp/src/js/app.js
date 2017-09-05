'use strict';

/* App Module */

var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'galleryRoutes',
    'galleryController',
    'elementDirective',
    'dirDirective',
    'modalDialog',
    'galleryServices'
])

    .run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
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
        }
    }]);

