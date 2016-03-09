(function () {
    'use strict';

    var module = angular.module('std.intl.postal.code', []);

    module.directive('stdIntlPostalCode',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var listener = function () {
                            var value = $element.val().replace(/[^0-9]/g, '');
                            $element.val($filter('zip')(value, false));
                        };

                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue.replace(/[^0-9]/g, '').slice(0, 9);
                        });

                        ngModelCtrl.$render = function () {
                            $element.val($filter('zip')(ngModelCtrl.$viewValue, false));
                        };

                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        $element.bind('paste cut', function () {
                            $browser.defer(listener);
                        });
                    }
                };
            }]);

    module.filter('stdIntlPostalCode', function () {
        return function (zip) {
            if (!zip) { return ''; }

            var value = zip.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return zip;
            }

            var number = value;

            if (value.length > 5) {
                number = number.slice(0, 5) + '-' + number.slice(5, 9);
            }

            return number.trim();
        };
    });
})();