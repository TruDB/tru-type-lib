(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaAddress', [
        'dataService', '$q', function(dataService, $q) {
            var dataContext = dataService.createContext();
            var queryRunning = false;
            var deferreds = [];
            function filter(cfg) {
                var deferred = $q.defer();
                var data = {
                    deferred: deferred,
                    cfg: cfg.children

                };
                deferreds.push(data);
                cfg = cfg.children;

                var text = "Loading...";

                function buildText() {
                    text = '';
                    if (cfg.address1.value.$ !== null)
                        text += cfg.address1.value.$ + ' ';
                    if (cfg.address2.value.$ !== null)
                        text += cfg.address2.value.$ + ' ';
                    if (cfg.city.value.$ !== null)
                        text += cfg.city.value.$ + ' ';
                    if (cfg.state.value.$ !== null) {
                        var state = dataContext.entityAccess('StdUSAState').findInCache(cfg.state.value.$);
                        if (state)
                            text += state.Code + ', ';
                    }
                    if (cfg.zip.value.$ !== null) {
                        if (cfg.zip.value.$.length > 5)
                            text += cfg.zip.value.$.substring(0, 5) + '-' + cfg.zip.value.$.substring(5);
                        else
                            text += cfg.zip.value.$;
                    }
                    return text;
                }

                if (dataContext.entityAccess('StdUSAState').findInCache(cfg.state.value.$)) {
                    return buildText();
                } else {
                    if (queryRunning === false) {
                        queryRunning = true;
                        dataContext.entityAccess('StdUSAState').search()
                            .then(function(entity) {
                                for (var i = 0; i < deferreds.length; i++) {
                                    cfg = deferreds[i].cfg;
                                    deferreds[i].deferred.resolve(buildText());
                                }
                            })
                            .finally(function() {
                                queryRunning = false;
                            });
                    }
                }

                return deferred.promise;
            };
            return filter;
        }
    ]);
})();