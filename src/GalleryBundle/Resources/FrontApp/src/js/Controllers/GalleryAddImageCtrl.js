angular.module('galleryAddImgController', ['ui.router'])
    .controller('GalleryAddImgCtrl', ['$http', '$scope', '$rootScope', 'apiReq', '$stateParams', '$state',
        function ($http, $scope, $rootScope, apiReq, $stateParams, $state) {
            var form, img;
            $scope.loadingImage = {};
            $scope.loadingImage.pid = null;
            $scope.saveImage = function () {

                img = ($(".image"))[0];
                $scope.loadingImage.imageName = img.name;

                if ($rootScope.dirPath.length) {
                    $scope.loadingImage.pid = $rootScope.dirPath[$rootScope.dirPath.length - 1].id
                }
                form = new FormData();
                form.append('file', img.files[0]);
                form.append('name', $scope.loadingImage.name);
                form.append('pid', $scope.loadingImage.pid);

                if ($scope.loadingImage.name && $scope.loadingImage.image && $scope.ImageType) {
                    $http.post('image', form, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(
                        function (response) {
                            $scope.setAlert(true, response.data);
                            $state.go('gallery');
                        },
                        function (response) {
                            $scope.setAlert(false, response.data);
                        });
                }
            };

            $scope.loadImage = function (files) {
                $scope.ImageType = true;

                if (files[0].type !== "image/png" &&
                    files[0].type !== "image/jpeg" &&
                    files[0].type !== "image/gif" &&
                    files[0].type !== "image/svg+xml") {
                    $scope.ImageType = false;
                    $scope.setAlert(false, 'Support images:png/jpeg/gif/svg');
                }
            }
        }
    ]);