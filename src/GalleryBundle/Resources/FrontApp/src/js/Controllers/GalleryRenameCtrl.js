angular.module('galleryRenameController', ['ui.router'])
    .controller('GalleryRenameCtrl', ['$scope', '$rootScope','galleryService', 'dirLocator', '$stateParams', '$state',
        function ($scope, $rootScope, galleryService,dirLocator, $stateParams, $state) {
            galleryService.inputFieldPrepare();

            $scope.submit = function () {
                var elmName;

                elmName = $('.elmName').val().trim();

                if ($stateParams.type === 'dir') {
                    galleryService.renameDir($rootScope.Elm.id,elmName).then(
                        function (response) {
                            $scope.setAlert(true, response);
                            $scope.home();
                            $state.go('gallery',{id:dirLocator.get()});
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }

                if ($stateParams.type === 'img') {
                    galleryService.renameImage($rootScope.Elm.id,elmName).then(
                        function (response) {
                            $scope.setAlert(true, response);
                            $scope.home();
                            $state.go('gallery',{id:dirLocator.get()});
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }
            };
        }
    ]);