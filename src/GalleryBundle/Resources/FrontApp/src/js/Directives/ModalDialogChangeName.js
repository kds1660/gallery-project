angular.module('modalDialog', ['ui.router'])
.directive('modalDialog', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: false,
        link: function(scope) {
            scope.cancel = function() {
                scope.$dismiss('cancel');
            };
        },
        templateUrl: 'templates/renameModal'
    };
});