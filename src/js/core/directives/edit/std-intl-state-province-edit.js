(function(){
    'use strict';

    var module = angular.module('std.intl.state.province.edit', []);

    module.directive('stdIntlStateProvinceEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-address-edit.html'),
                    link: function(scope, element, attrs) {

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();