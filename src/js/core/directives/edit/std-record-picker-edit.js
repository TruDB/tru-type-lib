(function () {
    'use strict';

    var module = angular.module('std.record.picker.edit', []);

    module.directive('stdPickerView', ['$compile', '$http', function ($compile, $http) {
        return {
            restrict: 'A',
            replace: false,
            terminal: true,
            priority: 1000,
            link: function (scope, element, attrs, ctrls, transclude) {
                var tpl = $compile('<div ' + scope.field.property.pickerName + '-picker' + ' field="field" view="view"></div>')(scope);
                element.append(tpl);
            }
        };
    }]);

    module.controller('stdRecordPickerModalController',
        ['$scope', '$element', '$timeout', '$document', 'stdModal',
            function ($scope, $element, $timeout, $document, modal) {
                var keydownListener = function (e) {
                    if (e.keyCode === 27) {
                        $timeout(function () { modal.reject() });
                    }
                };

                $scope.modal = {
                    height:400,
                    width:700
                };

                $scope.selectedId = 0;
                $scope.childSearchIsFocused = true;

                $scope.clear = function () {
                    $timeout(function () { modal.resolve(null) });
                };

                $scope.onClearKeydown = function (e) {
                    if (e.keyCode === 13) {
                        $timeout(function () { modal.resolve(null) });
                    }
                };

                $scope.cancel = function (e) {
                    if (e.keyCode === 13) { e.preventDefault(); return false; }
                    $timeout(function () { modal.reject() });
                };


                $scope.submit = function (id) {
                    if (id)
                        $scope.selectedId = id;
                    $timeout(function () { modal.resolve($scope.selectedId) });
                };

                $scope.$on('$destroy', function () {
                    $document[0].removeEventListener('keydown', keydownListener);
                });

                $document[0].addEventListener('keydown', keydownListener, true);
            }]);

    module.controller('stdRecordPickerEditController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                var self = this;

                self.init = function () {
                    $scope.data = { displayValue: 'Loading...' };
                    $scope.data.show = false;
                    if ($scope.field.value.$) {
                        $scope.field.queryByRef($scope.field.value.$).then(function (results) {
                            $scope.data.displayValue = results.label;
                            $scope.data.show = true;
                        });
                    } else {
                        $scope.data.displayValue = '';
                    }
                };

                self.cleanUp = function () {
                    $scope.open = false;
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };


                self.showRecordPickerModal = function () {
                    $scope.open = true;
                    $timeout(function () {
                        var promise = modal.open(
                            'recordPicker'
                        );
                        promise.then(
                            function handleResolve(response) {
                                $scope.field.value.$ = response;
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                    $scope.$destroy();
                                } else {
                                    self.cleanUp();
                                }
                            },
                            function handleReject(error) {
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                } else {
                                    self.cleanUp();
                                }
                            }
                        );
                    });
                };

                if ($scope.field.context.isGrid) {
                    self.showRecordPickerModal();
                }

                $scope.onClick = function () {
                    if (!$scope.open)
                        self.showRecordPickerModal();
                };

                $scope.onKeydown = function (e) {
                    if (!$scope.open && e.keyCode === 13)
                        self.showRecordPickerModal();
                };

                $scope.showArrow = false;
                $scope.onInputMousedown = function () {
                    if ($scope.showArrow) return;
                    $scope.showArrow = true;
                    $timeout(function () {
                        $scope.showArrow = false;
                    }, 5000);
                };

                $scope.$watch('field.value.$', function () { self.init(); });
            }]);

    module.directive('stdRecordPickerEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdRecordPickerEditController',
                    template: $templateCache.get('src/templates/edit/std-record-picker-edit.html'),
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();