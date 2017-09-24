angular.module('galleryRoutes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlServiceProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $urlServiceProvider) {
            $urlServiceProvider.config.strictMode(false);

            $stateProvider
                .state('gallery', {
                    url: '/gallery/view/:id',
                    templateUrl: 'templates/gallery',
                    controller: 'GalleryCtrl'
                })
                .state('editElement', {
                    url: '/gallery/edit/:id',
                    templateUrl: 'templates/renameElement',
                    controller: 'GalleryRenameCtrl',
                    params: {
                        type: null
                    }
                })
                .state('addDir', {
                    url: '/gallery/new',
                    templateUrl: 'templates/renameElement',
                    controller: 'GalleryAddDirCtrl',
                    params: {
                        type: null
                    }
                })
                .state('addImage', {
                    url: '/gallery/add',
                    templateUrl: 'templates/newImage',
                    controller: 'GalleryAddImgCtrl'
                });
            $locationProvider.html5Mode(true).hashPrefix('!');
            $urlRouterProvider.otherwise("/gallery/view/");
        }]);
