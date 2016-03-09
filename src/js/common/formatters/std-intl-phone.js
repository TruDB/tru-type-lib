(function () {
    'use strict';

    var module = angular.module('std.formatters');

    goog.require('goog.dom');
    goog.require('goog.json');
    goog.require('goog.proto2.ObjectSerializer');
    goog.require('goog.string.StringBuffer');
    goog.require('i18n.phonenumbers.AsYouTypeFormatter');
    goog.require('i18n.phonenumbers.PhoneNumberFormat');
    goog.require('i18n.phonenumbers.PhoneNumberType');
    goog.require('i18n.phonenumbers.PhoneNumberUtil');
    goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

    module.filter('stdIntlPhone', ['stdCountries', function (countries) {
        return function (cfg) {
            var field = cfg;
            cfg = cfg.children;
            var text = '';
            if (cfg.countryCode.value.$ !== null) {
                var country = _.find(countries.allCountries, function (country) { return country.iso2 === cfg.countryCode.value.$ });
                var dialCode = country.dialCode;
                text += '+' + dialCode + ' ';
            }
            if (cfg.phone.value.$ !== null) {
                var clean = cfg.phone.value.$.replace(/[^0-9]/g, '');
                try {
                    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
                    var PNF = i18n.phonenumbers.PhoneNumberFormat;
                    var countryCode = cfg.countryCode.value.$ ? cfg.countryCode.value.$ : field.property.countryCode;
                    var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                    text += phoneUtil.format(number, PNF.NATIONAL) + ' ';
                } catch(e) {
                    text += clean + ' ';
                }
            }
            if (cfg.extension.value.$ !== null)
                text += ' x' + cfg.extension.value.$;
            return text;
        };
    }])
})();