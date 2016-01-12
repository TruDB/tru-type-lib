(function () {
    'use strict';

    var module = angular.module('std.trap.focus', []);

    module.directive('stdTrapFocus',
        ['$window', '$document', '$timeout',
            function ($window, $document, $timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        var keyCode, shiftKey;
                        var blurListener = function (e) {
                            var elements = element[0].querySelectorAll('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled):not(.excluded)');
                            if (shiftKey && keyCode === 9) {
                                if (elements[0] === e.target) {
                                    e.preventDefault();
                                    elements[elements.length - 1].focus();
                                }
                            } else if (!shiftKey && keyCode === 9) {
                                if (elements[elements.length - 1] === e.target) {
                                    e.preventDefault();
                                    elements[0].focus();
                                }
                            }
                        };

                        var keydownListener = function (e) {
                            keyCode = e.keyCode;
                            shiftKey = e.shiftKey;
                        };

                        $document[0].addEventListener('blur', blurListener, true);
                        $document[0].addEventListener('keydown', keydownListener, true);

                        scope.$on('$destroy', function () {
                            $document[0].removeEventListener('blur', blurListener);
                            $document[0].removeEventListener('keydown', keydownListener);
                        });
                    }
                };
            }]);
})();