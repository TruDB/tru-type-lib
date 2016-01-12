(function(){
    'use strict';

    var module = angular.module('std.textbox.edit', []);

    /**
     * @ngdoc directive
     * @name std.textbox.edit.directive:stdTextboxEdit
     * @restrict E
     *
     * @description
     * Modifies the default behavior of the html A tag so that the default action is prevented when
     * the href attribute is empty.
     *
     * This change permits the easy creation of action links with the `ngClick` directive
     * without changing the location or causing page reloads, e.g.:
     * `<a href="" ng-click="list.addItem()">Add Item</a>`
     */
    module.directive('stdTextboxEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-textbox-edit.html'),
                    link: function(scope, element) {
                        var oldValue;
                        var input = element[0].querySelectorAll('input')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid) {
                                $timeout(function() {
                                    input.select();
                                });
                            }
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