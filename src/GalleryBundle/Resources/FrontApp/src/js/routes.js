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
                .state('gallery.editElement', {
                    url: '/edit/:id',
                    templateUrl: 'templates/renameElement',
                    controller: 'GalleryRenameCtrl',
                    params: {
                        type: null
                    }
                })
                .state('gallery.addDir', {
                    url: '/new/',
                    templateUrl: 'templates/renameElement',
                    controller: 'GalleryAddDirCtrl',
                    params: {
                        type: null
                    }
                })
                .state('gallery.addImage', {
                    url: '/add/',
                    templateUrl: 'templates/newImage',
                    controller: 'GalleryAddImgCtrl'
                });
            $locationProvider.html5Mode(true).hashPrefix('!');
            $urlRouterProvider.otherwise("/gallery/view/");
        }]);