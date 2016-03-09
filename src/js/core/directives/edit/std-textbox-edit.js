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
                        var maxLength = scope.field.type.property.maxLength ? scope.field.type.property.maxLength : 0;

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid) {
                                //$timeout(function() {
                                    input.select();
                                //});
                            }
                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        angular.element(input).bind('paste', function (e) {
                            e.preventDefault();
                            var caretPos =  input.selectionStart;
                            var caretEnd = input.selectionEnd;
                            var txt = scope.field.value.$ ? scope.field.value.$ : '';
                            var result;

                            if (e.originalEvent.clipboardData)
                                result = (txt.substring(0, caretPos) + e.originalEvent.clipboardData.getData('text').split('\n').join('') + txt.substring(caretEnd)).substring(0, maxLength);
                            else
                                result = (txt.substring(0, caretPos) + window.clipboardData.getData('text').split('\n').join('') + txt.substring(caretEnd)).substring(0, maxLength);
                            scope.field.value.$ = result;
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();