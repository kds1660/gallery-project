angular.module('galleryServices', [])
    .constant('api_url', 'http://localhost:8000/')

    .factory('apiReq', ['$http', 'api_url',
        function ($http, api_url) {
            return function (url, method, data) {
                var conf = {
                    method: method,
                    url: api_url + url,
                    data: data
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

    .factory('galleryService', ['$http', 'apiReq', '$q', function ($http, apiReq, $q) {
        return {
            getDirElements: function (dir) {
                var deferred = $q.defer();
                apiReq('directory/' + dir, 'GET').then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function () {
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
                    function () {
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
                    function () {
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
                remove:function () {
                    $rootScope.dirPath.pop()
                },
                get:function () {
                    if ($rootScope.dirPath.length) {
                        return $rootScope.dirPath[$rootScope.dirPath.length - 1].id;
                    }
                    return null;
                }
            }
        }
    ]);