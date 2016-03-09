(function(){
    'use strict';

    var module = angular.module('std.intl.address.basic.edit', []);

    module.directive('stdIntlAddressBasicEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-address-basic-edit.html'),
                    link: {
                        //pre: function (scope, element) {
                        //    scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                        //    scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        //},
                        post: function(scope, element) {
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateProvinceLabel.addClass('ttl-no-label-width');
                            postalCodeLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();