(function(){
    'use strict';

    var module = angular.module('std.modals', []);

    module.directive('stdModals',
        ['$rootScope', 'stdModal',
            function($rootScope, modal) {
                return {
                    link: function (scope, element, attrs) {
                        scope.subview = null;

                        element.on(
                            "click",
                            function handleClickEvent(event) {
                                if (element[0] !== event.target) return;
                                scope.$apply(modal.reject);
                            }
                        );

                        $rootScope.$on(
                            "modal.open",
                            function handleModalOpenEvent(event, modalType) {
                                scope.subview = modalType;
                            }
                        );

                        $rootScope.$on(
                            "modal.close",
                            function handleModalCloseEvent(event) {
                                scope.subview = null;
                            }
                        );
                    }
                };
            }
        ]);
})();