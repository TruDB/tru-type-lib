(function(){
    'use strict';

    var module = angular.module('std.multiline.edit', []);

    module.directive('stdMultilineEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-multiline-edit.html'),
                    link: function(scope, element) {
                        var oldValue;
                        var input = element[0].querySelectorAll('textarea')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid)
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