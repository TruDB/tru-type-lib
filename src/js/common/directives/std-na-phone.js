(function () {
    'use strict';

    var module = angular.module('std.na.phone', []);

    module.directive('stdNaPhone',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {

                        ngModelCtrl.$formatters.push(function (val) {
                            return $filter('stdNaPhone')(val, false);
                        });

                        var initalLength, formattedLength, start, end;
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            var cleaned = viewValue.replace(/[^0-9]/g, '').slice(0, 20);
                            var formattedValue = $filter('stdNaPhone')(cleaned, false);

                            if (formattedValue !== viewValue) {
                                initalLength = viewValue.length;
                                formattedLength = formattedValue.length;
                                start = $element[0].selectionStart;
                                end = $element[0].selectionEnd;
                                start += formattedLength - initalLength;
                                end += formattedLength - initalLength;
                                ngModelCtrl.$setViewValue($filter('stdNaPhone')(cleaned, false));
                                ngModelCtrl.$render();
                                $element[0].setSelectionRange(start, end);
                            }
                            return cleaned;
                        });


                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                        });
                    }
                };
            }]);

    module.filter('stdNaPhone', function () {
        return function (number) {
            if (number.value) {
                if (number.value.$)
                    number = number.value.$.replace(/[^0-9]/g, '');
                else
                    number = number.value.$
            }
            if (!number) { return ''; }

            number = String(number);

            var formattedNumber = number;

            var c = (number[0] == '1') ? '+1 ' : '';
            number = number[0] == '1' ? number.slice(1) : number;

            var area = number.substring(0,3);
            var front = number.substring(3, 6);
            var end = number.substring(6, 10);
            var ext = number.substring(10, 20);

            if (front) {
                formattedNumber = (c + "(" + area + ") " + front);
            }
            if (end) {
                formattedNumber += ("-" + end);
            }
            if (ext) {
                formattedNumber += (" x" + ext);
            }
            return formattedNumber;
        };
    });
})();