(function(){
    'use strict';

    var module = angular.module('std.intl.phone.edit', []);

    module.directive('stdIntlPhoneEdit',
        ['$templateCache', 'stdDisplay', 'stdCountries',
            function($templateCache, display, countries) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-phone-edit.html'),
                    link: function (scope, element) {

                        function updateValue() {
                            var country, dialCode;
                            if (scope.field.children.countryCode.value.$) {
                                country = _.find(countries.allCountries, function (country) { return country.iso2 === scope.field.children.countryCode.value.$ });
                                dialCode = country.dialCode;
                            } else {
                                country = _.find(countries.allCountries, function (country) {
                                    return country.iso2 === scope.field.property.countryCode;
                                });
                                dialCode = country.dialCode;
                            }
                            scope.countries = countries.allCountries;
                            scope.data = {
                                value: 0,
                                selectedCountry: country,
                                selectedCountryIso2: country.iso2,
                                dialCode: dialCode
                            };
                            scope.field.property.dialCode = country.dialCode;
                            scope.onCountryCodeChange = function (country) {
                                scope.field.children.countryCode.value.$ = country.iso2;
                                scope.field.property.dialCode = country.dialCode;
                                scope.field.children.phone.value.$ = undefined;
                            };
                        }

                        updateValue();

                        scope.$watch('field.children.phone.value.$', function () { updateValue() });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();