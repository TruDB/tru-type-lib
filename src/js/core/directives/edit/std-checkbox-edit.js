(function () {
    'use strict';

    var module = angular.module('std.checkbox.edit', []);

    module.directive('stdCheckboxEdit',
        ['$templateCache', 'stdDisplay', 'stdUtil',
            function ($templateCache, display, util) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: function(element) {
                        if (util.getClosestParentByClass(element[0], '.ui-grid-render-container')) {
                            return $templateCache.get('src/templates/list/std-checkbox-list-edit.html');
                        }
                        return $templateCache.get('src/templates/edit/std-checkbox-edit.html');
                    },
                    link: function (scope, element) {
                        var oldValue;
                        var input = element[0].querySelectorAll('input')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.isListContext)
                                input.select();
                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();