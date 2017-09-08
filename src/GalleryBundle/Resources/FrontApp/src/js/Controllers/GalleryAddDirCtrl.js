angular.module('galleryAddDirController', ['ui.router'])
    .controller('GalleryAddDirCtrl', ['$scope', '$rootScope', 'galleryService', 'dirLocator', '$stateParams', '$state',
        function ($scope, $rootScope, galleryService, dirLocator, $stateParams, $state) {
            $scope.submit = function () {
                var elmName, dirPath;
                elmName = $('.elmName').val().trim();
                dirPath = dirLocator.get();

                galleryService.addDir({name: elmName, pid: dirPath}).then(
                    function (response) {
                        $scope.setAlert(true, response);
                        $state.go('gallery');
                    },
                    function (response) {
                        $scope.setAlert(false, response);
                    });
            }
        }
    ]);