angular.module('galleryServices', [])
    .constant('api_url', 'http://localhost:8000/')

    .factory('apiGet', ['$http','api_url',
        function ($http, api_url) {
            return function (url,method,data) {
                var conf = {
                    method: method,
                    url: api_url + url,
                    data:data
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
    ]);