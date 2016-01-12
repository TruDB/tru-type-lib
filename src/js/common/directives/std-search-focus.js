(function () {
    'use strict';

    var module = angular.module('std.search.focus', []);

    module.directive('stdSearchFocus',
        ['$document',
            function ($document) {
                return {
                    scope: {
                        stdSearchFocus: '='
                    },
                    link: function (scope, element, attrs) {
                        document.addEventListener('focus', function (e) {
                            //NOTE: Firefox does not support e.target
                            var target = e.target || e.srcElement;
                            scope.stdSearchFocus(isDescendant(element[0], target) || (target.tagName && target.tagName.toLowerCase() === 'body'));
                        }, true);

                        function isDescendant(parent, child) {
                            var node = child.parentNode;
                            while (node != null) {
                                if (node == parent) {
                                    return true;
                                }
                                node = node.parentNode;
                            }
                            return false;
                        }
                    }
                };
            }]);
})();