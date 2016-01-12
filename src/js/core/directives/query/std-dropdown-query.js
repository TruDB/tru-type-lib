(function(){
    'use strict';

    var module = angular.module('std.dropdown.query', []);

    module.controller('stdDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;
            var unregOnChoicesChange = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                if (typeof value !== 'undefined') {
                    queryPredicate.set('', operator, value);
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.data = {
                choices: [],
                label: undefined
            };

            var loadChoices = function(choices) {
                if (choices == null) return;
                $scope.data.choices = angular.copy(choices);

                $scope.data.choices.unshift({label: '', value: {$: undefined}});

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({label: 'Null', value: {$: 'null'}});
                }

                if (ctrlValueHasValue) {
                    $scope.data.label = $scope.data.choices.filter(function (obj) {
                        return obj.value.$ === ctrlValue;
                    })[0].label;
                    $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                } else if (ctrlDefaultHasValue)
                    $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                else
                    $scope.field.value.$ = undefined;

                $scope.updateQueryPredicate();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            if(ctrlValue === null) {
                $scope.data.label = 'Null';
                $scope.field.value.$ = null;
                $scope.updateQueryPredicate();
            } else {
                unregOnChoicesChange = $scope.field.onChoicesChanged(loadChoices);
            }

            $scope.$on("$destroy", function () {
                unregOnChoicesChange();
            });

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            };
        }]);

    module.directive('stdDropdownQuery',
        ['$templateCache', '$timeout',
            function ($templateCache, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-dropdown-query.html'),
                    controller: 'stdDropdownQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        $timeout(function() {
                            var select = element[0].querySelectorAll('select')[0];

                            angular.element(select).bind('keydown', function (e) {
                                if (e.keyCode === 46) {
                                    if (scope.field.type.isNullable) {
                                        scope.field.value.$ = 'null';
                                    } else {
                                        scope.field.value.$ = undefined;
                                    }
                                }
                                scope.updateQueryPredicate();
                            });
                        });

                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();