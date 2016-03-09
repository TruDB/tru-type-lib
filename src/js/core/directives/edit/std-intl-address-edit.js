(function(){
    'use strict';

    var module = angular.module('std.intl.address.edit', []);

    module.directive('stdIntlAddressEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-address-edit.html'),
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

                            scope.showStateProvinceText = true;

                            scope.$watch('scope.field.children.country', function(newValue, oldValue) {
                                if (newValue === oldValue) return;
                                if (newValue === 'USA' || newValue === 'CAD')
                                    scope.showStateProvinceText = false;
                                else
                                    scope.showStateProvinceText = true;

                                scope.field.children.stateProvince = undefined;
                            })
                        }
                    }
                };
            }
        ]);
})();