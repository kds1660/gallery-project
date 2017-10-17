angular.module('galleryController', ['ui.router'])
    .controller('GalleryCtrl', ['$http', '$scope', '$rootScope', '$state', '$uibModal', '$stateParams', 'modalService', 'galleryService', 'dirLocator', 'pageLocator',
        function ($http, $scope, $rootScope, $state, $uibModal, $stateParams, modalService, galleryService, dirLocator, pageLocator) {
            var dirPath;
            //zero paginator
            pageLocator.init();
            dirPath = $state.params.id || dirLocator.get();
            //init directory path array (get from backend)
            dirLocator.init(dirPath);

            galleryService.getDirElements(dirPath).then(
                function (response) {
                    $scope.gallery = response;
                },
                function () {
                    $scope.setAlert(false, response);
                    $scope.gallery = [];
                });

            $scope.deleteElement = function ($index) {
                //show modal window for confirm action
                modalService.confirm().then(function () {
                    galleryService.deleteElement($scope.gallery.images[$index].id).then(
                        function (response) {
                            $scope.gallery.images.splice($index, 1);
                            $scope.setAlert(true, response);
                            $scope.home();
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }, function () {
                });
            };

            $scope.editImage = function ($index) {
                $rootScope.Elm = $scope.gallery.images[$index];
                $state.go('gallery.editElement', {id: dirLocator.get(), type: 'img'});
            };

            $scope.deleteDir = function ($index) {
                //show modal window for confirm action
                modalService.confirm().then(function () {
                    galleryService.deleteDir($scope.gallery.directories[$index].id).then(
                        function (response) {
                            $scope.gallery.directories.splice($index, 1);
                            $scope.setAlert(true, response);
                            $scope.home();
                        },
                        function (response) {
                            $scope.setAlert(false, response);
                        });
                }, function () {
                });
            };

            $scope.editDir = function ($index) {
                $rootScope.Elm = $scope.gallery.directories[$index];
                $state.go('gallery.editElement', {id: dirLocator.get(), type: 'dir'});
            };

            $scope.openDir = function ($index) {
                dirLocator.add({
                    name: $scope.gallery.directories[$index].name,
                    id: $scope.gallery.directories[$index].id
                });
                $state.go('gallery', {id: $scope.gallery.directories[$index].id});
            };

            $scope.upDir = function () {
                var dirPath;
                //remove directory from dirPath array
                dirLocator.remove();
                dirPath = dirLocator.get();
                $state.go('gallery', {id: dirPath});
            };

            $scope.showImage = function ($index) {
                var src;
                $scope.src = $rootScope.mainDir + $scope.gallery.images[$index].path;

                $uibModal.open({
                    animation: true,
                    scope: $scope,
                    template: "<div><img ng-src='{{src}}'||''/></div>"
                }).result.then(function () {
                }, function (res) {
                });
            };

            $scope.next = function () {
                dirPath = dirLocator.get();
                galleryService.getDirElements(dirPath).then(
                    function (response) {
                        $scope.gallery = response;
                        //show home button
                        $('.btn-home').show();
                    },
                    function (response) {
                        $scope.setAlert(false, response);
                        $scope.gallery = [];
                    });
            };

            $scope.home = function () {
                //if back home - hide home button
                $('.btn-home').hide();
                dirPath = dirLocator.get();
                pageLocator.init();

                galleryService.getDirElements(dirPath).then(
                    function (response) {
                        $scope.gallery = response;
                    },
                    function (response) {
                        $scope.setAlert(false, response);
                        $scope.gallery = [];
                    });
            };

            $scope.cutImage = function (index, event) {
                $rootScope.cutImg = $scope.gallery.images[index];
                $('.thumb').animate({'opacity': 1});
                $(event.target).parent().animate({'opacity': 0.5});

            };

            $scope.pasteImg = function () {
                galleryService.pasteImage($rootScope.cutImg.id, $state.params.id).then(
                    function (response) {
                        $('.fa-paste').hide();
                        $scope.setAlert(true, response);
                        $rootScope.cutImg = '';
                        $scope.home();
                    },
                    function (response) {
                        $scope.setAlert(false, response);
                    });
            };

            //if first page hide home button
            if (!pageLocator.get().imgOffset && !pageLocator.get().dirOffset) {
                $('.btn-home').hide();
            }
        }
    ]);