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
                    template: function (element) {
                        if (util.getClosestParentByClass(element[0], '.ui-grid-render-container')) {
                            return $templateCache.get('src/templates/list/std-checkbox-list-edit.html');
                        }
                        return $templateCache.get('src/templates/edit/std-checkbox-edit.html');
                    },
                    link: function (scope, element) {
                        var ctrlDefault = scope.field.property.default;
                        var isNullable = scope.field.type.isNullable;

                        var oldValue;
                        var input = element[0].querySelectorAll('input')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid) {
                                input.select();
                            }

                            if (scope.field.context.isGrid) {
                                scope.$apply(function () {
                                    scope.field.value.$ = !scope.field.value.$;
                                });
                            }

                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        scope.$watch('field.value.$', function () {
                            if (!isNullable && scope.field.value.$ === null)
                                input.indeterminate = true;
                            else
                                input.indeterminate = false;
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();