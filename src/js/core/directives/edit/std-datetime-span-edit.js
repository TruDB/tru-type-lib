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

                        function getDateParts(val) {
                            var dateParts = val.split(/[\s/:]+/);
                            dateParts = dateParts.slice(0, 3);
                            return dateParts.join('');
                        }

                        function getTimeParts(val) {
                            var dateParts = val.split(/[\s/:]+/);
                            var period = dateParts[5];
                            dateParts = dateParts.slice(3, 5);
                            var hours = parseInt(dateParts[0]);
                            var minutes = dateParts[1];

                            if (period === 'AM' && hours === 12) {
                                hours = 0;
                            } else if (period === 'PM' && hours < 12) {
                                hours += 12;
                            }

                            return hours.toString() + minutes;
                        }

                        elms[0].addEventListener('blur', function (event) {
                            var startValue = scope.field.children.start.value.$;
                            var endValue = scope.field.children.end.value.$;
                            if (endValue && endValue instanceof Date && startValue && startValue instanceof Date) {
                                var startDate = parseInt(getDateParts(elms[0].value));
                                var startTime = parseInt(getTimeParts(elms[0].value));
                                var endDate = parseInt(getDateParts(elms[1].value));
                                var endTime = parseInt(getTimeParts(elms[1].value));
                                if (startDate > endDate && startTime > endTime) {
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                } else if (startDate > endDate && startTime <= endTime) {
                                    startValue.setHours(endValue.getHours());
                                    startValue.setMinutes(endValue.getMinutes());
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                } else if (startDate === endDate && startTime > endTime) {
                                    startValue.setFullYear(endValue.getFullYear());
                                    startValue.setMonth(endValue.getMonth());
                                    startValue.setDate(endValue.getDate());
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                }
                            }
                        }, true);

                        elms[1].addEventListener('blur', function (event) {
                            var endValue = scope.field.children.end.value.$;
                            var startValue = scope.field.children.start.value.$;
                            if (startValue && startValue instanceof Date && endValue && endValue instanceof Date) {
                                var startDate = parseInt(getDateParts(elms[0].value));
                                var startTime = parseInt(getTimeParts(elms[0].value));
                                var endDate = parseInt(getDateParts(elms[1].value));
                                var endTime = parseInt(getTimeParts(elms[1].value));
                                if (startDate > endDate && startTime > endTime) {
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                } else if (startDate > endDate && startTime <= endTime) {
                                    endValue.setHours(startValue.getHours());
                                    endValue.setMinutes(startValue.getMinutes());
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                } else if (startDate === endDate && startTime > endTime) {
                                    endValue.setFullYear(startValue.getFullYear());
                                    endValue.setMonth(startValue.getMonth());
                                    endValue.setDate(startValue.getDate());
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