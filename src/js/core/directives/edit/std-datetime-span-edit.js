(function () {
    'use strict';

    var module = angular.module('std.datetime.span.edit', []);

    module.controller('stdDatetimeSpanEditController', ['$scope', '$timeout', '$element',
        function ($scope, $timeout, $element) {

        }]);

    module.directive('stdDatetimeSpanEdit',
        ['$templateCache', '$timeout', '$filter', 'stdDisplay',
            function ($templateCache, $timeout, $filter, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-span-edit.html'),
                    controller: 'stdDatetimeSpanEditController',
                    link: function (scope, element) {
                        var elms = [].slice.call(element[0].querySelectorAll('input'), 0);

                        var controllers = elms.map(function (el) {
                            return angular.element(el).controller('ngModel');
                        });

                        elms[0].addEventListener('blur', function (event) {
                            var startValue = scope.field.children.start.value.$;
                            var endValue = scope.field.children.end.value.$;
                            if (endValue && endValue instanceof Date && startValue && startValue instanceof Date) {
                                if (startValue > endValue) {
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                }
                            }
                        }, true);

                        elms[1].addEventListener('blur', function (event) {
                            var endValue = scope.field.children.end.value.$;
                            var startValue = scope.field.children.start.value.$;
                            if (startValue && startValue instanceof Date && endValue && endValue instanceof Date) {
                                if (startValue > endValue) {
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                }
                            }
                        }, true);

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();