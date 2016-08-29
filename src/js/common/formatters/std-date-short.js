(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDateShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null || typeof v === 'undefined')
                        return null;
                    var utc = new Date(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate());
                    return stdFilter.formatDate(utc, 'MM/dd/yyyy');
                };
            }])
})();