(function () {
    'use strict';

    var module = angular.module('std.integer.only', []);

    module.directive('stdIntegerOnly',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdIntegerOnly.type.isNullable;
                        var isEditContext = scope.stdIntegerOnly.isEditContext;
                        var isSearchContext = scope.stdIntegerOnly.isSearchContext;
                        var maxValue = scope.stdIntegerOnly.type.property.maximumValue;
                        var minValue = scope.stdIntegerOnly.type.property.minimumValue;
                        maxValue = typeof maxValue === 'undefined' ? 2147483647 : maxValue;
                        minValue = typeof minValue === 'undefined' ? -2147483647 : minValue;

                        function setViewValue(cleanVal, inputVal, newVal) {
                            var start = element[0].selectionStart;
                            var end = element[0].selectionEnd + cleanVal.length - inputVal.length;
                            ngModelCtrl.$setViewValue(newVal);
                            ngModelCtrl.$render();
                            element[0].setSelectionRange(start, end);
                        }

                        ngModelCtrl.$parsers.push(function (val) {
                            var parts = String(val).split('');
                            var isNegative = parts[0] === '-' ? true : false;
                            var clean = val.toString().replace(/[^0-9]+/g, '');

                            if (val !== clean) {
                                if (isNegative)
                                    clean = '-' + clean;

                                if (ngModelCtrl.$viewValue !== clean) {
                                    setViewValue(clean, val, clean);
                                }
                            }

                            if (maxValue && parseInt(clean) > maxValue) {
                                setViewValue(clean, val, ngModelCtrl.$modelValue);
                                return ngModelCtrl.$modelValue;
                            }

                            if (minValue && parseInt(clean) < minValue) {
                                setViewValue(clean, val, ngModelCtrl.$modelValue);
                                return ngModelCtrl.$modelValue;
                            }

                            //clean === '' because isNaN return false for empty string.
                            if (clean === '' && isSearchContext) {
                                return undefined;
                            } else if (clean === '' && isEditContext) {
                                return null;
                            } else if (isNaN(clean) && isSearchContext) {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else if (isNaN(clean) && isEditContext) {
                                return null;
                            } else
                                return parseInt(clean);
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();