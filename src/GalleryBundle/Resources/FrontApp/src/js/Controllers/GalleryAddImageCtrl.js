angular.module('galleryAddImgController', ['ui.router'])
    .controller('GalleryAddImgCtrl', ['galleryService', '$scope', '$rootScope', 'dirLocator', '$stateParams', '$state',
        function (galleryService, $scope, $rootScope, dirLocator, $stateParams, $state) {
            var form, img;
            $scope.loadingImage = {};
            inputActions();

            $scope.saveImage = function () {
                img = ($(".image"))[0];
                $scope.loadingImage.imageName = img.name;
                $scope.loadingImage.pid= dirLocator.get();
                form = new FormData();
                form.append('file', img.files[0]);
                form.append('name', $($scope.loadingImage.name).text()||$scope.loadingImage.name);
                form.append('pid', $scope.loadingImage.pid);

                if ($scope.loadingImage.name && $scope.loadingImage.image && $scope.ImageType) {
                    galleryService.addImage(form).then(
                        function (response) {
                            $scope.setAlert(true, response);
                            $state.go('gallery',{id: $scope.loadingImage.pid},{reload : true});
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }
            };

            $scope.loadImage = function (files) {
                $scope.ImageType = true;

                if (!galleryService.checkImage(files[0])) {
                    $scope.ImageType = false;
                    $scope.setAlert(false, 'Support images:png/jpeg/gif/svg');
                }
            }
        }
    ]);
