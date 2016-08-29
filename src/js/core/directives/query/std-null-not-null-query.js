(function(){
    'use strict';

    var module = angular.module('std.null.not.null.query', []);

    module.controller('stdNullNotNullController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

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
                    if (value) {
                        operator = 'ne';
                    } else {
                        operator = 'eq';
                    }
                    queryPredicate.set('', operator, null);
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.data = {
                choices: [],
                label: undefined
            };

            var loadChoices = function() {
                $scope.data.choices.push({label: 'Is Set', value: {$: 1}});
                $scope.data.choices.push({label: 'Is Not Set', value: {$: 0}});
                $scope.data.choices.unshift({label: '', value: {$: undefined}});

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

            $scope.operatorImage = operatorLookup['equal'].operatorImage;
            $scope.operatorImageMessage = operatorLookup['equal'].operatorImageMessage;

            if(ctrlValue === null) {
                $scope.data.label = 'Null';
                $scope.field.value.$ = null;
                $scope.updateQueryPredicate();
            }

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                loadChoices();
            };
        }]);

    module.directive('stdNullNotNullQuery',
        ['$templateCache', '$timeout',
            function ($templateCache, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-null-not-null-query.html'),
                    controller: 'stdNullNotNullController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        $timeout(function() {
                            var select = element[0].querySelectorAll('select')[0];

                            angular.element(select).bind('keydown', function (e) {
                                if (e.keyCode === 46) {
                                    scope.field.value.$ = undefined;
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