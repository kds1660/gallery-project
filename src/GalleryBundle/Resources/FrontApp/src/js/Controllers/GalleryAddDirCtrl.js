angular.module('galleryAddDirController', ['ui.router'])
    .controller('GalleryAddDirCtrl', ['$scope', '$rootScope', 'galleryService', 'dirLocator', '$stateParams', '$state',
        function ($scope, $rootScope, galleryService, dirLocator, $stateParams, $state) {
            inputFocus();
            $rootScope.Elm='';
            $scope.submit = function () {
                var elmName, dirPath;
                elmName = $($('.elmName').val().trim()).text() || $('.elmName').val().trim();
                dirPath = dirLocator.get();

                galleryService.addDir({name: elmName, pid: dirPath}).then(
                    function (response) {
                        $scope.setAlert(true, response);
                        $state.go('gallery', {id: dirPath});
                    },
                    function (response) {
                        $scope.setAlert(false, response);
                    });
            }
        }
    ]);
