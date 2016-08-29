(function () {
    'use strict';

    var module = angular.module('std.intl.address.query', []);

    module.controller('stdIntlAddressQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdIntlAddressQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-intl-address-query.html'),
                    controller: 'stdIntlAddressQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.address1.property.operator = 'contains';
                            scope.field.children.address2.property.operator = 'contains';
                            scope.field.children.country.property.operator = 'contains';
                            scope.field.children.city.property.operator = 'contains';
                            scope.field.children.stateProvince.property.operator = 'contains';
                            scope.field.children.postalCode.property.operator = 'contains';
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            //var stateProvinceTextLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[6]);
                            //stateProvinceTextLabel.addClass('ttl-no-label-width');
                            stateProvinceLabel.addClass('ttl-no-label-width');
                            postalCodeLabel.addClass('ttl-no-label-width');

                            var onPredicateCB = function () {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var address1 = scope.field.children.address1.value.$;
                                    if (typeof address1 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address1', 'contains', address1));

                                    var address2 = scope.field.children.address2.value.$;
                                    if (typeof address2 !== 'undefined')
                                        predicates.push(queryPredicate.create('Address2', 'contains', address2));

                                    var country = scope.field.children.country.value.$;
                                    if (typeof country !== 'undefined')
                                        predicates.push(queryPredicate.create('CountryStdIntlCountryRef', 'eq', country));

                                    var city = scope.field.children.city.value.$;
                                    if (typeof city !== 'undefined')
                                        predicates.push(queryPredicate.create('City', 'contains', city));

                                    var stateProvince = scope.field.children.stateProvince.value.$;
                                    if (typeof stateProvince !== 'undefined')
                                        predicates.push(queryPredicate.create('StateProvinceStdIntlStateRef', 'eq', stateProvince));

                                    var postalCode = scope.field.children.postalCode.value.$;
                                    if (typeof postalCode !== 'undefined')
                                        predicates.push(queryPredicate.create('PostalCode', 'contains', postalCode));

                                    if (predicates.length) {
                                        var predicate = undefined;
                                        for (var i = 0; i < predicates.length; i++) {
                                            if (i === 0) {
                                                predicate = predicates[i];
                                            } else {
                                                predicate = predicate.and(predicates[i]);
                                            }
                                        }
                                        queryPredicate.set(predicate);
                                    } else
                                        queryPredicate.clear();
                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();