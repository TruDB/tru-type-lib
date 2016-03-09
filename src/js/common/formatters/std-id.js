(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdId', [function () {
        return function (cfg) {
            if (typeof cfg.recordId === 'function')
                return cfg.recordId();
            return cfg.value.$;
        };
    }])
})();