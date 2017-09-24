angular.module('galleryRenameController', ['ui.router'])
    .controller('GalleryRenameCtrl', ['$scope', '$rootScope','galleryService', 'dirLocator', '$stateParams', '$state',
        function ($scope, $rootScope, galleryService,dirLocator, $stateParams, $state) {
            inputFocus();

            $scope.submit = function () {
                var elmName;
                $rootScope.Elm = '';
                elmName = $('.elmName').val().trim();

                if ($stateParams.type === 'dir') {
                    galleryService.renameDir($stateParams.id,elmName).then(
                        function (response) {
                            $scope.setAlert(true, response);
                            $state.go('gallery',{id:dirLocator.get()});
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }

                if ($stateParams.type === 'img') {
                    galleryService.renameImage($stateParams.id,elmName).then(
                        function (response) {
                            $scope.setAlert(true, response);
                            $state.go('gallery',{id:dirLocator.get()});
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }
            };
            $scope.mainPage = function () {
                $rootScope.dirPath = [];
                $state.go('gallery', {id: null});
            };
        }
    ]);
