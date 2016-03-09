(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdIntlAddressBasic', ['dataService', function (dataService) {
        var dataContext = dataService.createContext();
        var queryRunning;
        return function (cfg) {
            cfg = cfg.children;
            var text = '';
            if (cfg.address1.value.$ !== null)
                text += cfg.address1.value.$ + ' ';
            if (cfg.address2.value.$ !== null)
                text += cfg.address2.value.$ + ' ';
            if (cfg.country.value.$ !== null)
                text += cfg.country.value.$ + ' ';
            if (cfg.city.value.$ !== null)
                text += cfg.city.value.$ + ' ';
            if (cfg.stateProvince.value.$ !== null)
                text += cfg.stateProvince.value.$ + ' ';
            if (cfg.postalCode.value.$ !== null)
                text += cfg.postalCode.value.$ + ' ';

            return text;
        };
    }])
})();