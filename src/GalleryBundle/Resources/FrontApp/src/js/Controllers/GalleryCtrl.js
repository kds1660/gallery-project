//TODO remove actions in service
angular.module('galleryController', ['ui.router'])
    .controller('GalleryCtrl', ['$scope', '$rootScope', 'galleryService', 'dirLocator', '$state', '$uibModal',
        function ($scope, $rootScope, galleryService, dirLocator, $state, $uibModal) {
            var dirPath;
        dirLocator.init();
            dirPath=dirLocator.get();

            galleryService.getDirElements(dirPath).then(
                function (response) {
                    $scope.gallery = response;
                },
                function () {
                    $scope.setAlert(false, response);
                    $scope.gallery = [];
                });

            $scope.deleteElement = function ($index) {
                galleryService.deleteElement($scope.gallery.images[$index].id).then(
                    function (response) {
                        $scope.gallery.images.splice($index, 1);
                        $scope.setAlert(true, response);
                    },
                    function () {
                        $scope.setAlert(false, response);
                    });
            };

            $scope.editImage = function ($index) {
                $rootScope.Elm = $scope.gallery.images[$index];
                $state.go('editElement', {id: $rootScope.Elm.id, type: 'img'});
            };

            $scope.deleteDir = function ($index) {
                galleryService.deleteDir($scope.gallery.directories[$index].id).then(
                    function (response) {
                        $scope.gallery.directories.splice($index, 1);
                        $scope.setAlert(true, response);
                    },
                    function () {
                        $scope.setAlert(false, response);
                    });
            };

            $scope.editDir = function ($index) {
                $rootScope.Elm = $scope.gallery.directories[$index];
                $state.go('editElement', {id: $rootScope.Elm.id, type: 'dir'});
            };

            $scope.openDir = function ($index) {
                dirLocator.add({
                    name: $scope.gallery.directories[$index].name,
                    id: $scope.gallery.directories[$index].id
                });

                galleryService.getDirElements($scope.gallery.directories[$index].id).then(
                    function (response) {
                        $scope.gallery = response;
                    },
                    function () {
                        $scope.setAlert(false, response);
                        $scope.gallery = [];
                    });
            };

            $scope.upDir = function () {
                var dirPath;
                dirLocator.remove();
                dirPath = dirLocator.get();

                galleryService.getDirElements(dirPath).then(
                    function (response) {
                        $scope.gallery = response;
                    },
                    function () {
                        $scope.setAlert(false, response);
                        $scope.gallery = [];
                    });
            };

            $scope.showImage = function ($index) {
                var src;
                $scope.src = $rootScope.mainDir + $scope.gallery.images[$index].path;

                $uibModal.open({
                    animation: true,
                    scope: $scope,
                    template: "<div><img src='{{src}}'/></div>"
                });
            }
        }
    ]);




