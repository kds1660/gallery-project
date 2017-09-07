angular.module('galleryRenameController', ['ui.router'])
    .controller('GalleryRenameCtrl', ['$scope', '$rootScope', 'apiReq', '$stateParams', '$state',
        function ($scope, $rootScope, apiReq, $stateParams, $state) {
            $scope.submit = function () {
                var elmName;
                $rootScope.Elm = '';
                elmName = $('.elmName').val().trim();

                if ($stateParams.type === 'dir') {
                    apiReq('directory/' + $stateParams.id, 'PUT', elmName).then(
                        function (response) {
                            $scope.setAlert(true, response.data);
                            $state.go('gallery');
                        },
                        function () {
                            $scope.setAlert(false, response.data);
                        }
                    );
                }

                if ($stateParams.type === 'img') {
                    apiReq('image/' + $stateParams.id, 'PUT', elmName).then(
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
    ]);