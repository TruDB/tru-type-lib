(function () {
    'use strict';

    var module = angular.module('std.record.picker.edit', []);

    module.directive('stdPickerView', ['$compile', '$http', function ($compile, $http) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {
                var tpl = $compile('<div ' + scope.field.property.pickerName + '-picker' +' field="field" view="view"></div>')(scope);
                element.append(tpl);
            }
        };
    }]);

    module.controller('stdRecordPickerModalController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                $scope.selectedId = 0;
                $scope.searchIsFocused = true;

                $scope.clear = function() {
                    modal.resolve(null);
                };

                $scope.cancel = function(e) {
                    if (e.keyCode === 13) { e.preventDefault(); return false; }
                    modal.reject();
                };


                $scope.submit = function(id) {
                    if (id)
                        $scope.selectedId = id;
                    modal.resolve($scope.selectedId);
                };
            }]);

    module.controller('stdRecordPickerEditController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                var self = this;

                self.init = function () {
                    $scope.data = { displayValue: 'Loading...' };
                    $scope.data.show = false;
                    if ($scope.field.value.$) {
                        $scope.field.queryByRef($scope.field.value.$).then(function(results) {
                            $scope.data.displayValue = results.label;
                            $scope.data.show = true;
                        });
                    } else {
                        $scope.data.displayValue = '';
                    }
                };

                self.focusElement = function () {
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };


                $scope.showRecordPickerModal = function () {
                    var promise = modal.open(
                        'recordPicker'
                    );
                    promise.then(
                        function handleResolve(response) {
                            $scope.field.value.$ = response;
                            self.focusElement();
                        },
                        function handleReject(error) {
                            self.focusElement();
                        }
                    );
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