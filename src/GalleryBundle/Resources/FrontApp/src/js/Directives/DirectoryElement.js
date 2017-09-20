angular.module('dirDirective', ['ui.router'])
    .directive("directoryElement", function () {
        return {
            restrict: "E",
            templateUrl: "templates/directoryElement",
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
