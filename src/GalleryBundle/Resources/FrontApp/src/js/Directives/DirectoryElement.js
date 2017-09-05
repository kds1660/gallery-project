angular.module('dirDirective', ['ui.router'])
    .directive("directorieElement", function () {
        return {
            restrict: "E",
            templateUrl: "templates/directoryElement",
            scope: false,
            link: function (scope, elem) {
                $(elem[0]).find('.btn').hide();
                $(elem[0]).hover(function (event) {

                    $(this).find('.btn').show("medium");
                }, function () {
                    $(this).find('.btn').hide("medium");
                });
            }
        };
    });