(function(){
    'use strict';

    var module = angular.module('std.time.edit', []);

    module.controller('stdTimeEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {

        }]);

    module.directive('stdTimeEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdTimeEditController',
                    template: $templateCache.get('src/templates/edit/std-time-edit.html'),
                    link: function(scope, element, attrs) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();