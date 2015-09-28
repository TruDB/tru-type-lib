(function () {
    'use strict';

    var module = angular.module('std.datetime.edit', []);

    module.controller('stdDatetimeEditController', ['$scope',
        function ($scope) {
            $scope.setPeriod = function() {
                $scope.field.property.period = $scope.field.property.period === 'AM' ? 'PM' : 'AM';
            };
        }]);

    module.directive('stdDatetimeEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-edit.html'),
                    controller: 'stdDatetimeEditController',
                    link: function (scope, element) {
                        var input = element[0].querySelectorAll('input')[0];
                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 46) {
                                scope.field.value.$ = null;
                            }
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();