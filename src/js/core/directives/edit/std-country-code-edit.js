(function(){
    'use strict';

    var module = angular.module('std.country.code.edit', []);

    module.directive('stdCountryCodeEdit',
        ['$templateCache', 'stdDisplay', 'stdCountries',
            function($templateCache, display, countries) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-country-code-edit.html'),
                    link: function(scope, element) {
                        var countryCode = scope.field.value.$ | 'us';

                        scope.countries = countries.allCountries;
                        scope.data = {
                            value: 0,
                            selectedCountry: _.find(countries, function(country) { return country.iso2 === countryCode }),
                            selectedCountryIso2: countryCode
                        };
                        scope.onChange = function(country) {
                            scope.data.selectedCountryIso2 = country.iso2;
                            scope.field.value.$ = country.iso2;
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();