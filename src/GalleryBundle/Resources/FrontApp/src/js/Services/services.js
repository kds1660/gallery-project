angular.module('galleryServices', [])
    .factory('apiReq', ['$http',
        function ($http) {
            return function (url, method, data, params) {
                var conf = {
                    method: method,
                    url: url,
                    data: data,
                    params: params
                };
                return $http(conf)
                    .then(function (response) {
                        return response || [];
                    })
                    .then(function (error) {
                        return error;
                    });
            }
        }
    ])

    .factory('galleryService', ['$http', 'apiReq', '$q', 'pageLocator', function ($http, apiReq, $q, pageLocator) {
        return {
            getDirElements: function (dir) {
                var deferred = $q.defer();
                var dirLength, imgLength;
                apiReq('directory/' + dir, 'GET', '', pageLocator.get()).then(
                    function (response) {
                        if (response.data.directories.length >= pageLocator.getLimit()) {
                            dirLength = pageLocator.getLimit();
                            response.data.images = [];
                            imgLength = 0;
                        }
                        if (response.data.directories.length < pageLocator.getLimit()) {
                            dirLength = response.data.directories.length;
                            response.data.images = response.data.images.slice(0, pageLocator.getLimit() - dirLength);
                            imgLength = response.data.images.length;
                        }

                        if (response.data.directories.length + response.data.images.length < pageLocator.getLimit()) {
                            $('.btn-next').hide();
                        }
                        pageLocator.next(dirLength, imgLength);
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            deleteElement: function (id) {
                var deferred = $q.defer();
                apiReq('image/' + id, 'DELETE').then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            deleteDir: function (id) {
                var deferred = $q.defer();
                apiReq('directory/' + id, 'DELETE').then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            addDir: function (data) {
                var deferred = $q.defer();
                apiReq('directory', 'POST', data).then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            renameDir: function (id, name) {//todo in 1 function
                var deferred = $q.defer();
                apiReq('directory/' + id, 'PUT', name).then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            renameImage: function (id, name) {
                var deferred = $q.defer();
                apiReq('image/' + id, 'PUT', name).then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            addImage: function (form) {
                var deferred = $q.defer();
                $http.post('image', form, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            checkImage: function (files) {
                if (files.type !== "image/png" &&
                    files.type !== "image/jpeg" &&
                    files.type !== "image/gif" &&
                    files.type !== "image/svg+xml") {
                    return false;
                }
                return true
            }
        };
    }])

    .factory('dirLocator', ['$rootScope',
        function ($rootScope) {
            return {
                init: function () {
                    if (!$rootScope.dirPath) $rootScope.dirPath = [];
                },
                add: function (data) {
                    $rootScope.dirPath.push(data)
                },
                remove: function () {
                    $rootScope.dirPath.pop()
                },
                get: function () {
                    if ($rootScope.dirPath.length) {
                        return $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                    }
                    return null;
                }
            }
        }
    ])

    .factory('pageLocator', ['$rootScope', 'pageNumberElement',
        function ($rootScope, pageNumberElement) {
            return {
                init: function () {
                    $rootScope.limit = pageNumberElement;
                    $rootScope.page = {
                        imgOffset: 0,
                        dirOffset: 0
                    };
                    $('.btn-next').show();
                },
                next: function (dirOffset, imgOffset) {
                    $rootScope.page.dirOffset += dirOffset;
                    $rootScope.page.imgOffset += imgOffset;

                },
                get: function () {
                    $rootScope.page.limit = $rootScope.limit;
                    return $rootScope.page;
                },
                getLimit: function () {
                    return $rootScope.limit;
                }
            }
        }
    ]);