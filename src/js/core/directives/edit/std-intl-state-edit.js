(function(){
    'use strict';

    var module = angular.module('std.intl.state.edit', []);

    module.controller('stdIntlStateEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {
            var self = this;
            self.unregOnChoicesChange = undefined;
            self.select = $element[0].querySelectorAll('select')[0];

            $scope.data = {};

            self.updateData = function() {
                if ($scope.choices.length > 0) {

                    if ($scope.field.stateProvince.type.isNullable) {
                        var emptyItemExists = _.find($scope.choices, function (choice) { return choice.label === ' ' });
                        if (!emptyItemExists)
                            $scope.choices.unshift({ label: ' ', value: { $: -1 } });
                    }

                    if ($scope.field.stateProvince.value.$)
                        $scope.data.value = $scope.field.value.$;

                    if ($scope.field.stateProvince.type.isNullable && !$scope.field.stateProvince.value.$)
                        $scope.data.value = $scope.choices[0].value.$;
                }

                $scope.data.show = true;

                if ($scope.field.stateProvince.context.isGrid) {
                    $timeout(function () {
                        var select = $element[0].querySelectorAll('select')[0];
                        select.focus();
                    });
                }

                $scope.filteredChoices = _.filter($scope.choices, function (choice) {
                    choice.stdIntlCountryRef === $scope.field.country.value.$;
                });
            };

            self.checkForInactiveValues = function(choices) {
                var itemFound = _.find(choices, function (obj) { return obj.value.$ === $scope.field.stateProvince.value.$ });

                if (!itemFound && $scope.field.stateProvince.value.$) {
                    if ($scope.field.stateProvince.queryByRef) {
                        $scope.field.stateProvince.queryByRef($scope.field.StateProvince.value.$).then(function (result) {
                            if (result) {
                                choices.push({
                                    label: result.label,
                                    value: {$: $scope.field.stateProvince.value.$},
                                    notAnOption: true
                                });
                            }

                            $scope.choices = choices;
                            self.updateData();
                            self.updateOptions();
                        });
                    } else {
                        $scope.choices = choices;
                        self.updateData();
                        self.updateOptions();
                    }
                } else {
                    $scope.choices = choices;
                    self.updateData();
                    self.updateOptions();
                }
            };

            self.loadChoices = function(choices) {
                if (choices == null) {
                    $scope.data.show = false;
                } else {
                    choices = choices.slice();
                    self.checkForInactiveValues(choices);
                }
            };

            self.updateValue = function () {
                $scope.data.value = undefined;
                if ($scope.choices && $scope.choices.length) {
                    $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });
                    self.checkForInactiveValues($scope.choices);
                }
            };

            self.updateOptions = function () {
                $timeout(function() {
                    var select = $element[0].querySelectorAll('select')[0];
                    angular.element(select).removeClass('not-an-option');
                    angular.forEach($scope.choices, function (choice, index) {
                        var option = select.querySelectorAll('option:not([value="?"])')[index];
                        angular.element(option).removeClass('not-an-option');
                        if (choice.notAnOption) {
                            angular.element(option).addClass('not-an-option');
                            angular.element(select).addClass('not-an-option');
                        } else {
                            angular.element(option).addClass('an-option');
                        }
                    });
                });

            };

            self.unregOnChoicesChange = $scope.field.stateProvince.onChoicesChanged(self.loadChoices);

            $scope.onChange = function () {

                $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });

                if ($scope.data.value === -1)
                    $scope.field.stateProvince.value.$ = null;
                else
                    $scope.field.stateProvince.value.$ = $scope.data.value;
            };

            $scope.$watch('field.country.value.$', function(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue === 236 || newValue === 39) {
                    self.updateData();
                }
            });

            $scope.$watch('field.stateProvince.value.$', function () { self.updateValue() });

            $scope.$on("$destroy", function () {
                self.unregOnChoicesChange();
            });
        }]);

    module.directive('stdIntlStateEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-state-edit.html'),
                    controller: 'stdIntlStateEditController',
                    link: function(scope, element, attrs) {
                        var oldValue;
                        var select = element[0].querySelectorAll('select')[0];
                        var button = element[0].querySelectorAll('button')[0];

                        angular.element(select).bind('focus', function (e) {
                            oldValue = scope.field.stateProvince.value.$;

                            //CHROME/SAFARI ONLY: Opens dropdown on focus
                            if (scope.field.stateProvince.context.isGrid) {
                                $timeout(function() {
                                    var event = document.createEvent('MouseEvents');
                                    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                    select.dispatchEvent(event);
                                });
                            }
                        });

                        angular.element(select).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.stateProvince.value.$ = oldValue;
                                select.blur();
                            }
                            if (e.keyCode === 46) {
                                scope.data.value === -1
                                scope.field.stateProvince.value.$ = null;
                            }
                        });

                        angular.element(button).bind('keydown', function (e) {
                            if(e.keyCode === 13){
                                e.preventDefault();
                            }
                        });

                        display.setVisibility(element, scope.field.stateProvince.type.canDisplay);
                    }
                };
            }
        ]);
})();