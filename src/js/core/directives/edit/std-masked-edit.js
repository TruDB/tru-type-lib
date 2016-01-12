(function(){
    'use strict';

    var module = angular.module('std.masked.edit', []);

    module.controller('stdMaskedEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {
            var self = this;

            self.init = function () {
                $scope.data = { value: $scope.field.value.$ };
            };

            $scope.onChange = function() {
                $scope.field.value.$ = $scope.data.value;
            };

            $scope.$watch('field.value.$', function () { self.init(); });
        }]);

    module.directive('stdMaskedEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-masked-edit.html'),
                    controller: 'stdMaskedEditController',
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();