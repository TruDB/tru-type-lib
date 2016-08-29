(function(){
    'use strict';

    var module = angular.module('std.modal', []);

    module.service('stdModal',
        ['$rootScope', '$q',
            function($rootScope, $q) {
                var modal = {
                    deferred: null,
                    params: null
                };

                return({
                    open: open,
                    params: params,
                    proceedTo: proceedTo,
                    reject: reject,
                    resolve: resolve
                });

                function open(type, params, pipeResponse) {
                    var previousDeferred = modal.deferred;
                    modal.deferred = $q.defer();
                    modal.params = params;

                    if (previousDeferred && pipeResponse) {
                        modal.deferred.promise.then(previousDeferred.resolve, previousDeferred.reject);
                    } else if (previousDeferred) {
                        previousDeferred.reject();
                    }

                    return(modal.deferred.promise);
                }

                function params() {
                    return(modal.params || {});
                }

                function proceedTo(type, params) {
                    return(open(type, params, true));
                }

                function reject(reason) {
                    if (!modal.deferred) return;

                    modal.deferred.reject(reason);
                    modal.deferred = modal.params = null;

                    $rootScope.$emit('modal.close');
                }

                function resolve(response) {
                    if (!modal.deferred) return;

                    modal.deferred.resolve(response);
                    modal.deferred = modal.params = null;

                    $rootScope.$emit('modal.close');
                }
            }
        ]);
})();