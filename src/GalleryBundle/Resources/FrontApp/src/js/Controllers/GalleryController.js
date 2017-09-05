//TODO remove actions in service
angular.module('galleryController', ['ui.router'])
    .controller('GalleryCtrl', ['$scope', '$rootScope', 'apiGet', '$state',
        function ($scope, $rootScope, apiGet, $state) {
            var dirPath;
            if (!$rootScope.dirPath) $rootScope.dirPath = [];
            dirPath = null;

            if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
            }
            apiGet('directory/' + dirPath, 'GET').then(
                function (response) {
                    $scope.gallery = response.data;
                },
                function () {
                    $scope.gallery = [];
                }
            );

            $scope.deleteElement = function ($index) {
                apiGet('image/' + $scope.gallery.images[$index].id, 'DELETE').then(
                    function (response) {
                        $scope.gallery.images.splice($index, 1);
                        $scope.setAlert(true, response.data);
                        console.log(response);
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                    }
                );

            };

            $scope.editImage = function ($index) {
                $rootScope.Elm = $scope.gallery.images[$index];
                $state.go('editElement', {id: $rootScope.Elm.id, type: 'img'});
            };

            $scope.deleteDir = function ($index) {
                apiGet('directory/' + $scope.gallery.directories[$index].id, 'DELETE').then(
                    function (response) {
                        $scope.gallery.directories.splice($index, 1);
                        $scope.setAlert(true, response.data);
                    },
                    function () {
                        $scope.setAlert(false, response.data);
                    }
                );
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
                apiGet('directory/' + $scope.gallery.directories[$index].id, 'GET').then(
                    function (response) {
                        $scope.gallery = response.data;
                    },
                    function () {
                        $scope.gallery = [];
                    }
                );
            };

            $scope.upDir = function ($index) {
                var dirPath;
                $rootScope.dirPath.pop();
                dirPath = null;

                if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                    dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                }
                apiGet('directory/' + dirPath, 'GET').then(
                    function (response) {
                        $scope.gallery = response.data;
                    },
                    function () {
                        $scope.gallery = [];
                    }
                );
            };
        }
    ])

    .controller('GalleryRenameCtrl', ['$scope', '$rootScope', 'apiGet', '$stateParams', '$state',
        function ($scope, $rootScope, apiGet, $stateParams, $state) {
            $scope.submit = function () {
                var elmName;
                $rootScope.Elm='';
                elmName = $('.elmName').val().trim();

                if ($stateParams.type == 'dir') {
                    apiGet('directory/' + $stateParams.id, 'PUT', elmName).then(
                        function (response) {
                            $scope.setAlert(true, response.data);
                            $state.go('gallery');
                        },
                        function () {
                            $scope.setAlert(true, response.data);
                        }
                    );
                }

                if ($stateParams.type == 'img') {
                    apiGet('image/' + $stateParams.id, 'PUT', elmName).then(
                        function (response) {
                            $scope.setAlert(true, response.data);
                            $state.go('gallery');
                        },
                        function () {
                            $scope.setAlert(true, response.data);
                        }
                    );
                }
            }
        }
    ])

    .controller('GalleryAddDirCtrl', ['$scope', '$rootScope', 'apiGet', '$stateParams', '$state',
        function ($scope, $rootScope, apiGet, $stateParams, $state) {
            $scope.submit = function () {
                var elmName, dirPath;
                elmName = $('.elmName').val().trim();
                dirPath = null;

                if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                    dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                }
                apiGet('directory', 'POST', {name: elmName, pid: dirPath}).then(
                    function (response) {
                        $scope.setAlert(true, response.data);
                        $state.go('gallery');
                    },
                    function () {
                        $scope.setAlert(true, response.data);
                    }
                );
            }
        }
    ]);