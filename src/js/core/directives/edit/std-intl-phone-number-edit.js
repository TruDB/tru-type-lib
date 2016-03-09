(function(){
    'use strict';

    var module = angular.module('std.intl.phone.number.edit', []);

    module.directive('stdIntlPhoneNumberEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-phone-number-edit.html'),
                    link: function(scope, element) {
                        scope.data = {
                          dialCode: 1
                        };
                        scope.$watch('field.countryCode.value.$', function() {

                        });

                        display.setVisibility(element, scope.field.phone.type.canDisplay);
                    }
                };
            }
        ]);
})();