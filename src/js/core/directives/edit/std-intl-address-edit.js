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
                            var stateProvinceTextLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[6]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[7]);
                            stateProvinceTextLabel.addClass('ttl-no-label-width');
                            stateProvinceLabel.addClass('ttl-no-label-width');
                            postalCodeLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);

                            scope.showStateProvinceText = true;

                            scope.$watch('field.children.country.value.$', function(newValue, oldValue) {
                                if (newValue === oldValue) return;
                                if (newValue === 236 || newValue === 39)
                                    scope.showStateProvinceText = false;
                                else
                                    scope.showStateProvinceText = true;
                            })
                        }
                    }
                };
            }
        ]);
})();