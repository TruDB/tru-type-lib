(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeShort',
        ['$filter',
            function ($filter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    if (v === null)
                        return null;

                    var duration = moment.duration(v)._data;

                    var datetime = new Date('01/01/1999 ' + duration.hours + ':' + duration.minutes + ':' + duration.seconds);
                    return $filter('date')(datetime, 'hh:mm a');
                };
            }])
})();