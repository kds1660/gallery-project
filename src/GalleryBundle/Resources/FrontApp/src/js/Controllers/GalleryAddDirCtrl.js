angular.module('galleryAddDirController', ['ui.router'])
    .controller('GalleryAddDirCtrl', ['$scope', '$rootScope', 'apiReq', '$stateParams', '$state',
        function ($scope, $rootScope, apiReq, $stateParams, $state) {
            $scope.submit = function () {
                var elmName, dirPath;
                elmName = $('.elmName').val().trim();
                dirPath = null;

                if ($rootScope.dirPath[$rootScope.dirPath.length - 1]) {
                    dirPath = $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                }
                apiReq('directory', 'POST', {name: elmName, pid: dirPath}).then(
                    function (response) {
                        $scope.setAlert(true, response.data);
                        $state.go('gallery');
                    },
                    function (response) {
                        $scope.setAlert(false, response.data);
                    });
            }
        }
    ]);