angular.module('galleryRoutes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                controller: 'GalleryAddDirCtrl'
            })
            .state('addImage', {
                url: '/gallery/add',
                templateUrl: 'templates/newImage',
                controller: 'GalleryAddImgCtrl'
            });

        $urlRouterProvider.otherwise("/gallery/view/");
    }]);