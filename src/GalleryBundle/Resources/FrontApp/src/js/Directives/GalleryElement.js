angular.module('elementDirective', ['ui.router'])
    .directive("galleryElement", function () {
        return {
            restrict: "E",
            templateUrl: "templates/imageElement",
            scope: false,
            link: function (scope, elem) {
                $(elem[0]).find('.btn').hide();
                $(elem[0]).hover(function () {
                    $(this).find('.btn').show("medium");
                }, function () {
                    $(this).find('.btn').hide("medium");
                });

            }
        };
    });