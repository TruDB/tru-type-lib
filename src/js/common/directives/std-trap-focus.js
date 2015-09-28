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
                        var focusListener = function (e) {
                            if (!element[0].contains(e.target)) {
                                var elements = element[0].querySelectorAll('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled)');
                                if (shiftKey && keyCode === 9)
                                    elements[elements.length - 1].focus();
                                else
                                    elements[0].focus();
                            }
                        };

                        var keydownListener = function (e) {
                            keyCode = e.keyCode;
                            shiftKey = e.shiftKey;
                        };

                        $document[0].addEventListener('focus', focusListener, true);
                        $document[0].addEventListener('keydown', keydownListener, true);

                        scope.$on('$destroy', function() {
                            $document[0].removeEventListener('focus', focusListener);
                            $document[0].removeEventListener('keydown', keydownListener);
                        });
                    }
                };
            }]);
})();