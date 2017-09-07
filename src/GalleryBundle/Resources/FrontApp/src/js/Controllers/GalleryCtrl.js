//TODO remove actions in service
angular.module('galleryController', ['ui.router'])
    .controller('GalleryCtrl', ['$scope', '$rootScope', 'apiReq', '$state', '$uibModal',
        function ($scope, $rootScope, apiReq, $state, $uibModal) {
            var dirPath;
            if (!$rootScope.dirPath) $rootScope.dirPath = [];
            dirPath = null;

            if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
            }
            apiReq('directory/' + dirPath, 'GET').then(
                function (response) {
                    $scope.gallery = response.data;
                },
                function () {
                    $scope.setAlert(false, response.data);
                    $scope.gallery = [];
                });

            $scope.deleteElement = function ($index) {
                apiReq('image/' + $scope.gallery.images[$index].id, 'DELETE').then(
                    function (response) {
                        $scope.gallery.images.splice($index, 1);
                        $scope.setAlert(true, response.data);
                        console.log(response);
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                    });

            };

            $scope.editImage = function ($index) {
                $rootScope.Elm = $scope.gallery.images[$index];
                $state.go('editElement', {id: $rootScope.Elm.id, type: 'img'});
            };

            $scope.deleteDir = function ($index) {
                apiReq('directory/' + $scope.gallery.directories[$index].id, 'DELETE').then(
                    function (response) {
                        $scope.gallery.directories.splice($index, 1);
                        $scope.setAlert(true, response.data);
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                    });
            };

            $scope.editDir = function ($index) {
                $rootScope.Elm = $scope.gallery.directories[$index];
                $state.go('editElement', {id: $rootScope.Elm.id, type: 'dir'});
            };

            $scope.openDir = function ($index) {
                $rootScope.dirPath.push({
                    name: $scope.gallery.directories[$index].name,
                    id: $scope.gallery.directories[$index].id
                });
                apiReq('directory/' + $scope.gallery.directories[$index].id, 'GET').then(
                    function (response) {
                        $scope.gallery = response.data;
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                        $scope.gallery = [];
                    });
            };

            $scope.upDir = function () {
                var dirPath;
                $rootScope.dirPath.pop();
                dirPath = null;

                if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                    dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                }
                apiReq('directory/' + dirPath, 'GET').then(
                    function (response) {
                        $scope.gallery = response.data;
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                        $scope.gallery = [];
                    });
            };

            $scope.showImage = function ($index) {
                var src;
                $scope.src = $rootScope.mainDir + $scope.gallery.images[$index].path;
                console.log($scope.src);
                $uibModal.open({
                    animation: true,
                    scope: $scope,
                    template: "<div><img src='{{src}}'/></div>"
                });
            }
        }
    ]);




