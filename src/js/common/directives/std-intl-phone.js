(function () {
    'use strict';

    var module = angular.module('std.intl.phone', []);

    goog.require('goog.dom');
    goog.require('goog.json');
    goog.require('goog.proto2.ObjectSerializer');
    goog.require('goog.string.StringBuffer');
    goog.require('i18n.phonenumbers.AsYouTypeFormatter');
    goog.require('i18n.phonenumbers.PhoneNumberFormat');
    goog.require('i18n.phonenumbers.PhoneNumberType');
    goog.require('i18n.phonenumbers.PhoneNumberUtil');
    goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

    module.directive('stdIntlPhone',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
                        var PNF = i18n.phonenumbers.PhoneNumberFormat;
                        var listener = function () {
                            var clean = $element.val().replace(/[^0-9]/g, '');
                            try {
                                var countryCode = $scope.$parent.field.children.countryCode.value.$ ? $scope.$parent.field.children.countryCode.value.$ : $scope.$parent.field.property.countryCode;
                                var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                                $element.val(phoneUtil.format(number, PNF.NATIONAL));
                            } catch(e) {
                                $element.val(clean);
                            }

                        };

                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue.replace(/[^0-9]/g, '');
                        });

                        ngModelCtrl.$render = function () {
                            var clean = ngModelCtrl.$modelValue;
                            try {
                                var countryCode = $scope.$parent.field.children.countryCode.value.$ ? $scope.$parent.field.children.countryCode.value.$ : $scope.$parent.field.property.countryCode;
                                var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                                $element.val(phoneUtil.format(number, PNF.NATIONAL));
                            } catch (e) {
                                $element.val(clean);
                            }
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
})();