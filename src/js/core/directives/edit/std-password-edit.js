(function () {
    'use strict';

    var module = angular.module('std.password.edit', []);

    module.controller('stdPasswordModalController',
        ['$scope', '$element', '$timeout', '$document', 'stdModal',
            function ($scope, $element, $timeout, $document, modal) {
                var passwordInput, cancelButton;

                $timeout(function () {
                    var elements = $element[0].querySelectorAll('input,button');
                    passwordInput = elements[0];
                    cancelButton = elements[elements.length - 1];
                    if (passwordInput) {
                        passwordInput.focus();
                    }
                });

                function documentKeyDownFn(e) {
                    if (e.keyCode === 13 && $scope.formIsValid) {
                        modal.resolve($scope.data.password);
                    }
                    if (e.keyCode === 27) {
                        modal.reject();
                    }
                };

                function validate() {
                    $scope.errorMessage = '';
                    $scope.confirmErrorMessage = '';

                    if (!$scope.data.password)
                        $scope.errorMessage = 'Password is required.';

                    if (!$scope.data.confirmPassword)
                        $scope.confirmErrorMessage = 'Confirm password is required.';

                    if ($scope.data.password !== $scope.data.confirmPassword) {
                        if ($scope.errorMessage)
                            $scope.errorMessage += ' | Password and confirm password must match.';
                        else
                            $scope.errorMessage += 'Password and confirm password must match.';
                        if ($scope.confirmErrorMessage)
                            $scope.confirmErrorMessage += '| Password and confirm password must match.';
                        else
                            $scope.confirmErrorMessage += 'Password and confirm password must match.';
                    }

                    $scope.formIsValid = !($scope.errorMessage || $scope.confirmErrorMessage);
                }

                $scope.data = { password: '', confirmPassword: '' };

                $scope.onCancelClick = modal.reject;
                $scope.formIsValid = false;
                $scope.errorMessage = '';
                $scope.confirmErrorMessage = '';
                $scope.mouseOverPassword = false;
                $scope.mouseOverConfirmPassword = false;

                $scope.onOkKeyDown = function (e) {
                    if (e.keyCode === 13)
                        $scope.onOkClick();
                };

                $scope.onPasswordKeyDown = function (e) {
                    if (e.keyCode === 9 && e.shiftKey) {
                        e.preventDefault();
                        cancelButton.focus();
                    }
                };

                $scope.onCancelKeyDown = function (e) {
                    if (e.keyCode === 9 && !e.shiftKey) {
                        e.preventDefault();
                        passwordInput.focus();
                    }
                    if (e.keyCode === 13)
                        modal.reject();
                };

                $scope.onPasswordChange = function () {
                    validate();
                };

                $scope.onConfirmPasswordChange = function () {
                    validate();
                };

                $scope.onPasswordMouseEnter = function () {
                    $scope.mouseOverPassword = true;
                };

                $scope.onPasswordMouseLeave = function () {
                    $scope.mouseOverPassword = false;
                };

                $scope.onConfirmPasswordMouseEnter = function () {
                    $scope.mouseOverConfirmPassword = true;
                };

                $scope.onConfirmPasswordMouseLeave = function () {
                    $scope.mouseOverConfirmPassword = false;
                };

                $scope.onClearClick = function () {
                    modal.resolve(null);
                };

                $scope.onOkClick = function () {
                    modal.resolve($scope.data.password);
                };

                $scope.$on('$destroy', function () {
                    angular.element($document[0]).off('keydown', documentKeyDownFn);
                });

                angular.element($document[0]).on('keydown', documentKeyDownFn);
            }]);

    module.controller('stdPasswordEditController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                var self = this;

                self.openModal = function () {
                    var promise = modal.open(
                        'password',
                        {
                            message: ''
                        }
                    );
                    promise.then(
                        function handleResolve(response) {
                            $scope.field.value.$ = response;
                            self.focusedElement();
                        },
                        function handleReject(error) {
                            self.focusedElement();
                        }
                    );
                };

                self.focusedElement = function () {
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };

                self.init = function () {
                    $scope.setOrChange = $scope.field.value.$ ? 'Edit' : 'Set';
                };

                $scope.onPasswordButtonClick = function () {
                    self.openModal();
                };

                $scope.onPasswordButtonKeyDown = function (e) {
                    if (e.keyCode === 13)
                        self.openModal();
                };

                $scope.mouseOverPasswordButton = false;

                $scope.onMouseEnterPasswordButton = function () {
                    $scope.mouseOverPasswordButton = true;
                };

                $scope.onMouseLeavePasswordButton = function () {
                    $scope.mouseOverPasswordButton = false;
                };

                $scope.$watch('field.value.$', function () { self.init(); });
            }]);



    module.directive('stdPasswordEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdPasswordEditController',
                    require: ['^stdPasswordEdit'],
                    template: $templateCache.get('src/templates/edit/std-password-edit.html'),
                    link: function (scope, element, attrs, ctrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();