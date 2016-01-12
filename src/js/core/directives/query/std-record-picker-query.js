(function () {
    'use strict';

    var module = angular.module('std.record.picker.query', []);

    module.directive('stdPickerView', ['$compile', '$http', function ($compile, $http) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {
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

    module.controller('stdRecordPickerQueryController',
        ['$scope', '$element', '$timeout', 'stdModal', 'stdOperatorLookup', 'stdUtil',
            function ($scope, $element, $timeout, modal, operatorLookup, util) {
                var self = this;

                var ctrlValue = $scope.field.property.value;
                var ctrlDefault = $scope.field.property.default;
                var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
                var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
                var operator = operatorLookup[$scope.field.property.operator].operator;

                var onClearCB = function(){
                    return function() {
                        if (ctrlValueHasValue) return;
                        $scope.field.value.$ = undefined;
                        $scope.data.displayValue = undefined;
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


                $scope.data = {
                    choices: [],
                    label: undefined
                };

                if(ctrlValue === null) {
                    $scope.data.label = 'Null';
                    $scope.field.value.$ = null;
                } else {
                    if (ctrlValueHasValue) {
                        $scope.field.queryByRef(ctrlValue).then(function (results) {
                            $scope.data.label = results.label;
                        });
                        $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                    } else if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                }

                $scope.init = function() {
                    $scope.searchGroupCtrl.registerClear(onClearCB);
                    $scope.searchGroupCtrl.registerDefault(onDefaultCB);
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
                                $scope.field.queryByRef(response).then(function (results) {
                                    $scope.data.displayValue = results.label;
                                    $scope.field.value.$ = response;
                                    $scope.updateQueryPredicate();
                                });
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

                $scope.updateQueryPredicate();
            }]);

    module.directive('stdRecordPickerQuery',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    controller: 'stdRecordPickerQueryController',
                    template: $templateCache.get('src/templates/query/std-record-picker-query.html'),
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();