//TODO remove actions in service
angular.module('galleryController', ['ui.router'])
    .controller('GalleryCtrl', ['$scope', '$rootScope', 'galleryService', 'dirLocator', 'pageLocator', '$state', '$uibModal',
        function ($scope, $rootScope, galleryService, dirLocator, pageLocator, $state, $uibModal) {
            var dirPath;
            dirLocator.init();
            pageLocator.init();

            dirPath = dirLocator.get();

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
                        $scope.home();
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
                        $scope.home();
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
                pageLocator.init();
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
                pageLocator.init();
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
                    template: "<div><img ng-src='{{src}}'||''/></div>"
                }).result.then(function(){}, function(res){});
            };
            $scope.next = function () {
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
            $scope.home = function () {
                dirPath = dirLocator.get();
                pageLocator.init();

                galleryService.getDirElements(dirPath).then(
                    function (response) {
                        $scope.gallery = response;
                    },
                    function () {
                        $scope.setAlert(false, response);
                        $scope.gallery = [];
                    });
            }
        }
    ]);