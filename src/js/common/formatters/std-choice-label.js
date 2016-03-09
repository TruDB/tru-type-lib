(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdChoiceLabel', [
        function() {
            return function(cfg) {
                if (cfg.value.$ === null)
                    return null;
                if (cfg.type) {
                    var item = cfg.type.choices.filter(function (c) {
                        return c.value.$ === cfg.value.$;
                    });
                } else {
                    return cfg.value.$
                }

                if (item.length == 0)
                    return null;
                return item[0].label;
            };
        }
    ]);
})();