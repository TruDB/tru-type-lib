(function () {
    'use strict';

    var module = angular.module('std.decimal', []);
 
    module.directive('stdDecimal',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDecimal: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdDecimal.type.isNullable;
                        var decimalPlaces = scope.stdDecimal.type.property.decimalPlaces;
                        var maxValue = scope.stdDecimal.type.property.maximumValue;
                        var minValue = scope.stdDecimal.type.property.minimumValue;
                        maxValue = typeof maxValue === 'undefined' ? 2147483647 : maxValue;
                        minValue = typeof minValue === 'undefined' ? -2147483647 : minValue;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 0;

                        var wholePlaces = 38 - decimalPlaces;

                        function setViewValue(cleanVal, inputVal, newVal, offset) {
                            if (!offset) offset = 0;
                            var start = element[0].selectionStart;
                            var end = element[0].selectionEnd + cleanVal.length - inputVal.length + offset;
                            ngModelCtrl.$setViewValue(newVal);
                            ngModelCtrl.$render();
                            element[0].setSelectionRange(start, end);
                        }

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if ((val.toString().split('.').length - 1) > 1) {
                                setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var negativeCount = (val.match(/-/g) || []).length;
                                        if (negativeCount > 1)
                                            setViewValue(clean, val, clean);
                                        else {
                                            if (wholePlaces === wholeNumber.length || decimalPlaces === fractionalNumber.length)
                                                setViewValue(clean, val, clean, 1);
                                            else
                                                setViewValue(clean, val, clean);
                                        }
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                if (maxValue && number > maxValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                if (minValue && number < minValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString();
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString();
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
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