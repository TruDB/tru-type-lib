(function () {
    'use strict';

    var module = angular.module('std.number.only', []);

    module.directive('stdNumberOnly',
        ['$browser',
            function ($browser) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var listener = function () {
                            var value = element.val().replace(/[^0-9]/g, '');
                            element.val(value);
                        };

                        ngModelCtrl.$formatters.push(function (val) {
                            if (!val && val !== null)
                                return val.replace(/[^0-9]/g, '');
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            return val.replace(/[^0-9]/g, '');
                        });

                        element.bind('change', listener);
                        element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        element.bind('paste cut', function () {
                            $browser.defer(listener);
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