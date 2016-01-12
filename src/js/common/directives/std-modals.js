(function(){
    'use strict';

    var module = angular.module('std.modals', []);

    module.directive('stdModals',
        ['$rootScope', 'stdModal',
            function($rootScope, modal) {
                return {
                    link: function (scope, element, attrs) {
                        scope.subview = null;

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