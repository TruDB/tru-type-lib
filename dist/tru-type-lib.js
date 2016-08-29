var app = angular.module('tru.type.lib',
    [
        //Edit Controls
        'std.adorner.edit',
        'std.checkbox.edit',
        'std.date.edit',
        'std.datetime.edit',
        'std.datetime.span.edit',
        'std.decimal.edit',
        'std.time.edit',
        'std.dropdown.edit',
        'std.file.edit',
        'std.float.edit',
        'std.integer.edit',
        'std.link.edit',
        'std.masked.edit',
        'std.multiline.edit',
        'std.password.edit',
        'std.percent.edit',
        'std.text.edit',
        'std.textbox.edit',
        'std.intl.address.basic.edit',
        'std.intl.address.edit',
        'std.intl.phone.number.edit',
        'std.na.phone.edit',
        'std.usa.address.edit',
        'std.usa.address.zip.9.edit',
        'std.usa.dollar.edit',
        'std.usa.zip.5.edit',
        'std.usa.zip.9.edit',
        'std.record.picker.edit',
        'std.intl.phone.edit',
        'std.intl.state.edit',
        'std.country.code.edit',

        //Search Controls
        'std.checkbox.query',
        'std.date.query',
        'std.date.span.query',
        'std.date.range.query',
        'std.datetime.query',
        'std.datetime.range.query',
        'std.decimal.query',
        'std.dropdown.query',
        'std.float.query',
        'std.integer.query',
        'std.integer.range.query',
        'std.or.list.checkbox.query',
        'std.radio.list.button.query',
        'std.textbox.query',
        'std.intl.address.basic.query',
        'std.intl.address.query',
        'std.usa.address.query',
        'std.usa.dollar.query',
        'std.boolean.dropdown.query',
        'std.record.picker.query',
        'std.null.not.null.query',

        //List Controls
        'std.checkbox.list',
        'std.text.list',

        //Formatters
        'std.formatters',

        'std.trap.focus',
        'std.grid.focus',
        'std.search.focus',
        'std.resizable',

        //Services
        'std.date',
        'std.time',
        'std.datetime',
        'std.calendar',
        'std.display',
        'std.decimal',
        'std.duration',
        'std.integer.only',
        'std.number.only',
        'std.mask',
        'std.max',
        'std.file.change',
        'std.file.reader',
        'std.operator.lookup',
        'std.indeterminate',
        'std.util',
        'std.download',
        'std.float',
        'std.usa.dollar',
        'std.select.value.converter',
        'std.filter',
        'std.percent',
        'std.modal',
        'std.zip',
        'std.na.phone',
        'std.countries',
        'std.intl.phone',
    ]);
(function () {
    'use strict';

    var module = angular.module('std.formatters', []);

})();
(function () {
    'use strict';

    var module = angular.module('std.adorner.edit', []);

    module.controller('stdAdornerEditController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdAdornerEdit',
        ['$templateCache', '$compile', '$timeout', 'stdUtil',
            function ($templateCache, $compile, $timeout, stdUtil) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-adorner-edit.html'),
                    controller: 'stdAdornerEditController',
                    link: function (scope, element) {
                        var grid = stdUtil.getClosestParentByClass(element[0], '.ui-grid-render-container');
                        var cell = element.parent().parent();
                        var cellContent = element.parent();

                        scope.onFocus = function () {
                            cell.css('overflow', 'visible');
                            cellContent.css('overflow', 'visible');
                            var html = '<div class="ttl-adorner" style="position:relative;overflow:" tru-focus-first focus="true" tru-label-container><div style="position:absolute;z-index:1000;top:0;left:0;background:#fff;border:1px lightgray solid;width:inherit;padding:5px;"><std-usa-address-edit field="field"></std-usa-address-edit></div></div>';
                            element.html(html);
                            $compile(element.contents())(scope);

                            var inputs = element[0].querySelectorAll('input,select,textarea');
                            var lastInput = inputs[inputs.length - 1];
                            lastInput.onkeydown = function (e) {
                                e = e || window.event;
                                if (e.keyCode == 9) {
                                    grid.focus();
                                    cell.css('overflow', 'hidden');
                                    cellContent.css('overflow', 'hidden');
                                    element.remove();
                                }
                            }
                        }
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.checkbox.edit', []);

    module.directive('stdCheckboxEdit',
        ['$templateCache', 'stdDisplay', 'stdUtil',
            function ($templateCache, display, util) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: function (element) {
                        if (util.getClosestParentByClass(element[0], '.ui-grid-render-container')) {
                            return $templateCache.get('src/templates/list/std-checkbox-list-edit.html');
                        }
                        return $templateCache.get('src/templates/edit/std-checkbox-edit.html');
                    },
                    link: function (scope, element) {
                        var ctrlDefault = scope.field.property.default;
                        var isNullable = scope.field.type.isNullable;

                        var oldValue;
                        var input = element[0].querySelectorAll('input')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid) {
                                input.select();
                            }

                            if (scope.field.context.isGrid) {
                                scope.$apply(function () {
                                    scope.field.value.$ = !scope.field.value.$;
                                });
                            }

                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        scope.$watch('field.value.$', function () {
                            if (!isNullable && scope.field.value.$ === null)
                                input.indeterminate = true;
                            else
                                input.indeterminate = false;
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.country.code.edit', []);

    module.directive('stdCountryCodeEdit',
        ['$templateCache', 'stdDisplay', 'stdCountries',
            function($templateCache, display, countries) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-country-code-edit.html'),
                    link: function(scope, element) {
                        var countryCode = scope.field.value.$ | 'us';

                        scope.countries = countries.allCountries;
                        scope.data = {
                            value: 0,
                            selectedCountry: _.find(countries, function(country) { return country.iso2 === countryCode }),
                            selectedCountryIso2: countryCode
                        };
                        scope.onChange = function(country) {
                            scope.data.selectedCountryIso2 = country.iso2;
                            scope.field.value.$ = country.iso2;
                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.edit', []);

    module.directive('stdDateEdit',
        ['$templateCache', '$timeout', '$document', 'stdDisplay',
            function($templateCache, $timeout, $document, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-date-edit.html'),
                    link: function(scope, element, attrs) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime.edit', []);

    module.controller('stdDatetimeEditController', ['$scope',
        function ($scope) {
            $scope.setPeriod = function() {
                $scope.field.property.period = $scope.field.property.period === 'AM' ? 'PM' : 'AM';
            };
        }]);

    module.directive('stdDatetimeEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-edit.html'),
                    controller: 'stdDatetimeEditController',
                    link: function (scope, element) {
                        var input = element[0].querySelectorAll('input')[0];
                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 46) {
                                scope.field.value.$ = null;
                            }
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime.span.edit', []);

    module.controller('stdDatetimeSpanEditController', ['$scope', '$timeout', '$element',
        function ($scope, $timeout, $element) {

        }]);

    module.directive('stdDatetimeSpanEdit',
        ['$templateCache', '$timeout', '$filter', 'stdDisplay',
            function ($templateCache, $timeout, $filter, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-datetime-span-edit.html'),
                    controller: 'stdDatetimeSpanEditController',
                    link: function (scope, element) {
                        var elms = [].slice.call(element[0].querySelectorAll('input'), 0);

                        var controllers = elms.map(function (el) {
                            return angular.element(el).controller('ngModel');
                        });

                        function getDateParts(val) {
                            var dateParts = val.split(/[\s/:]+/);
                            dateParts = dateParts.slice(0, 3);
                            return dateParts.join('');
                        }

                        function getTimeParts(val) {
                            var dateParts = val.split(/[\s/:]+/);
                            var period = dateParts[5];
                            dateParts = dateParts.slice(3, 5);
                            var hours = parseInt(dateParts[0]);
                            var minutes = dateParts[1];

                            if (period === 'AM' && hours === 12) {
                                hours = 0;
                            } else if (period === 'PM' && hours < 12) {
                                hours += 12;
                            }

                            return hours.toString() + minutes;
                        }

                        elms[0].addEventListener('blur', function (event) {
                            var startValue = angular.copy(scope.field.children.start.value.$);
                            var endValue = angular.copy(scope.field.children.end.value.$);
                            if (endValue && endValue instanceof Date && startValue && startValue instanceof Date) {
                                var startDate = parseInt(getDateParts(elms[0].value));
                                var startTime = parseInt(getTimeParts(elms[0].value));
                                var endDate = parseInt(getDateParts(elms[1].value));
                                var endTime = parseInt(getTimeParts(elms[1].value));
                                if (startDate > endDate && startTime > endTime) {
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                } else if (startDate > endDate && startTime <= endTime) {
                                    startValue.setHours(endValue.getHours());
                                    startValue.setMinutes(endValue.getMinutes());
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                } else if (startDate === endDate && startTime > endTime) {
                                    startValue.setFullYear(endValue.getFullYear());
                                    startValue.setMonth(endValue.getMonth());
                                    startValue.setDate(endValue.getDate());
                                    controllers[1].$setViewValue($filter('date')(startValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[1].$render();
                                }
                            }
                        }, true);

                        elms[1].addEventListener('blur', function (event) {
                            var endValue = angular.copy(scope.field.children.end.value.$);
                            var startValue = angular.copy(scope.field.children.start.value.$);
                            if (startValue && startValue instanceof Date && endValue && endValue instanceof Date) {
                                var startDate = parseInt(getDateParts(elms[0].value));
                                var startTime = parseInt(getTimeParts(elms[0].value));
                                var endDate = parseInt(getDateParts(elms[1].value));
                                var endTime = parseInt(getTimeParts(elms[1].value));
                                if (startDate > endDate && startTime > endTime) {
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                } else if (startDate > endDate && startTime <= endTime) {
                                    endValue.setHours(startValue.getHours());
                                    endValue.setMinutes(startValue.getMinutes());
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                } else if (startDate === endDate && startTime > endTime) {
                                    endValue.setFullYear(startValue.getFullYear());
                                    endValue.setMonth(startValue.getMonth());
                                    endValue.setDate(startValue.getDate());
                                    controllers[0].$setViewValue($filter('date')(endValue, 'MM/dd/yyyy hh:mm a'));
                                    controllers[0].$render();
                                }
                            }
                        }, true);

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.decimal.edit', []);

    module.directive('stdDecimalEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-decimal-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.dropdown.edit', []);

    module.controller('stdDropdownEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {
            var self = this;
            self.unregOnChoicesChange = undefined;
            self.select = $element[0].querySelectorAll('select')[0];

            $scope.data = {};

            self.updateData = function() {
                if ($scope.choices.length > 0) {

                    if ($scope.field.type.isNullable) {
                        var emptyItemExists = _.find($scope.choices, function (choice) { return choice.label === ' ' });
                        if (!emptyItemExists)
                            $scope.choices.unshift({ label: ' ', value: { $: -1 } });
                    }

                    if ($scope.field.value.$)
                        $scope.data.value = $scope.field.value.$;

                    if ($scope.field.type.isNullable && !$scope.field.value.$)
                        $scope.data.value = $scope.choices[0].value.$;
                }

                $scope.data.show = true;

                if ($scope.field.context.isGrid) {
                    $timeout(function () {
                        var select = $element[0].querySelectorAll('select')[0];
                        select.focus();
                    });
                }
            }

            self.checkForInactiveValues = function(choices) {
                var itemFound = _.find(choices, function (obj) { return obj.value.$ === $scope.field.value.$ });

                if (!itemFound && $scope.field.value.$) {
                    if ($scope.field.queryByRef) {
                        $scope.field.queryByRef($scope.field.value.$).then(function (result) {
                            if (result) {
                                choices.push({
                                    label: result.label,
                                    value: {$: $scope.field.value.$},
                                    notAnOption: true
                                });
                            }

                            $scope.choices = choices;
                            self.updateData();
                            self.updateOptions();
                        });
                    } else {
                        $scope.choices = choices;
                        self.updateData();
                        self.updateOptions();
                    }
                } else {
                    $scope.choices = choices;
                    self.updateData();
                    self.updateOptions();
                }
            }

            self.loadChoices = function(choices) {
                if (choices == null) {
                    $scope.data.show = false;
                } else {
                    choices = choices.slice();
                    self.checkForInactiveValues(choices);
                }
            };

            self.updateValue = function () {
                $scope.data.value = undefined;
                if ($scope.choices && $scope.choices.length) {
                    $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });
                    self.checkForInactiveValues($scope.choices);
                }
            };

            self.updateOptions = function () {
                $timeout(function() {
                    var select = $element[0].querySelectorAll('select')[0];
                    angular.element(select).removeClass('not-an-option');
                    angular.forEach($scope.choices, function (choice, index) {
                        var option = select.querySelectorAll('option:not([value="?"])')[index];
                        angular.element(option).removeClass('not-an-option');
                        if (choice.notAnOption) {
                            angular.element(option).addClass('not-an-option');
                            angular.element(select).addClass('not-an-option');
                        } else {
                            angular.element(option).addClass('an-option');
                        }
                    });
                });

            };

            self.unregOnChoicesChange = $scope.field.onChoicesChanged(self.loadChoices);

            $scope.onChange = function () {

                $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });

                if ($scope.data.value === -1)
                    $scope.field.value.$ = null;
                else
                    $scope.field.value.$ = $scope.data.value;
            };

            var goToFnExists = typeof $scope.field.goTo === 'function';
            var hasRoleFnExists = typeof $scope.field.hasRole === 'function';
            var hasRole = !hasRoleFnExists || $scope.field.hasRole();

            $scope.goTo = function() {
                if (goToFnExists && hasRoleFnExists && hasRole) {
                    $scope.field.goTo();
                }
            };

            $scope.showGoTo = false;
            var isNotGrid = typeof $scope.field.context.isGrid === 'undefined';
            if (goToFnExists && isNotGrid && hasRole)
                $scope.showGoTo = true;

            $scope.$watch('field.value.$', function () { self.updateValue() });

            $scope.$on("$destroy", function () {
                self.unregOnChoicesChange();
            });
        }]);

    module.directive('stdDropdownEdit',
        ['$templateCache', 'stdDisplay', '$timeout', 'stdUtil',
            function ($templateCache, display, $timeout, util) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-dropdown-edit.html'),
                    controller: 'stdDropdownEditController',
                    link: function (scope, element) {
                        var oldValue;
                        var select = element[0].querySelectorAll('select')[0];
                        var button = element[0].querySelectorAll('button')[0];

                        angular.element(select).bind('focus', function (e) {
                            oldValue = scope.field.value.$;

                            //CHROME/SAFARI ONLY: Opens dropdown on focus 
                            if (scope.field.context.isGrid) {
                                $timeout(function() {
                                    var event = document.createEvent('MouseEvents');
                                    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                    select.dispatchEvent(event);
                                });
                            }
                        });

                        angular.element(select).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                select.blur();
                            }
                            if (e.keyCode === 46) {
                                scope.data.value === -1
                                scope.field.value.$ = null;
                            }
                            if (e.ctrlKey && e.keyCode === 71) {
                                e.preventDefault();
                                scope.goTo();
                                $timeout(function() {
                                    select.focus();
                                });
                            }
                        });

                        angular.element(button).bind('keydown', function (e) {
                            if(e.keyCode === 13){
                                e.preventDefault();
                            }
                            if (e.ctrlKey && e.keyCode === 71) {
                                e.preventDefault();
                                scope.goTo();
                                $timeout(function() {
                                    select.focus();
                                });
                            }
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.file.edit', []);

    module.controller('stdFileEditController', ['$scope', '$element', '$compile', 'stdFileReader',
        function ($scope, $element, $compile, fileReader) {
            var self = this;
            self.data = undefined;
            self.filename = undefined;
            self.mimeType = undefined;
            self.anchorElement = undefined;
            self.fileElement = undefined;
            self.renderElement = undefined;
            self.canvasElement = undefined;
            self.videoElement = undefined;

            self.setAnchorElement = function (anchorElement) {
                self.anchorElement = angular.element(anchorElement);
            };

            self.setFileElement = function (fileElement) {
                self.fileElement = angular.element(fileElement);
            };

            self.setRenderElement = function (renderElement) {
                self.renderElement = angular.element(renderElement);
            };

            self.clear = function () {
                if (!self.renderElement) return;
                self.renderElement.children().remove();
                $compile(self.renderElement.contents())($scope);
            };

            self.buildBase64 = function () {
                if (!self.data) return;
                var parts = self.data.split(',');
                if (parts.length === 2)
                    self.data = parts[1];
                return "data:" + self.mimeType + ";base64," + self.data;
            };

            self.appendCanvasElement = function () {
                self.renderElement.append(self.canvasElement);
                $compile(self.renderElement.contents())($scope);
            };

            self.appendVideoElement = function () {
                self.videoElement.setAttribute('src', self.data);
                self.videoElement.setAttribute('controls', 'controls');
                self.renderElement.append(self.videoElement);
                $compile(self.renderElement.contents())($scope);
            };

            self.loadImage = function () {
                var image = new Image();
                image.onload = function () {
                    self.canvasElement.height = image.height;
                    self.canvasElement.width = image.width;
                    self.canvasElement.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
                };
                image.src = self.data;
            };

            self.loadAppIcon = function (fileType) {
                var iconName = undefined;
                switch (self.mimeType.split('/')[1]) {
                    case 'msword':
                        iconName = 'ico-file-word';
                        break;
                    case 'vnd.ms-word.document.macroEnabled.12':
                        iconName = 'ico-file-word';
                        break;
                    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                        iconName = 'ico-file-word';
                        break;
                    case 'pdf':
                        iconName = 'ico-file-pdf';
                        break;
                    case 'vnd.ms-powerpoint':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'vnd.ms-powerpoint.presentation.macroEnabled.12':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'vnd.openxmlformats-officedocument.presentationml.presentation':
                        iconName = 'ico-file-powerpoint';
                        break;
                    case 'x-msexcel':
                        iconName = 'ico-file-excel';
                        break;
                    case 'vnd.ms-excel.sheet.macroEnabled.12':
                        iconName = 'ico-file-excel';
                        break;
                    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        iconName = 'ico-file-excel';
                        break;
                    case 'zip':
                        iconName = 'ico-file-zip';
                        break;
                    case 'text', 'plain':
                        iconName = 'ico-libreoffice';
                        break;
                    default:
                        iconName = 'ico-file';
                }

                var htmlIcon = '<i class="ttl-file-icon ' + iconName + '"></i>';
                self.renderElement.append(htmlIcon);
            };

            self.setType = function () {
                self.clear();
                self.data = self.buildBase64();

                var contentType = self.mimeType.split('/')[0];
                switch (contentType) {
                    case 'image':
                        self.canvasElement = document.createElement("canvas");
                        self.appendCanvasElement();
                        self.loadImage();
                        break;
                    case 'video':
                        self.videoElement = document.createElement("video");
                        self.appendVideoElement();
                        break;
                    case 'application':
                        self.loadAppIcon();
                        break;
                    case 'text':
                        self.loadAppIcon();
                        break;
                    default:
                        throw new Error('Unsupported Content Type');
                }

                if (!navigator.msSaveBlob) {
                    self.anchorElement[0].setAttribute('href', self.data);
                    self.anchorElement[0].setAttribute('download', self.filename);
                }
            };

            self.init = function () {
                $scope.noDataMessage = undefined;
                if (!self.renderElement ||!self.choices) return;
                if (!$scope.field.value.data) {
                    self.clear();
                    $scope.noDataMessage = 'No file uploaded';
                    return;
                }
                self.data = $scope.field.value.data;
                self.filename = $scope.field.children.filename.value.$;
                if ($scope.field.children.mimeType.value.$) {
                    self.mimeType = self.choices.filter(function (obj) {
                        return obj.value.$ === $scope.field.children.mimeType.value.$;
                    })[0].label;
                } else {
                    self.mimeType = 'text/plain';
                }

                self.setType();
            };

            self.getMimeTypes = function(choices) {
                if (!choices) return;
                self.choices = choices;
                self.init();
            };

            self.unregOnChoicesChangeForMime = $scope.field.children.mimeType.onChoicesChanged(self.getMimeTypes);

            $scope.noDataMessage = undefined;

            $scope.upload = function () {
                self.fileElement[0].click();
            };

            $scope.download = function () {
                if (!navigator.msSaveBlob) return;
                var byteString = atob($scope.field.value.data);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                var blob = new Blob([buffer], {
                    type: self.mimeType
                });
                navigator.msSaveBlob(blob, self.filename);
            };

            $scope.fileChanged = function (e) {
                fileReader.read(e.target.files[0], $scope.field.type.property.allowed).then(function (response) {
                    $scope.noDataMessage = undefined;
                    response.mimeType = response.mimeType ? response.mimeType : 'text/plain';
                    var foundMimeType = self.choices.filter(function (obj) {
                        return obj.label.toLowerCase() === response.mimeType;
                    });
                    if (foundMimeType.length === 0) {
                        alert('Unsupported MimeType: ' + response.mimeType);
                        return;
                    }
                    $scope.field.children.mimeType.value.$ = foundMimeType[0].value.$;

                    $scope.field.children.filename.value.$ = response.filename;
                    $scope.$apply(function() {
                        $scope.field.value.data = response.data.split(',')[1];
                    });
                    self.mimeType = response.mimeType;
                    self.filename = response.filename;
                    self.data = response.data.split(',')[1];
                    self.setType();
                });
            };

            $scope.$watch('field.value.data', function () { self.init(); });

            $scope.$on("$destroy", function () {
                self.unregOnChoicesChangeForMime();
            });
        }]);

    module.directive('stdFileEdit',
        ['$templateCache', 'stdDisplay',
            function ($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdFileEditController',
                    template: $templateCache.get('src/templates/edit/std-file-edit.html'),
                    link: function (scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                        var localCtrl = element.data('$stdFileEditController');
                        localCtrl.setAnchorElement(element[0].querySelectorAll('.anchorElement')[0]);
                        localCtrl.setFileElement(element[0].querySelectorAll('.fileElement')[0]);
                        localCtrl.setRenderElement(element[0].querySelectorAll('.renderElement')[0]);
                        localCtrl.getMimeTypes();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.float.edit', []);

    module.directive('stdFloatEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-float-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.integer.edit', []);

    module.directive('stdIntegerEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-integer-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.intl.address.basic.edit', []);

    module.directive('stdIntlAddressBasicEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-address-basic-edit.html'),
                    link: {
                        //pre: function (scope, element) {
                        //    scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                        //    scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        //},
                        post: function(scope, element) {
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateProvinceLabel.addClass('ttl-no-label-width');
                            postalCodeLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.intl.address.edit', []);

    module.directive('stdIntlAddressEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-address-edit.html'),
                    link: {
                        //pre: function (scope, element) {
                        //    scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                        //    scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        //},
                        post: function(scope, element) {
                            var stateProvinceTextLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[6]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[7]);
                            stateProvinceTextLabel.addClass('ttl-no-label-width');
                            stateProvinceLabel.addClass('ttl-no-label-width');
                            postalCodeLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);

                            scope.showStateProvinceText = true;

                            scope.$watch('field.children.country.value.$', function(newValue, oldValue) {
                                if (newValue === oldValue) return;
                                if (newValue === 236 || newValue === 39)
                                    scope.showStateProvinceText = false;
                                else
                                    scope.showStateProvinceText = true;
                            })
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.intl.phone.edit', []);

    module.directive('stdIntlPhoneEdit',
        ['$templateCache', 'stdDisplay', 'stdCountries',
            function($templateCache, display, countries) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-phone-edit.html'),
                    link: function (scope, element) {

                        function updateValue() {
                            var country, dialCode;
                            if (scope.field.children.countryCode.value.$) {
                                country = _.find(countries.allCountries, function (country) { return country.iso2 === scope.field.children.countryCode.value.$ });
                                dialCode = country.dialCode;
                            } else {
                                country = _.find(countries.allCountries, function (country) {
                                    return country.iso2 === scope.field.property.countryCode;
                                });
                                dialCode = country.dialCode;
                            }
                            scope.countries = countries.allCountries;
                            scope.data = {
                                value: 0,
                                selectedCountry: country,
                                selectedCountryIso2: country.iso2,
                                dialCode: dialCode
                            };
                            scope.field.property.dialCode = country.dialCode;
                            scope.onCountryCodeChange = function (country) {
                                scope.field.children.countryCode.value.$ = country.iso2;
                                scope.field.property.dialCode = country.dialCode;
                                scope.field.children.phone.value.$ = undefined;
                            };
                        }

                        updateValue();

                        scope.$watch('field.children.phone.value.$', function () { updateValue() });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.intl.phone.number.edit', []);

    module.directive('stdIntlPhoneNumberEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-phone-number-edit.html'),
                    link: function(scope, element) {
                        scope.data = {
                          dialCode: 1
                        };
                        scope.$watch('field.countryCode.value.$', function() {

                        });

                        display.setVisibility(element, scope.field.phone.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.intl.state.edit', []);

    module.controller('stdIntlStateEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {
            var self = this;
            self.unregOnChoicesChange = undefined;
            self.select = $element[0].querySelectorAll('select')[0];

            $scope.data = {};

            self.updateData = function() {
                if ($scope.choices.length > 0) {

                    if ($scope.field.stateProvince.type.isNullable) {
                        var emptyItemExists = _.find($scope.choices, function (choice) { return choice.label === ' ' });
                        if (!emptyItemExists)
                            $scope.choices.unshift({ label: ' ', value: { $: -1 } });
                    }

                    if ($scope.field.stateProvince.value.$)
                        $scope.data.value = $scope.field.value.$;

                    if ($scope.field.stateProvince.type.isNullable && !$scope.field.stateProvince.value.$)
                        $scope.data.value = $scope.choices[0].value.$;
                }

                $scope.data.show = true;

                if ($scope.field.stateProvince.context.isGrid) {
                    $timeout(function () {
                        var select = $element[0].querySelectorAll('select')[0];
                        select.focus();
                    });
                }

                $scope.filteredChoices = _.filter($scope.choices, function (choice) {
                    choice.stdIntlCountryRef === $scope.field.country.value.$;
                });
            };

            self.checkForInactiveValues = function(choices) {
                var itemFound = _.find(choices, function (obj) { return obj.value.$ === $scope.field.stateProvince.value.$ });

                if (!itemFound && $scope.field.stateProvince.value.$) {
                    if ($scope.field.stateProvince.queryByRef) {
                        $scope.field.stateProvince.queryByRef($scope.field.StateProvince.value.$).then(function (result) {
                            if (result) {
                                choices.push({
                                    label: result.label,
                                    value: {$: $scope.field.stateProvince.value.$},
                                    notAnOption: true
                                });
                            }

                            $scope.choices = choices;
                            self.updateData();
                            self.updateOptions();
                        });
                    } else {
                        $scope.choices = choices;
                        self.updateData();
                        self.updateOptions();
                    }
                } else {
                    $scope.choices = choices;
                    self.updateData();
                    self.updateOptions();
                }
            };

            self.loadChoices = function(choices) {
                if (choices == null) {
                    $scope.data.show = false;
                } else {
                    choices = choices.slice();
                    self.checkForInactiveValues(choices);
                }
            };

            self.updateValue = function () {
                $scope.data.value = undefined;
                if ($scope.choices && $scope.choices.length) {
                    $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });
                    self.checkForInactiveValues($scope.choices);
                }
            };

            self.updateOptions = function () {
                $timeout(function() {
                    var select = $element[0].querySelectorAll('select')[0];
                    angular.element(select).removeClass('not-an-option');
                    angular.forEach($scope.choices, function (choice, index) {
                        var option = select.querySelectorAll('option:not([value="?"])')[index];
                        angular.element(option).removeClass('not-an-option');
                        if (choice.notAnOption) {
                            angular.element(option).addClass('not-an-option');
                            angular.element(select).addClass('not-an-option');
                        } else {
                            angular.element(option).addClass('an-option');
                        }
                    });
                });

            };

            self.unregOnChoicesChange = $scope.field.stateProvince.onChoicesChanged(self.loadChoices);

            $scope.onChange = function () {

                $scope.choices = _.reject($scope.choices, function (choice) { return choice.notAnOption === true; });

                if ($scope.data.value === -1)
                    $scope.field.stateProvince.value.$ = null;
                else
                    $scope.field.stateProvince.value.$ = $scope.data.value;
            };

            $scope.$watch('field.country.value.$', function(newValue, oldValue) {
                if (newValue === oldValue) return;
                if (newValue === 236 || newValue === 39) {
                    self.updateData();
                }
            });

            $scope.$watch('field.stateProvince.value.$', function () { self.updateValue() });

            $scope.$on("$destroy", function () {
                self.unregOnChoicesChange();
            });
        }]);

    module.directive('stdIntlStateEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-intl-state-edit.html'),
                    controller: 'stdIntlStateEditController',
                    link: function(scope, element, attrs) {
                        var oldValue;
                        var select = element[0].querySelectorAll('select')[0];
                        var button = element[0].querySelectorAll('button')[0];

                        angular.element(select).bind('focus', function (e) {
                            oldValue = scope.field.stateProvince.value.$;

                            //CHROME/SAFARI ONLY: Opens dropdown on focus
                            if (scope.field.stateProvince.context.isGrid) {
                                $timeout(function() {
                                    var event = document.createEvent('MouseEvents');
                                    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                    select.dispatchEvent(event);
                                });
                            }
                        });

                        angular.element(select).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.stateProvince.value.$ = oldValue;
                                select.blur();
                            }
                            if (e.keyCode === 46) {
                                scope.data.value === -1
                                scope.field.stateProvince.value.$ = null;
                            }
                        });

                        angular.element(button).bind('keydown', function (e) {
                            if(e.keyCode === 13){
                                e.preventDefault();
                            }
                        });

                        display.setVisibility(element, scope.field.stateProvince.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.link.edit', []);

    module.directive('stdLinkEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-link-edit.html'),
                    link: function(scope, element) {
                        scope.goTo = function() {

                        };
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.masked.edit', []);

    module.controller('stdMaskedEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {
            var self = this;

            self.init = function () {
                $scope.data = { value: $scope.field.value.$ };
            };

            $scope.onChange = function() {
                $scope.field.value.$ = $scope.data.value;
            };

            $scope.$watch('field.value.$', function () { self.init(); });
        }]);

    module.directive('stdMaskedEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-masked-edit.html'),
                    controller: 'stdMaskedEditController',
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.multiline.edit', []);

    module.directive('stdMultilineEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-multiline-edit.html'),
                    link: function(scope, element) {
                        var oldValue;
                        var input = element[0].querySelectorAll('textarea')[0];

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid)
                                input.select();
                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.na.phone.edit', []);

    module.directive('stdNaPhoneEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-na-phone-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.password.edit', []);

    module.controller('stdPasswordModalController',
        ['$scope', '$element', '$timeout', '$document', 'stdModal',
            function ($scope, $element, $timeout, $document, modal) {
                var passwordInput, cancelButton;

                $timeout(function () {
                    var passwordInput = $element[0].querySelectorAll('input')[0];
                    passwordInput.focus();
                });

                function documentKeyDownFn(e) {
                    if (e.keyCode === 13 && $scope.formIsValid) {
                        modal.resolve($scope.data.password);
                    }
                    if (e.keyCode === 27) {
                        modal.reject();
                    }
                };

                function validate() {
                    $scope.errorMessage = '';
                    $scope.confirmErrorMessage = '';

                    if (!$scope.data.password)
                        $scope.errorMessage = 'Password is required.';

                    if (!$scope.data.confirmPassword)
                        $scope.confirmErrorMessage = 'Confirm password is required.';

                    if ($scope.data.password !== $scope.data.confirmPassword) {
                        if ($scope.errorMessage)
                            $scope.errorMessage += ' | Password and confirm password must match.';
                        else
                            $scope.errorMessage += 'Password and confirm password must match.';
                        if ($scope.confirmErrorMessage)
                            $scope.confirmErrorMessage += '| Password and confirm password must match.';
                        else
                            $scope.confirmErrorMessage += 'Password and confirm password must match.';
                    }

                    $scope.formIsValid = !($scope.errorMessage || $scope.confirmErrorMessage);
                }

                $scope.data = { password: '', confirmPassword: '' };

                $scope.onCancelClick = modal.reject;
                $scope.formIsValid = false;
                $scope.errorMessage = '';
                $scope.confirmErrorMessage = '';
                $scope.mouseOverPassword = false;
                $scope.mouseOverConfirmPassword = false;

                $scope.cancel = function (e) {
                    $timeout(function () { modal.reject() });
                };

                $scope.onOkKeyDown = function (e) {
                    if (e.keyCode === 13)
                        $scope.onOkClick();
                };

                $scope.onCancelKeyDown = function (e) {
                    if (e.keyCode === 13)
                        modal.reject();
                };

                $scope.onPasswordChange = function () {
                    validate();
                };

                $scope.onConfirmPasswordChange = function () {
                    validate();
                };

                $scope.onPasswordMouseEnter = function () {
                    $scope.mouseOverPassword = true;
                };

                $scope.onPasswordMouseLeave = function () {
                    $scope.mouseOverPassword = false;
                };

                $scope.onConfirmPasswordMouseEnter = function () {
                    $scope.mouseOverConfirmPassword = true;
                };

                $scope.onConfirmPasswordMouseLeave = function () {
                    $scope.mouseOverConfirmPassword = false;
                };

                $scope.onClearClick = function () {
                    modal.resolve(null);
                };

                $scope.onOkClick = function () {
                    modal.resolve($scope.data.password);
                };

                $scope.$on('$destroy', function () {
                    angular.element($document[0]).off('keydown', documentKeyDownFn);
                });

                angular.element($document[0]).on('keydown', documentKeyDownFn);
            }]);

    module.controller('stdPasswordEditController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                var self = this;

                self.cleanUp = function () {
                    $scope.open = false;
                    $scope.subview = null;
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };

                self.openModal = function () {
                    $scope.subview = 'password';
                    var promise = modal.open(
                        'password',
                        {
                            message: ''
                        }
                    );
                    promise.then(
                        function handleResolve(response) {
                            $scope.field.value.$ = response;
                            self.cleanUp();
                        },
                        function handleReject(error) {
                            self.cleanUp();
                        }
                    );
                };

                self.init = function () {
                    $scope.setOrChange = $scope.field.value.$ ? 'Edit' : 'Set';
                };

                $scope.onPasswordButtonClick = function () {
                    self.openModal();
                };

                $scope.onPasswordButtonKeyDown = function (e) {
                    if (e.keyCode === 13)
                        self.openModal();
                };

                $scope.mouseOverPasswordButton = false;

                $scope.onMouseEnterPasswordButton = function () {
                    $scope.mouseOverPasswordButton = true;
                };

                $scope.onMouseLeavePasswordButton = function () {
                    $scope.mouseOverPasswordButton = false;
                };

                $scope.$watch('field.value.$', function () { self.init(); });
            }]);



    module.directive('stdPasswordEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdPasswordEditController',
                    require: ['^stdPasswordEdit'],
                    template: $templateCache.get('src/templates/edit/std-password-edit.html'),
                    link: function (scope, element, attrs, ctrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.percent.edit', []);

    module.directive('stdPercentEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-percent-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.record.picker.edit', []);

    module.directive('stdPickerView', ['$compile', '$http', function ($compile, $http) {
        return {
            restrict: 'A',
            replace: false,
            terminal: true,
            priority: 1000,
            link: function (scope, element, attrs, ctrls, transclude) {
                var tpl = $compile('<div ' + scope.field.property.pickerName + '-picker' + ' field="field" view="view"></div>')(scope);
                element.append(tpl);
            }
        };
    }]);

    module.controller('stdRecordPickerModalController',
        ['$scope', '$element', '$timeout', '$document', 'stdModal',
            function ($scope, $element, $timeout, $document, modal) {
                var keydownListener = function (e) {
                    if (e.keyCode === 27) {
                        $timeout(function () { modal.reject() });
                    }
                };

                $scope.modal = {
                    height:400,
                    width:700
                };

                $scope.selectedId = 0;
                $scope.childSearchIsFocused = true;

                $scope.clear = function () {
                    $timeout(function () { modal.resolve(null) });
                };

                $scope.onClearKeydown = function (e) {
                    if (e.keyCode === 13) {
                        $timeout(function () { modal.resolve(null) });
                    }
                };

                $scope.cancel = function (e) {
                    if (e.keyCode === 13) { e.preventDefault(); return false; }
                    $timeout(function () { modal.reject() });
                };


                $scope.submit = function (id) {
                    if (id)
                        $scope.selectedId = id;
                    $timeout(function () { modal.resolve($scope.selectedId) });
                };

                $scope.$on('$destroy', function () {
                    $document[0].removeEventListener('keydown', keydownListener);
                });

                $document[0].addEventListener('keydown', keydownListener, true);
            }]);

    module.controller('stdRecordPickerEditController',
        ['$scope', '$element', '$timeout', 'stdModal',
            function ($scope, $element, $timeout, modal) {
                var self = this;

                self.init = function () {
                    $scope.data = { displayValue: 'Loading...' };
                    $scope.data.show = false;
                    if ($scope.field.value.$) {
                        $scope.field.queryByRef($scope.field.value.$).then(function (results) {
                            $scope.data.displayValue = results.label;
                            $scope.data.show = true;
                        });
                    } else {
                        $scope.data.displayValue = '';
                    }
                };

                self.cleanUp = function () {
                    $scope.open = false;
                    $scope.subview = null;
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };


                self.showRecordPickerModal = function () {
                    $scope.open = true;
                    $timeout(function () {
                        $scope.subview = 'recordPicker';
                        var promise = modal.open();
                        promise.then(
                            function handleResolve(response) {
                                $scope.field.value.$ = response;
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                    $scope.$destroy();
                                } else {
                                    self.cleanUp();
                                }
                            },
                            function handleReject(error) {
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                } else {
                                    self.cleanUp();
                                }
                            }
                        );
                    });
                };

                if ($scope.field.context.isGrid) {
                    self.showRecordPickerModal();
                }

                $scope.onClick = function () {
                    if (!$scope.open)
                        self.showRecordPickerModal();
                };

                $scope.onKeydown = function (e) {
                    if (!$scope.open && e.keyCode === 13)
                        self.showRecordPickerModal();
                    if (e.ctrlKey && e.keyCode === 71) {
                        e.preventDefault();
                        $scope.goTo();
                    }
                };

                $scope.showArrow = false;
                $scope.onInputMousedown = function () {
                    if ($scope.showArrow) return;
                    $scope.showArrow = true;
                    $timeout(function () {
                        $scope.showArrow = false;
                    }, 5000);
                };

                var goToFnExists = typeof $scope.field.goTo === 'function';
                var hasRoleFnExists = typeof $scope.field.hasRole === 'function';
                var hasRole = !hasRoleFnExists || $scope.field.hasRole();

                $scope.goTo = function() {
                    if (goToFnExists && hasRoleFnExists && hasRole) {
                        $scope.field.goTo();
                    }
                };

                $scope.showLink = false;
                var isNotGrid = typeof $scope.field.context.isGrid === 'undefined';
                if (goToFnExists && isNotGrid && hasRole)
                    $scope.showLink = true;

                $scope.$watch('field.value.$', function () { self.init(); });
            }]);

    module.directive('stdRecordPickerEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdRecordPickerEditController',
                    template: $templateCache.get('src/templates/edit/std-record-picker-edit.html'),
                    link: function (scope, element) {
                        $timeout(function() {
                            var link = element[0].querySelectorAll('a')[0];
                            var linkContainer = element[0].querySelectorAll('.ttl-record-picker-display-value')[0];
                            angular.element(link).bind('keydown', function (e) {
                                if (e.ctrlKey && e.keyCode === 71) {
                                    e.preventDefault();
                                        scope.goTo();
                                    $timeout(function() {
                                        select.focus();
                                    });
                                }
                            });

                            angular.element(linkContainer).bind('keydown', function (e) {
                                if (e.ctrlKey && e.keyCode === 71) {
                                    e.preventDefault();
                                    scope.goTo();
                                    $timeout(function() {
                                        select.focus();
                                    });
                                }
                            });
                            angular.element(link).bind('mousedown', function (e) {
                               link.focus();
                            });
                        });
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.text.edit', []);

    module.directive('stdTextEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-text-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.textbox.edit', []);

    /**
     * @ngdoc directive
     * @name std.textbox.edit.directive:stdTextboxEdit
     * @restrict E
     *
     * @description
     * Modifies the default behavior of the html A tag so that the default action is prevented when
     * the href attribute is empty.
     *
     * This change permits the easy creation of action links with the `ngClick` directive
     * without changing the location or causing page reloads, e.g.:
     * `<a href="" ng-click="list.addItem()">Add Item</a>`
     */
    module.directive('stdTextboxEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-textbox-edit.html'),
                    link: function(scope, element) {
                        var oldValue;
                        var input = element[0].querySelectorAll('input')[0];
                        var maxLength = scope.field.type.property.maxLength ? scope.field.type.property.maxLength : 0;

                        angular.element(input).bind('focus', function (e) {
                            oldValue = scope.field.value.$;
                            if (!scope.field.context.isGrid) {
                                //$timeout(function() {
                                    input.select();
                                //});
                            }
                        });

                        angular.element(input).bind('keydown', function (e) {
                            if (e.keyCode === 27) {
                                scope.field.value.$ = oldValue;
                                input.blur();
                            }
                        });

                        angular.element(input).bind('paste', function (e) {
                            e.preventDefault();
                            var caretPos =  input.selectionStart;
                            var caretEnd = input.selectionEnd;
                            var txt = scope.field.value.$ ? scope.field.value.$ : '';
                            var result;

                            if (e.originalEvent.clipboardData)
                                result = (txt.substring(0, caretPos) + e.originalEvent.clipboardData.getData('text').split('\n').join('') + txt.substring(caretEnd)).substring(0, maxLength);
                            else
                                result = (txt.substring(0, caretPos) + window.clipboardData.getData('text').split('\n').join('') + txt.substring(caretEnd)).substring(0, maxLength);
                            scope.field.value.$ = result;
                        });

                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.time.edit', []);

    module.controller('stdTimeEditController', ['$scope', '$element', '$timeout',
        function ($scope, $element, $timeout) {

        }]);

    module.directive('stdTimeEdit',
        ['$templateCache', '$timeout', 'stdDisplay',
            function($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    controller: 'stdTimeEditController',
                    template: $templateCache.get('src/templates/edit/std-time-edit.html'),
                    link: function(scope, element, attrs) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.address.edit', []);

    module.directive('stdUsaAddressEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-address-edit.html'),
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function(scope, element) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.address.zip.9.edit', []);

    module.directive('stdUsaAddressZip9Edit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-address-zip-9-edit.html'),
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function(scope, element) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');
                            display.setVisibility(element, scope.field.type.canDisplay);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.dollar.edit', []);

    module.directive('stdUsaDollarEdit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-dollar-edit.html'),
                    link: function(scope, element, attrs, ngModelCtrl) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.zip.5.edit', []);

    module.directive('stdUsaZip5Edit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-zip-5-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.usa.zip.9.edit', []);

    module.directive('stdUsaZip9Edit',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/edit/std-usa-zip-9-edit.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.checkbox.list', []);

    module.controller('stdCheckboxListController', ['$scope',
        function ($scope) {

        }]);

    module.directive('stdCheckboxList',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '='
                    },
                    template: $templateCache.get('src/templates/list/std-checkbox-list.html'),
                    controller: 'stdCheckboxListController',
                    link: function (scope, element) {
                        scope.data = { disabled: true };
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.text.list', []);

    module.directive('stdTextList',
        ['$templateCache', 'stdDisplay',
            function($templateCache, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    template: $templateCache.get('src/templates/list/std-text-list.html'),
                    link: function(scope, element) {
                        display.setVisibility(element, scope.field.type.canDisplay);
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.boolean.dropdown.query', []);

    module.controller('stdBooleanDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();


            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                if (typeof value !== 'undefined') {
                    queryPredicate.set('', operator, value);
                } else {
                    queryPredicate.clear();
                }
            };
            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.choices = [
                { value: { $: undefined }, label: '' },
                { value: { $: true }, label: 'True' },
                { value: { $: false }, label: 'False' },
                { value: { $: 'null' }, label: 'Null' }
            ];
            $scope.data = { label: undefined };

            if (ctrlValueHasValue) {
                $scope.data.label = $scope.choices.filter(function (obj) {
                    return obj.value.$ === ctrlValue;
                })[0].label;
                $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
            }
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
            else
                $scope.field.value.$ = undefined;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdBooleanDropdownQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-boolean-dropdown-query.html'),
                    controller: 'stdBooleanDropdownQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.checkbox.query', []);

    module.controller('stdCheckboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                typeof value !== 'undefined' ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.data = { value: undefined };
            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return typeof $scope.field === 'undefined' || (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdCheckboxQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-checkbox-query.html'),
                    controller: 'stdCheckboxQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.query', []);

    module.controller('stdDateQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;

                if (value && util.isDate(value)) {
                    var predicates = [];
                    var startValue = new Date(value);
                    var endValue = new Date(value);
                    if (operator === 'eq') {
                        startValue.setHours(0,0,0,0);
                        endValue.setHours(23,59,59,999);
                        predicates.push(queryPredicate.create('', 'gt', startValue));
                        predicates.push(queryPredicate.create('', 'lt', endValue));
                        queryPredicate.set(predicates[0].and(predicates[1]));
                    }
                    if (operator === 'lt') {
                        startValue.setHours(0,0,0,0);
                        queryPredicate.set('', 'lt', startValue);
                    }
                    if (operator === 'gt') {
                        startValue.setHours(23,59,59,999);
                        queryPredicate.set('', 'gt', startValue);
                    }
                    if (operator === 'le') {
                        startValue.setHours(23,59,59,999);
                        queryPredicate.set('', 'le', startValue);
                    }
                    if (operator === 'ge') {
                        startValue.setHours(0,0,0,0);
                        queryPredicate.set('', 'ge', startValue);
                    }
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdDateQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-query.html'),
                    controller: 'stdDateQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.date.range.query', []);

    module.controller('stdDateRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlStartValue = $scope.field.property.startValue;
            var ctrlEndValue = $scope.field.property.endValue;
            var ctrlStartDefault = $scope.field.property.startDefault;
            var ctrlEndDefault = $scope.field.property.endDefault;
            var ctrlStartValueHasValue = typeof ctrlStartValue !== 'undefined';
            var ctrlStartDefaultHasValue = typeof ctrlStartDefault !== 'undefined';
            var ctrlEndValueHasValue = typeof ctrlEndValue !== 'undefined';
            var ctrlEndDefaultHasValue = typeof ctrlEndDefault !== 'undefined';

            var startDateInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endDateInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;
            var startOperator = operatorLookup[startDateInclusive].operator;
            var endOperator = operatorLookup[endDateInclusive].operator;

            var onClearCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue)
                        $scope.data.startDate = undefined;

                    if (!ctrlEndValueHasValue)
                        $scope.data.endDate = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue) {
                        if (ctrlStartDefaultHasValue)
                            $scope.data.startDate = ctrlStartDefault;
                        else
                            $scope.data.startDate = undefined;
                    }

                    if (!ctrlEndValueHasValue) {
                        if (ctrlEndDefaultHasValue)
                            $scope.data.endDate = ctrlEndDefault;
                        else
                            $scope.data.endDate = undefined;
                    }

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var queryPredicate = $scope.field.queryPredicate;
                var predicates = [];

                if ($scope.data.startDate) {
                    var startValue = new Date($scope.data.startDate.toUTCString());
                    startValue.setHours(0,0,0,0);
                    predicates.push(queryPredicate.create('', startOperator, startValue));
                }

                if ($scope.data.endDate) {
                    var endValue = new Date($scope.data.endDate.toUTCString());
                    endValue.setHours(23,59,59,999);
                    predicates.push(queryPredicate.create('', endOperator, endValue));
                }
                if (predicates.length) {
                    var predicate = predicates[0];
                    if (predicates.length > 1)
                        predicate = predicate.and(predicates[1]);
                    queryPredicate.set(predicate);
                } else
                    queryPredicate.clear();
            };

            $scope.data = {
                startDate: undefined,
                endDate: undefined
            };

            $scope.startOperatorImage = operatorLookup[startDateInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startDateInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endDateInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endDateInclusive].operatorImageMessage;

            $scope.onStartOperatorClick = function() {
                if (ctrlStartValueHasValue || $scope.field.context.isEditing) return;
                $scope.data.startDate = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.onEndOperatorClick = function() {
                if (ctrlEndValueHasValue || $scope.field.context.isEditing) return;
                $scope.data.endDate = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.init = function() {
                if (ctrlStartValueHasValue)
                    $scope.data.startDate = ctrlStartValue;
                if (ctrlStartDefaultHasValue)
                    $scope.data.startDate = ctrlStartDefault;
                if (ctrlEndValueHasValue)
                    $scope.data.endDate = ctrlEndValue;
                if (ctrlEndDefaultHasValue)
                    $scope.data.endDate = ctrlEndDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdDateRangeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-range-query.html'),
                    controller: 'stdDateRangeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.date.span.query', []);

    module.controller('stdDateSpanQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdDateSpanQuery',
        ['$templateCache', 'stdUtil',
            function ($templateCache, util) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-date-span-query.html'),
                    controller: 'stdDateSpanQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.start.property.operator = 'greater-than-or-equal';
                            scope.field.children.end.property.operator = 'less-than-or-equal';
                            scope.field.children.start.property.default = scope.field.property.startDefault;
                            scope.field.children.end.property.default = scope.field.property.endDefault;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var startLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[1]);
                            var endLabel = angular.element(element[0].querySelectorAll('.tvl-container-dat-label')[2]);
                            startLabel.remove();
                            endLabel.remove();

                            var onPredicateCB = function() {
                                return function () {
                                    var predicates = [];
                                    var queryPredicate = scope.field.queryPredicate;

                                    var start = scope.field.children.start.value.$;
                                    var end = scope.field.children.end.value.$;

                                    if (start && end && util.isDate(start) && util.isDate(end)) {
                                        var startStartValue = new Date(start.toUTCString());
                                        var startEndValue = new Date(end.toUTCString());

                                        startStartValue.setHours(0, 0, 0, 0);
                                        predicates.push(queryPredicate.create('Start', 'ge', startStartValue));
                                        startEndValue.setHours(23, 59, 59, 999);
                                        predicates.push(queryPredicate.create('Start', 'le', startEndValue));

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
                                        } else {
                                            queryPredicate.clear();
                                        }
                                    } else if (start && util.isDate(start)) {
                                        var startStartValue = new Date(start.toUTCString());
                                        queryPredicate.set('Start', 'ge', startStartValue);
                                    } else if (end && util.isDate(end)) {
                                        var startEndValue = new Date(end.toUTCString());
                                        queryPredicate.set('Start', 'le', startEndValue);
                                    } else {
                                        queryPredicate.clear();
                                    }
                                }
                            }();

                            searchGroupCtrl.registerPredicate(onPredicateCB);
                        }
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.datetime.query', []);

    module.controller('stdDatetimeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;

                if (value && util.isDate(value)) {
                    var predicates = [];
                    var startValue = new Date(value);
                    var endValue = new Date(value);
                    if (operator === 'eq') {
                        startValue.setHours(0,0,0,0);
                        endValue.setHours(23,59,59,999);
                        predicates.push(queryPredicate.create('', 'gt', startValue));
                        predicates.push(queryPredicate.create('', 'lt', endValue));
                        queryPredicate.set(predicates[0].and(predicates[1]));
                    }
                    if (operator === 'lt') {
                        startValue.setHours(0,0,0,0);
                        queryPredicate.set('', 'lt', startValue);
                    }
                    if (operator === 'gt') {
                        startValue.setHours(23,59,59,999);
                        queryPredicate.set('', 'gt', startValue);
                    }
                    if (operator === 'le') {
                        startValue.setHours(23,59,59,999);
                        queryPredicate.set('', 'le', startValue);
                    }
                    if (operator === 'ge') {
                        startValue.setHours(0,0,0,0);
                        queryPredicate.set('', 'ge', startValue);
                    }
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === "undefined");
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field.value.$ === 'undefined');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdDatetimeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-datetime-query.html'),
                    controller: 'stdDatetimeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.datetime.range.query', []);

    module.controller('stdDatetimeRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlStartValue = $scope.field.property.startValue;
            var ctrlEndValue = $scope.field.property.endValue;
            var ctrlStartDefault = $scope.field.property.startDefault;
            var ctrlEndDefault = $scope.field.property.endDefault;
            var ctrlStartValueHasValue = typeof ctrlStartValue !== 'undefined';
            var ctrlStartDefaultHasValue = typeof ctrlStartDefault !== 'undefined';
            var ctrlEndValueHasValue = typeof ctrlEndValue !== 'undefined';
            var ctrlEndDefaultHasValue = typeof ctrlEndDefault !== 'undefined';

            var startDateInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endDateInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;
            var startOperator = operatorLookup[startDateInclusive].operator;
            var endOperator = operatorLookup[endDateInclusive].operator;

            var onClearCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue)
                        $scope.data.startDate = undefined;

                    if (!ctrlEndValueHasValue)
                        $scope.data.endDate = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (!ctrlStartValueHasValue) {
                        if (ctrlStartDefaultHasValue)
                            $scope.data.startDate = ctrlStartDefault;
                        else
                            $scope.data.startDate = undefined;
                    }

                    if (!ctrlEndValueHasValue) {
                        if (ctrlEndDefaultHasValue)
                            $scope.data.endDate = ctrlEndDefault;
                        else
                            $scope.data.endDate = undefined;
                    }

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var queryPredicate = $scope.field.queryPredicate;
                var predicates = [];

                if ($scope.data.startDate) {
                    predicates.push(queryPredicate.create('', startOperator, $scope.data.startDate));
                }

                if ($scope.data.endDate) {
                    predicates.push(queryPredicate.create('', endOperator, $scope.data.endDate));
                }
                if (predicates.length) {
                    var predicate = predicates[0];
                    if (predicates.length > 1)
                        predicate = predicate.and(predicates[1]);
                    queryPredicate.set(predicate);
                } else
                    queryPredicate.clear();
            };

            $scope.data = {
                startDate: undefined,
                endDate: undefined
            };

            $scope.startOperatorImage = operatorLookup[startDateInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startDateInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endDateInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endDateInclusive].operatorImageMessage;

            $scope.init = function() {
                if (ctrlStartValueHasValue)
                    $scope.data.startDate = ctrlStartValue;
                if (ctrlStartDefaultHasValue)
                    $scope.data.startDate = ctrlStartDefault;
                if (ctrlEndValueHasValue)
                    $scope.data.endDate = ctrlEndValue;
                if (ctrlEndDefaultHasValue)
                    $scope.data.endDate = ctrlEndDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdDatetimeRangeQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-datetime-range-query.html'),
                    controller: 'stdDatetimeRangeQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();

(function(){
    'use strict';

    var module = angular.module('std.decimal.query', []);

    module.controller('stdDecimalQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdDecimalQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-decimal-query.html'),
                    controller: 'stdDecimalQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.dropdown.query', []);

    module.controller('stdDropdownQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;
            var unregOnChoicesChange = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                if (typeof value !== 'undefined') {
                    if (typeof value === 'string')
                        value = "'" + value + "'";
                    queryPredicate.set('', operator, value);
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.data = {
                choices: [],
                label: undefined
            };

            var loadChoices = function(choices) {
                if (choices == null) return;
                $scope.data.choices = angular.copy(choices);

                $scope.data.choices.unshift({label: '', value: {$: undefined}});

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({label: 'Null', value: {$: 'null'}});
                }

                if (ctrlValueHasValue) {
                    $scope.data.label = $scope.data.choices.filter(function (obj) {
                        return obj.value.$ === ctrlValue;
                    })[0].label;
                    $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                } else if (ctrlDefaultHasValue)
                    $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                else
                    $scope.field.value.$ = undefined;

                $scope.updateQueryPredicate();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            if(ctrlValue === null) {
                $scope.data.label = 'Null';
                $scope.field.value.$ = null;
                $scope.updateQueryPredicate();
            } else {
                unregOnChoicesChange = $scope.field.onChoicesChanged(loadChoices);
            }

            $scope.$on("$destroy", function () {
                unregOnChoicesChange();
            });

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            };
        }]);

    module.directive('stdDropdownQuery',
        ['$templateCache', '$timeout',
            function ($templateCache, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-dropdown-query.html'),
                    controller: 'stdDropdownQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        $timeout(function() {
                            var select = element[0].querySelectorAll('select')[0];

                            angular.element(select).bind('keydown', function (e) {
                                if (e.keyCode === 46) {
                                    if (scope.field.type.isNullable) {
                                        scope.field.value.$ = 'null';
                                    } else {
                                        scope.field.value.$ = undefined;
                                    }
                                }
                                scope.updateQueryPredicate();
                            });
                        });

                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.float.query', []);

    module.controller('stdFloatQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdFloatQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-float-query.html'),
                    controller: 'stdFloatQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.integer.query', []);

    module.controller('stdIntegerQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdIntegerQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-integer-query.html'),
                    controller: 'stdIntegerQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.integer.range.query', []);

    module.controller('stdIntegerRangeQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var startValue = $scope.field.property.startValue;
            var endValue = $scope.field.property.endValue;
            var startDefault = $scope.field.property.startDefault;
            var endDefault = $scope.field.property.endDefault;
            var startInclusive = 'greater-than-or-equal'; //$scope.field.property.startInclusive;
            var endInclusive = 'less-than-or-equal'; //$scope.field.property.endInclusive;

            var onClearCB = function () {
                return function () {
                    $scope.data.startValue = undefined;
                    $scope.data.endValue = undefined;
                }
            }();

            var onDefaultCB = function () {
                return function () {
                    $scope.data.startValue = startDefault;
                    $scope.data.endValue = endDefault;
                }
            }();

            var startOperator = operatorLookup[startInclusive].operator;
            var endOperator = operatorLookup[endInclusive].operator;

            $scope.updateQueryPredicate = function() {
                var queryPredicate = $scope.field.queryPredicate;
                var predicates = [];

                if ($scope.data.startValue) {
                    predicates.push(queryPredicate.create('', startOperator, $scope.data.startValue));
                }

                if ($scope.data.endValue) {
                    predicates.push(queryPredicate.create('', endOperator, $scope.data.endValue));
                }
                if (predicates.length) {
                    var predicate = predicates[0];
                    if (predicates.length > 1)
                        predicate = predicate.and(predicates[1]);
                    queryPredicate.set(predicate);
                } else
                    queryPredicate.clear();
            };

            $scope.onStartOperatorClick = function() {
                $scope.data.startValue = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.onEndOperatorClick = function() {
                $scope.data.endValue = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.data = {
                startValue: undefined,
                endValue: undefined
            };

            $scope.startOperatorImage = operatorLookup[startInclusive].operatorImage;
            $scope.startOperatorImageMessage = operatorLookup[startInclusive].operatorImageMessage;
            $scope.endOperatorImage = operatorLookup[endInclusive].operatorImage;
            $scope.endOperatorImageMessage = operatorLookup[endInclusive].operatorImageMessage;

            $scope.init = function () {
                if (startValue)
                    $scope.startValue = startValue;
                if (endValue)
                    $scope.endValue = endValue;
                if (startDefault)
                    $scope.startValue = startDefault;
                if (endDefault)
                    $scope.endValue = endDefault;

                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdIntegerRangeQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-integer-range-query.html'),
                    controller: 'stdIntegerRangeQueryController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.intl.address.basic.query', []);

    module.controller('stdIntlAddressBasicQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdIntlAddressBasicQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-intl-address-basic-query.html'),
                    controller: 'stdIntlAddressBasicQueryController',
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
                            var stateProvinceLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var postalCodeLabel = angular.element(element[0].querySelectorAll('label')[5]);
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
                                        predicates.push(queryPredicate.create('Country', 'contains', country));

                                    var city = scope.field.children.city.value.$;
                                    if (typeof city !== 'undefined')
                                        predicates.push(queryPredicate.create('City', 'contains', city));

                                    var stateProvince = scope.field.children.stateProvince.value.$;
                                    if (typeof stateProvince !== 'undefined')
                                        predicates.push(queryPredicate.create('StateProvince', 'contains', stateProvince));

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
(function(){
    'use strict';

    var module = angular.module('std.null.not.null.query', []);

    module.controller('stdNullNotNullController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                if (typeof value !== 'undefined') {
                    if (value) {
                        operator = 'ne';
                    } else {
                        operator = 'eq';
                    }
                    queryPredicate.set('', operator, null);
                } else {
                    queryPredicate.clear();
                }
            };

            $scope.data = {
                choices: [],
                label: undefined
            };

            var loadChoices = function() {
                $scope.data.choices.push({label: 'Is Set', value: {$: 1}});
                $scope.data.choices.push({label: 'Is Not Set', value: {$: 0}});
                $scope.data.choices.unshift({label: '', value: {$: undefined}});

                if (ctrlValueHasValue) {
                    $scope.data.label = $scope.data.choices.filter(function (obj) {
                        return obj.value.$ === ctrlValue;
                    })[0].label;
                    $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                } else if (ctrlDefaultHasValue)
                    $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                else
                    $scope.field.value.$ = undefined;

                $scope.updateQueryPredicate();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup['equal'].operatorImage;
            $scope.operatorImageMessage = operatorLookup['equal'].operatorImageMessage;

            if(ctrlValue === null) {
                $scope.data.label = 'Null';
                $scope.field.value.$ = null;
                $scope.updateQueryPredicate();
            }

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                loadChoices();
            };
        }]);

    module.directive('stdNullNotNullQuery',
        ['$templateCache', '$timeout',
            function ($templateCache, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-null-not-null-query.html'),
                    controller: 'stdNullNotNullController',
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        $timeout(function() {
                            var select = element[0].querySelectorAll('select')[0];

                            angular.element(select).bind('keydown', function (e) {
                                if (e.keyCode === 46) {
                                    scope.field.value.$ = undefined;
                                }
                                scope.updateQueryPredicate();
                            });
                        });

                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.or.list.checkbox.query', []);

    module.controller('stdOrListCheckboxQueryController', ['$scope', 'stdOperatorLookup', 'stdUtil',
        function ($scope, operatorLookup, util) {
            var ctrlValue = $scope.field.property.value ? $scope.field.property.value : [];
            var ctrlDefault = $scope.field.property.default ? $scope.field.property.default : [];
            var ctrlLabelDefault = $scope.field.property.labelDefault ? $scope.field.property.labelDefault : [];
            var ctrlValueHasValue = ctrlValue.length > 0;
            var ctrlDefaultHasValue = ctrlDefault.length > 0;
            var ctrlLabelDefaultHasValue = ctrlLabelDefault.length > 0;
            var operator = operatorLookup[$scope.field.property.operator].operator;
            var unregOnChoicesChange = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        angular.forEach($scope.data.choices, function (choice) {
                            choice.checked = ctrlDefault.indexOf(choice.value.$) !== -1;
                        });
                    else
                        angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var queryPredicate = $scope.field.queryPredicate;
                var predicates = [];

                angular.forEach($scope.data.choices, function (choice) {
                    if (choice.checked)
                        predicates.push(queryPredicate.create('', operator, choice.value.$));
                });

                if (predicates.length) {
                    var predicate = predicates[0];
                    for (var i = 1; i < predicates.length; i++) {
                        predicate = predicate.or(predicates[i]);
                    }
                    queryPredicate.set(predicate);
                } else
                    queryPredicate.clear();
            };

            var loadChoices = function(choices) {
                if (choices == null) return;
                angular.forEach(choices, function (choice) {
                    if (ctrlValueHasValue) {
                        if (ctrlValue.indexOf(choice.value.$) !== -1) {
                            $scope.data.labels.push(choice.label);
                            choice["checked"] = true;
                        }
                    } else if (ctrlDefaultHasValue) {
                        choice["checked"] = ctrlDefault.indexOf(choice.value.$.toString()) !== -1;
                    }  else if (ctrlLabelDefaultHasValue) {
                        choice["checked"] = ctrlLabelDefault.indexOf(choice.label) !== -1;
                    } else {
                        choice["checked"] = false;
                    }
                    $scope.data.choices.push(angular.copy(choice));
                    $scope.updateQueryPredicate();
                });

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({
                        checked: false,
                        label: 'Null',
                        value: { $: null }
                    })
                }

                $scope.updateQueryPredicate();
            };

            $scope.data = { choices: [], labels: [] };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return !ctrlValueHasValue;
            };

            $scope.onOperatorClick = function () {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                if ($scope.checked) {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = false;
                    });
                } else {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = true;
                    });
                }
                $scope.updateQueryPredicate();
            };

            $scope.$watch('data.choices', function () {
                $scope.checked = $scope.data.choices.filter(function (obj) {
                    return obj.checked === true
                }).length > 0;
            }, true);

            unregOnChoicesChange = $scope.field.onChoicesChanged(loadChoices);

            $scope.$on("$destroy", function () {
                unregOnChoicesChange();
            });

            $scope.init = function () {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdOrListCheckboxQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: ['^truSearchGroup', '^truLabelContainer'],
                    template: $templateCache.get('src/templates/query/std-or-list-checkbox-query.html'),
                    controller: 'stdOrListCheckboxQueryController',
                    link: function (scope, element, attrs, ctrls) {
                        scope.searchGroupCtrl = ctrls[0];
                        scope.labelContainerCtrl = ctrls[1];

                        var labels = element[0].querySelectorAll('label');

                        if (ctrls[1]) {
                            for (var i = 0; i < labels.length; i++) {
                                ctrls[1].addLabel(labels[i]);
                            }
                        }
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.percent.query', []);

    module.controller('stdPercentQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdPercentQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-percent-query.html'),
                    controller: 'stdPercentQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.radio.list.button.query', []);

    module.controller('stdRadioListButtonQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value ? $scope.field.property.value : [];
            var ctrlDefault = $scope.field.property.default ? $scope.field.property.default : [];
            var ctrlValueHasValue = ctrlValue.length > 0;
            var ctrlDefaultHasValue = ctrlDefault.length > 0;
            var operator = operatorLookup[$scope.field.property.operator].operator;
            var unregOnChoicesChange = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        angular.forEach($scope.data.choices, function (choice) {
                            choice.checked = ctrlDefault.indexOf(choice.value.$) !== -1;
                        });
                    else
                        angular.forEach($scope.data.choices, function (choice) { choice.checked = false; });

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var queryPredicate = $scope.field.queryPredicate;
                var predicates = [];

                angular.forEach($scope.data.choices, function (choice) {
                    if (choice.checked)
                        predicates.push(queryPredicate.create('', operator, choice.value.$));
                });

                if (predicates.length) {
                    var predicate = predicates[0];
                    for (var i = 1; i < predicates.length; i++) {
                        predicate = predicate.or(predicates[i]);
                    }
                    queryPredicate.set(predicate);
                } else
                    queryPredicate.clear();
            };

            $scope.data = { choices: [], labels: [] };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.valueIsUndefined = function () {
                return !ctrlValueHasValue;
            };

            $scope.onOperatorClick = function () {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                if ($scope.checked) {
                    angular.forEach($scope.data.choices, function (choice) {
                        choice.checked = false;
                    });
                }

                $scope.updateQueryPredicate();
            };

            $scope.$watch('data.choices', function () {
                $scope.checked = $scope.data.choices.filter(function (obj) {
                    return obj.checked === true
                }).length > 0;
            }, true);

            var loadChoices = function(choices) {
                angular.forEach(choices, function (choice) {
                    if (ctrlValueHasValue) {
                        if (ctrlValue.indexOf(choice.value.$) !== -1) {
                            $scope.data.labels.push(choice.label);
                            choice["checked"] = true;
                        }
                    } else if (ctrlDefaultHasValue) {
                        choice["checked"] = ctrlDefault.indexOf(choice.value.$) !== -1;
                    } else {
                        choice["checked"] = false;
                    }
                    $scope.data.choices.push(choice);
                    $scope.updateQueryPredicate();
                });

                if ($scope.field.type.isNullable) {
                    $scope.data.choices.push({
                        checked: false,
                        label: 'Null',
                        value: { $: null }
                    })
                }

                $scope.updateQueryPredicate();
            };

            unregOnChoicesChange = $scope.field.onChoicesChanged(loadChoices);

            $scope.$on("$destroy", function () {
                unregOnChoicesChange();
            });

            $scope.init = function () {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdRadioListButtonQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-radio-list-button-query.html'),
                    controller: 'stdRadioListButtonQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.record.picker.query', []);

    module.directive('stdPickerView', ['$compile', '$http', function ($compile, $http) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {
                var tpl = $compile('<div ' + scope.field.property.pickerName + '-picker' + ' field="field" view="view"></div>')(scope);
                element.append(tpl);
            }
        };
    }]);

    module.controller('stdRecordPickerModalController',
        ['$scope', '$element', '$timeout', '$document', 'stdModal',
            function ($scope, $element, $timeout, $document, modal) {
                var keydownListener = function (e) {
                    if (e.keyCode === 27) {
                        $timeout(function () { modal.reject() });
                    }
                };

                $scope.modal = {
                    height:400,
                    width:700
                };

                $scope.selectedId = 0;
                $scope.childSearchIsFocused = true;

                $scope.clear = function () {
                    $timeout(function () { modal.resolve(null) });
                };

                $scope.onClearKeydown = function (e) {
                    if (e.keyCode === 13) {
                        $timeout(function () { modal.resolve(null) });
                    }
                };

                $scope.cancel = function (e) {
                    if (e.keyCode === 13) { e.preventDefault(); return false; }
                    $timeout(function () { modal.reject() });
                };


                $scope.submit = function (id) {
                    if (id)
                        $scope.selectedId = id;
                    $timeout(function () { modal.resolve($scope.selectedId) });
                };

                $scope.$on('$destroy', function () {
                    $document[0].removeEventListener('keydown', keydownListener);
                });

                $document[0].addEventListener('keydown', keydownListener, true);
            }]);

    module.controller('stdRecordPickerQueryController',
        ['$scope', '$element', '$timeout', 'stdModal', 'stdOperatorLookup', 'stdUtil',
            function ($scope, $element, $timeout, modal, operatorLookup, util) {
                var self = this;

                var ctrlValue = $scope.field.property.value;
                var ctrlDefault = $scope.field.property.default;
                var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
                var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
                var operator = operatorLookup[$scope.field.property.operator].operator;

                var onClearCB = function(){
                    return function() {
                        if (ctrlValueHasValue) return;
                        $scope.field.value.$ = undefined;
                        $scope.data.displayValue = undefined;
                        $scope.updateQueryPredicate();
                    }
                }();

                var onDefaultCB = function(){
                    return function() {
                        if (ctrlValueHasValue) return;
                        if (ctrlDefaultHasValue)
                            $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                        else
                            $scope.field.value.$ = undefined;

                        $scope.updateQueryPredicate();
                    }
                }();

                $scope.updateQueryPredicate = function() {
                    var value = $scope.field.value.$;
                    var queryPredicate = $scope.field.queryPredicate;
                    if (typeof value !== 'undefined') {
                        queryPredicate.set('', operator, value);
                    } else {
                        queryPredicate.clear();
                    }
                };

                $scope.valueIsUndefined = function () {
                    return (typeof ctrlValue === 'undefined');
                };

                $scope.controlValueIsUndefined = function () {
                    return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '';
                };

                $scope.onOperatorClick = function() {
                    if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                    $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                };

                $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
                $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;


                $scope.data = {
                    choices: [],
                    label: undefined
                };

                if(ctrlValue === null) {
                    $scope.data.label = 'Null';
                    $scope.field.value.$ = null;
                } else {
                    if (ctrlValueHasValue) {
                        $scope.field.queryByRef(ctrlValue).then(function (results) {
                            $scope.data.label = results.label;
                        });
                        $scope.field.value.$ = util.tryParseInt(ctrlValue, ctrlValue);
                    } else if (ctrlDefaultHasValue)
                        $scope.field.value.$ = util.tryParseInt(ctrlDefault, ctrlDefault);
                    else
                        $scope.field.value.$ = undefined;
                }

                $scope.init = function() {
                    $scope.searchGroupCtrl.registerClear(onClearCB);
                    $scope.searchGroupCtrl.registerDefault(onDefaultCB);
                };

                self.cleanUp = function () {
                    $scope.open = false;
                    $timeout(function () {
                        $element[0].querySelectorAll('button')[0].focus();
                    });
                };


                self.showRecordPickerModal = function () {
                    $scope.open = true;
                    $timeout(function () {
                        var promise = modal.open(
                            'recordPicker'
                        );
                        promise.then(
                            function handleResolve(response) {
                                $scope.field.queryByRef(response).then(function (results) {
                                    $scope.data.displayValue = results.label;
                                    $scope.field.value.$ = response;
                                    $scope.updateQueryPredicate();
                                });
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                    $scope.$destroy();
                                } else {
                                    self.cleanUp();
                                }
                            },
                            function handleReject(error) {
                                if ($scope.field.context.isGrid) {
                                    $element.remove();
                                } else {
                                    self.cleanUp();
                                }
                            }
                        );
                    });
                };

                $scope.onClick = function () {
                    if (!$scope.open)
                        self.showRecordPickerModal();
                };

                $scope.onKeydown = function (e) {
                    if (!$scope.open && e.keyCode === 13)
                        self.showRecordPickerModal();
                };

                $scope.showArrow = false;
                $scope.onInputMousedown = function () {
                    if ($scope.showArrow) return;
                    $scope.showArrow = true;
                    $timeout(function () {
                        $scope.showArrow = false;
                    }, 5000);
                };

                $scope.updateQueryPredicate();
            }]);

    module.directive('stdRecordPickerQuery',
        ['$templateCache', '$timeout', 'stdDisplay',
            function ($templateCache, $timeout, display) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    controller: 'stdRecordPickerQueryController',
                    template: $templateCache.get('src/templates/query/std-record-picker-query.html'),
                    link: function (scope, element, attrs, searchGroupCtrl) {
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.textbox.query', []);

    module.controller('stdTextboxQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined' || $scope.field.value.$ === '');
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.updateQueryPredicate();

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdTextboxQuery',
        ['$templateCache', '$timeout',
            function ($templateCache, $timeout) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-textbox-query.html'),
                    controller: 'stdTextboxQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.usa.address.query', []);

    module.controller('stdUsaAddressQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {

        }]);

    module.directive('stdUsaAddressQuery',
        ['$templateCache',
            function ($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-usa-address-query.html'),
                    controller: 'stdUsaAddressQueryController',
                    link: {
                        pre: function (scope, element) {
                            scope.field.children.address1.property.operator = 'contains';
                            scope.field.children.address2.property.operator = 'contains';
                            scope.field.children.city.property.operator = 'contains';
                            scope.field.children.zip.property.operator = 'contains';
                            scope.field.children.zip.property.entryFilter = scope.field.property.zipEntryFilter;
                            scope.field.children.zip.property.watermark = scope.field.property.zipWatermark;
                        },
                        post: function (scope, element, attrs, searchGroupCtrl) {
                            var stateLabel = angular.element(element[0].querySelectorAll('label')[4]);
                            var zipLabel = angular.element(element[0].querySelectorAll('label')[5]);
                            stateLabel.addClass('ttl-no-label-width');
                            zipLabel.addClass('ttl-no-label-width');

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

                                    var city = scope.field.children.city.value.$;
                                    if (typeof city !== 'undefined')
                                        predicates.push(queryPredicate.create('City', 'contains', city));

                                    var state = scope.field.children.state.value.$;
                                    if (typeof state !== 'undefined' && state !== '')
                                        predicates.push(queryPredicate.create('StateStdUSAStateRef', 'eq', state));

                                    var zip = scope.field.children.zip.value.$;
                                    if (typeof zip !== 'undefined')
                                        predicates.push(queryPredicate.create('Zip', 'contains', zip));

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
(function(){
    'use strict';

    var module = angular.module('std.usa.dollar.query', []);

    module.controller('stdUsaDollarQueryController', ['$scope', 'stdOperatorLookup',
        function ($scope, operatorLookup) {
            var ctrlValue = $scope.field.property.value;
            var ctrlDefault = $scope.field.property.default;
            var ctrlValueHasValue = typeof ctrlValue !== 'undefined';
            var ctrlDefaultHasValue = typeof ctrlDefault !== 'undefined';
            var operator = operatorLookup[$scope.field.property.operator].operator;

            if (ctrlValueHasValue)
                $scope.field.value.$ = ctrlValue;
            else if (ctrlDefaultHasValue)
                $scope.field.value.$ = ctrlDefault;
            else
                $scope.field.value.$ = undefined;

            var onClearCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    $scope.field.value.$ = undefined;
                    $scope.updateQueryPredicate();
                }
            }();

            var onDefaultCB = function(){
                return function() {
                    if (ctrlValueHasValue) return;
                    if (ctrlDefaultHasValue)
                        $scope.field.value.$ = ctrlDefault;
                    else
                        $scope.field.value.$ = undefined;

                    $scope.updateQueryPredicate();
                }
            }();

            $scope.updateQueryPredicate = function() {
                var value = $scope.field.value.$;
                var queryPredicate = $scope.field.queryPredicate;
                value ? queryPredicate.set('', operator, value) : queryPredicate.clear();
            };

            $scope.valueIsUndefined = function () {
                return (typeof ctrlValue === 'undefined');
            };

            $scope.controlValueIsUndefined = function () {
                return (typeof $scope.field === 'undefined') || (typeof $scope.field.value.$ === 'undefined') || $scope.field.value.$ === '' || $scope.field.value.$ === null;
            };

            $scope.onOperatorClick = function() {
                if (ctrlValueHasValue || $scope.field.context.isEditing) return;
                $scope.field.value.$ = undefined;
                $scope.updateQueryPredicate();
            };

            $scope.operatorImage = operatorLookup[$scope.field.property.operator].operatorImage;
            $scope.operatorImageMessage = operatorLookup[$scope.field.property.operator].operatorImageMessage;

            $scope.init = function() {
                $scope.searchGroupCtrl.registerClear(onClearCB);
                $scope.searchGroupCtrl.registerDefault(onDefaultCB);
            }
        }]);

    module.directive('stdUsaDollarQuery',
        ['$templateCache',
            function($templateCache) {
                return {
                    restrict: 'E',
                    scope: {
                        field: '=',
                        label: '@'
                    },
                    require: '^truSearchGroup',
                    template: $templateCache.get('src/templates/query/std-usa-dollar-query.html'),
                    controller: 'stdUsaDollarQueryController',
                    link: function(scope, element, attrs, searchGroupCtrl){
                        scope.searchGroupCtrl = searchGroupCtrl;
                        scope.init();
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.calendar', []);

    module.directive('stdCalendar',
        ['$compile', '$document', '$timeout',
            function ($compile, $document, $timeout) {
                return {
                    scope: {
                        display: '='
                    },
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var calDaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        var calMonthsLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var calDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                        var year = null;
                        var month = null;
                        var calendar = null;
                        var mouseOver = false;
                        var clonedScoped = null;

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        var getCurrentYear = function() {
                            var today = new Date();
                            return today.getFullYear();
                        };

                        var getCurrentMonth = function() {
                            var today = new Date();
                            return today.getMonth();
                        };

                        var getParsedDate = function(unParsedDate) {
                            var parsedDate = unParsedDate.replace( /^\D+/g, '');
                            var month = parsedDate.substring(0,2) - 1;
                            var year = parsedDate.substring(6,10);
                            var date = {};
                            date.month = month;
                            date.year = year;
                            return date;
                        };

                        var setStartDate = function() {
                            var dateParts = element[0].value.split(/[\s]+/);
                            var date = dateParts[0] ? dateParts[0] : '';
                            dateParts = date.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');

                            var isNumeric = isNumber(datePartsJoined);
                            if (isNumeric) {
                                date = getParsedDate(date);
                                month = date.month;
                                year = date.year;
                            } else {
                                month = getCurrentMonth();
                                year = getCurrentYear();
                            }
                            var today = new Date();
                            return today.getMonth();
                        };

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        var getHTML = function(){

                            // get first day of month
                            var firstDay = new Date(year, month, 1);
                            var startingDay = firstDay.getDay();

                            // find number of days in month
                            var monthLength = calDaysInMonth[month];

                            // compensate for leap year
                            if (0 == 1) { // February only!
                                if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                                    monthLength = 29;
                                }
                            }

                            // do the header
                            var monthName = calMonthsLabels[month];
                            var html = '<table class="ttl-calendar-table" data-ng-mouseenter="onMouseEnter()" data-ng-mouseleave="onMouseLeave()">';
                            html += '<tr><th colspan="7"><button class="tvl-btn ttl-header-previous-button" data-ng-click="previous()">&#60;</button><div class="ttl-header-text">';
                            html +=  monthName + "&nbsp;" + year;
                            html += '</div><button class="tvl-btn ttl-header-next-button" data-ng-click="next()">&#62;</button></th></tr>';
                            html += '<tr class="ttl-calendar-header">';
                            for(var i = 0; i <= 6; i++ ){
                                html += '<td class="ttl-calendar-header-day">';
                                html += calDaysLabels[i];
                                html += '</td>';
                            }
                            html += '</tr><tr>';

                            // fill in the days
                            var day = 1;
                            // this loop is for is weeks (rows)
                            for (var i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (var j = 0; j <= 6; j++) {
                                    html += '<td class="ttl-calendar-day"><div data-ng-class="{\'ttl-calendar-day-hover\': hover' + day + '}" data-ng-click="daySelected(' + day + ')" data-ng-mouseenter="hover' + day + ' = true" data-ng-mouseleave="hover' + day + ' = false"><p class="ttl-calendar-day-text">';
                                    if (day <= monthLength && (i > 0 || j >= startingDay)) {
                                        html += day;
                                        day++;
                                    }
                                    html += '</p></div></td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength) {
                                    break;
                                } else {
                                    html += '</tr><tr>';
                                }
                            }
                            html += '</tr></table>';

                            return html;
                        };

                        $document.bind('mouseup', function() {
                            scope.$apply(function() {
                                if (!mouseOver && scope.display) {
                                    mouseOver = false;
                                    scope.display = false;
                                }
                            });
                        });

                        scope.$watch('display', function(val) {
                            if (val) {
                                setStartDate();
                                clonedScoped = scope.$new();
                                calendar = $compile(getHTML())(clonedScoped);
                                element.after(calendar);
                            } else if (!val && calendar){
                                mouseOver = false;
                                clonedScoped.$destroy();
                                calendar.remove();
                            }
                        });

                        scope.previous = function(day) {
                            calendar.remove();
                            if (month > 0) {
                                month--;
                            } else {
                                month = 11;
                                year--;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };

                        scope.next = function(day) {
                            calendar.remove();
                            if (month < 11) {
                                month++;
                            } else {
                                month = 0;
                                year++;
                            }
                            calendar = $compile(getHTML())(scope);
                            element.after(calendar);
                        };


                        scope.onMouseEnter = function() {
                            mouseOver = true;
                        };

                        scope.onMouseLeave = function() {
                            mouseOver = false;
                        };

                        scope.daySelected = function(day) {
                            var dateParts = ngModelCtrl.$viewValue.split(/[\s]/);
                            if (typeof dateParts[1] === 'undefined' || typeof dateParts[2] === 'undefined') {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4));
                                    ngModelCtrl.$render();
                                    element[0].focus();
                                }, 0);
                            } else {
                                $timeout(function() {
                                    ngModelCtrl.$setViewValue(zeroPad(month + 1, 2) + '/' + zeroPad(day, 2) + '/' + zeroPad(year, 4) + ' ' + dateParts[1] + ' ' + dateParts[2]);
                                    ngModelCtrl.$render();
                                    element[0].focus();
                                }, 0);
                            }
                            scope.display = false;
                        };
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.date', []);

    module.directive('stdDate',
        ['$filter', '$timeout', 'stdUtil',
            function ($filter, $timeout, util) {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = 'MM/dd/yyyy';
                        var timeZone = 0;
                        var formatParts = format.split('/');
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();

                        var range1Start = 0;
                        var range1End = position1Format.length;
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;
                        var range3Start = range2End + 1;
                        var range3End = range3Start + position3Format.length;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);

                        var selectedRange = [];
                        var rangeInitialized = false;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (position1Format === 'mm') {
                                        if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (oldValue === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue)) && newValue <= 1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, false);
                                            } else if (rangeInitialized && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, false);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range3Start, range3End, range3, true);
                                                } else {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'dd') {
                                        if ([0, 1, 2].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [0, 1].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setRange(range3Start, range3End, range3, true);
                                            setValue(zeroPad(newValue, 4));
                                            setRange(range3Start, range3End, range3, false);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue))) {
                                                setValue('0' + newValue.toString());
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1)
                                                    setRange(range3Start, range3End, range3, true);
                                                else
                                                    setRange(range2Start, range2End, range2, false);
                                            } else {
                                                setRange(range3Start, range3End, range3, true);
                                                setValue(zeroPad(newValue, 4));
                                                setRange(range3Start, range3End, range3, false);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range3) {
                                    if (position3Format === 'yyyy') {
                                        if (rangeInitialized) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('200' + numberStr);
                                        } else if ([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009].indexOf(oldValue) > -1) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('20' + (oldValue % 10).toString() + numberStr);
                                        } else if (!isNaN(newValue) && selectedText.length >= 4) {
                                            var trimmedOldValue = selectedText.substring(1);
                                            newValue = trimmedOldValue + getCharFromKeyCode(e).toString();
                                        }
                                        setValue(zeroPad(newValue, 4));
                                        setRange(range3Start, range3End, range3, false);
                                    }
                                }
                            }
                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                var caretPosition = getCaretPosition();
                                var sel = window.getSelection();
                                sel.removeAllRanges();

                                if (range1.indexOf(caretPosition) > -1)
                                    setRange(range1Start, range1End, range1, true);

                                if (range2.indexOf(caretPosition) > -1)
                                    setRange(range2Start, range2End, range2, true);

                                if (range3.indexOf(caretPosition) > -1)
                                    setRange(range3Start, range3End, range3, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = 'mm/dd/yyyy';
                        });

                        element.addClass('ttl-date-selection');

                        ngModelCtrl.$formatters.push(function (val) {
                            ngModelCtrl.$setValidity('invalid-date', true);
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                var utc = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate());
                                return $filter('date')(utc, 'MM/dd/yyyy');
                            } else {
                                return 'mm/dd/yyyy';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'mm/dd/yyyy') {
                                ngModelCtrl.$setValidity('invalid-date', true);
                                return null;
                            }

                            var dateParts = val.split(/[\/]+/);
                            var datePartsJoined = dateParts.join('');
                            var isNumeric = isNumber(datePartsJoined);
                            if (!isNumeric) {
                                ngModelCtrl.$setValidity('invalid-date', false);
                                return new Date('Invalid');
                            }

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var numberOfDays = monthDays[month - 1];
                            day = (numberOfDays - day) >= 0 ? day : numberOfDays;
                            if (day !== parseInt(dateParts[1])) {
                                ngModelCtrl.$setViewValue(dateParts[0] + '/' + zeroPad(day, 2) + '/' + dateParts[2]);
                            }
                            ngModelCtrl.$setValidity('invalid-date', true);
                            return new Date(year, (month - 1), day);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.datetime', []);

    module.directive('stdDatetime',
        ['$filter', '$timeout', '$parse',
            function ($filter, $timeout, $parse) {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        //TODO: Would like to pass field in as an isolated scope variable. Cannot do this currently due to the calendar directive already asking for isolation.
                        var isNullable = $parse(attrs.isNullable)(scope);
                        var format = 'MM/dd/yyyy hh:mm a';
                        var timeZone = 0;
                        var formatParts = format.split(/[\s/:]+/);
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();
                        var position4Format = formatParts[3].toLowerCase();
                        var position5Format = formatParts[4].toLowerCase();
                        var position6Format = formatParts[5].toLowerCase();

                        //1
                        var range1Start = 0;
                        var range1End = position1Format.length;
                        //2
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;
                        //3
                        var range3Start = range2End + 1;
                        var range3End = range3Start + position3Format.length;
                        //4
                        var range4Start = range3End + 1;
                        var range4End = range4Start + position4Format.length;
                        //5
                        var range5Start = range4End + 1;
                        var range5End = range5Start + position5Format.length;
                        //6
                        var range6Start = range5End + 1;
                        var range6End = range6Start + 2;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);
                        var range4 = createRange(range4Start, range4End);
                        var range5 = createRange(range5Start, range5End);
                        var range6 = createRange(range6Start, range6End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var externalEvent = false;
                        var focusedValue;
                        ngModelCtrl.rangeInitialized = rangeInitialized;
                        var militaryTime = false; //scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if (e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function (e) {
                            if (!focusedValue && focusedValue !== null)
                                focusedValue = scope.field.value.$;

                            if (e.keyCode === 27) {
                                scope.field.value.$ = focusedValue;
                                //ngModelCtrl.$setValidity('invalid-date', true);
                                //ngModelCtrl.$setViewValue($filter('date')(new Date(focusedValue), 'MM/dd/yyyy hh:mm a'));
                                //ngModelCtrl.$render();
                                e.preventDefault();
                                return;
                            }

                            if (e.keyCode === 37) {
                                if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                } else if (selectedRange === range5) {
                                    setRange(range4Start, range4End, range4, true);
                                } else if (selectedRange === range4) {
                                    setRange(range3Start, range3End, range3, true);
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                } else if (selectedRange === range3) {
                                    setRange(range4Start, range4End, range4, true);
                                } else if (selectedRange === range4) {
                                    setRange(range5Start, range5End, range5, true);
                                } else if (selectedRange === range5) {
                                    setRange(range6Start, range6End, range6, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range6Start, range6End, range6, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range4 && !isNaN(selectedText)) {
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range4 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range3, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range5 && !isNaN(selectedText)) {
                                    setValue(position5Format);
                                    setRange(range5Start, range5End, range5, true);
                                }
                                else if (selectedRange === range5 && isNaN(selectedText)) {
                                    setRange(range4Start, range4End, range4, true);
                                    setValue(position4Format);
                                    setRange(range4Start, range4End, range4, true);
                                }
                                else if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                ngModelCtrl.$setViewValue('mm/dd/yyyy hh:mm AM');
                                ngModelCtrl.$render();
                                setRange(range1Start, range1End, range1, true);
                                e.preventDefault();
                                return;
                                //var selectedText = getSelectedText();
                                //if (selectedRange === range1 && !isNaN(selectedText)) {
                                //    setValue(position1Format);
                                //    setRange(range1Start, range1End, range1, true);
                                //}
                                //else if (selectedRange === range1 && isNaN(selectedText)) {
                                //    setRange(range2Start, range2End, range2);
                                //    setValue(position2Format);
                                //    setRange(range2Start, range2End, range2, true);
                                //}
                                //else if (selectedRange === range2 && !isNaN(selectedText)) {
                                //    setValue(position2Format);
                                //    setRange(range2Start, range2End, range2, true);
                                //}
                                //else if (selectedRange === range2 && isNaN(selectedText)) {
                                //    setRange(range3Start, range3End, range3, true);
                                //    setValue(position3Format);
                                //    setRange(range3Start, range3End, range3, true);
                                //}
                                //else if (selectedRange === range3 && !isNaN(selectedText)) {
                                //    setValue(position3Format);
                                //    setRange(range3Start, range3End, range3, true);
                                //}
                                //else if (selectedRange === range3 && isNaN(selectedText)) {
                                //    setRange(range4Start, range4End, range4, true);
                                //    setValue(position4Format);
                                //    setRange(range4Start, range4End, range4, true);
                                //}
                                //else if (selectedRange === range4 && !isNaN(selectedText)) {
                                //    setValue(position4Format);
                                //    setRange(range4Start, range4End, range4, true);
                                //}
                                //else if (selectedRange === range4 && isNaN(selectedText)) {
                                //    setRange(range5Start, range5End, range5, true);
                                //    setValue(position5Format);
                                //    setRange(range5Start, range5End, range5, true);
                                //}
                                //else if (selectedRange === range5 && !isNaN(selectedText)) {
                                //    setValue(position5Format);
                                //    setRange(range5Start, range5End, range5, true);
                                //}
                                //else if (selectedRange === range5 && isNaN(selectedText)) {
                                //    setRange(range6Start, range6End, range6, true);
                                //}
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range4Start, range4End, range4, true);
                                    e.preventDefault();
                                } else if (selectedRange === range4) {
                                    setRange(range5Start, range5End, range5, true);
                                    e.preventDefault();
                                } else if (selectedRange === range5) {
                                    setRange(range6Start, range6End, range6, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                } else if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                } else if (selectedRange === range4) {
                                    setRange(range3Start, range3End, range3, true);
                                    e.preventDefault();
                                } else if (selectedRange === range5) {
                                    setRange(range4Start, range4End, range4, true);
                                    e.preventDefault();
                                } else if (selectedRange === range6) {
                                    setRange(range5Start, range5End, range5, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                //NOTE: If selectedRange is not set assume an external event triggered the key event.
                                if (selectedRange.length === 0) {
                                    selectedRange = range1;
                                    rangeInitialized = true;
                                    externalEvent = true;
                                }

                                if (selectedRange === range1) {
                                    if (position1Format === 'mm') {
                                        if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (oldValue === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue)) && newValue <= 1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, false);

                                            } else if (rangeInitialized && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, false);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range3Start, range3End, range3, true);
                                                } else {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'dd') {
                                        if ([0, 1, 2].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [0, 1].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range3Start, range3End, range3, true);
                                        } else if (oldValue === 3 && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setRange(range3Start, range3End, range3, true);
                                            setValue(zeroPad(newValue, 4));
                                            setRange(range3Start, range3End, range3, false);
                                        } else {
                                            if ((rangeInitialized || isNaN(oldValue))) {
                                                setValue('0' + newValue.toString());
                                                if ([4, 5, 6, 7, 8, 9].indexOf(newValue) > -1)
                                                    setRange(range3Start, range3End, range3, true);
                                                else
                                                    setRange(range2Start, range2End, range2, false);
                                            } else {
                                                setRange(range3Start, range3End, range3, true);
                                                setValue(zeroPad(newValue, 4));
                                                setRange(range3Start, range3End, range3, false);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range3) {
                                    if (position3Format === 'yyyy') {
                                        if (rangeInitialized) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('200' + numberStr);
                                        } else if ([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009].indexOf(oldValue) > -1) {
                                            newValue = getCharFromKeyCode(e);
                                            var numberStr = newValue.toString();
                                            newValue = parseInt('20' + (oldValue % 10).toString() + numberStr);
                                        } else if (!isNaN(newValue) && selectedText.length >= 4) {
                                            var trimmedOldValue = selectedText.substring(1);
                                            newValue = trimmedOldValue + getCharFromKeyCode(e).toString();
                                        }
                                        setValue(zeroPad(newValue, 4));
                                        setRange(range3Start, range3End, range3, false);
                                    }
                                } else if (selectedRange === range4) {
                                    if (position4Format === 'hh') {
                                        if ([0].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if ([1].indexOf(oldValue) > -1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range5Start, range5End, range5, true);
                                        } else {
                                            if (rangeInitialized || isNaN(oldValue)) {
                                                setValue('0' + newValue.toString());
                                                if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                    setRange(range4Start, range4End, range4, false);
                                                else
                                                    setRange(range5Start, range5End, range5, true);
                                            }
                                            else {
                                                if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range5Start, range5End, range5, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range5Start, range5End, range5, false);
                                                }
                                                else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range5Start, range5End, range5, true);
                                                } else {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range4Start, range4End, range4, true);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range5) {
                                    if (position5Format === 'mm') {
                                        if ([0, 1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range6Start, range6End, range6, true);
                                        } else {
                                            setValue('0' + newValue.toString());
                                            setRange(range5Start, range5End, range5, false);
                                        }
                                    }
                                }
                            }

                            if (selectedRange === range6) {
                                var oldValue = getSelectedText();
                                if (e.keyCode === 65) {
                                    setValue('AM');
                                }
                                if (e.keyCode === 80) {
                                    setValue('PM');
                                }
                                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
                                    setValue(oldValue.toString() === 'AM' ? 'PM' : 'AM');
                                }
                                setRange(range6Start, range6End, range6, false);
                            }

                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function (e) {
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);

                            if (range4.indexOf(caretPosition) > -1)
                                setRange(range4Start, range4End, range4, true);

                            if (range5.indexOf(caretPosition) > -1)
                                setRange(range5Start, range5End, range5, true);

                            if (range6.indexOf(caretPosition) > -1)
                                setRange(range6Start, range6End, range6, true);
                        });

                        element.bind('mousemove', function (e) {
                            if (e.stopPropagation) e.stopPropagation();
                            if (e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function (e) {
                            var time = new Date().getTime();

                            if ((time - mouseDown) < 450) {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function (e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function (e) {
                            e.preventDefault();
                        });

                        element.bind('paste', function (e) {
                            e.preventDefault();
                        });

                        element.bind('focus', function (e) {
                            if (!focusedValue && focusedValue !== null)
                                focusedValue = scope.field.value.$;

                            $timeout(function () {
                                if (externalEvent) {
                                    externalEvent = false;
                                    return;
                                }

                                var caretPosition = getCaretPosition();
                                var sel = window.getSelection();
                                sel.removeAllRanges();

                                if (range1.indexOf(caretPosition) > -1)
                                    setRange(range1Start, range1End, range1, true);

                                if (range2.indexOf(caretPosition) > -1)
                                    setRange(range2Start, range2End, range2, true);

                                if (range3.indexOf(caretPosition) > -1)
                                    setRange(range3Start, range3End, range3, true);

                                if (range4.indexOf(caretPosition) > -1)
                                    setRange(range4Start, range4End, range4, true);

                                if (range5.indexOf(caretPosition) > -1)
                                    setRange(range5Start, range5End, range5, true);

                                if (range6.indexOf(caretPosition) > -1)
                                    setRange(range6Start, range6End, range6, true);
                            }, 0)
                        });

                        element.bind('blur', function (e) {
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = 'mm/dd/yyyy hh:mm AM';
                        });

                        element.addClass('ttl-date-selection');

                        ngModelCtrl.$formatters.push(function (val) {
                            focusedValue = val;
                            ngModelCtrl.$setValidity('invalid-date', true);
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                return $filter('date')(val, 'MM/dd/yyyy hh:mm a');
                            } else {
                                return 'mm/dd/yyyy hh:mm AM';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'mm/dd/yyyy hh:mm AM' || val === 'mm/dd/yyyy hh:mm PM') {
                                if (!isNullable)
                                    ngModelCtrl.$setValidity('invalid-date', false);
                                else
                                    ngModelCtrl.$setValidity('invalid-date', true);

                                return null;
                            }

                            var dateParts = val.split(/[\s/:]+/);
                            var period = dateParts[5];
                            dateParts.pop();
                            var datePartsJoined = dateParts.join('');
                            var isNumeric = isNumber(datePartsJoined);
                            if (!isNumeric || parseInt(dateParts[0]) === 0 || parseInt(dateParts[2]) === 0 || parseInt(dateParts[3]) === 0) {
                                ngModelCtrl.$setValidity('invalid-date', false);
                                return new Date('Invalid');
                            }

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var numberOfDays = monthDays[month - 1];
                            day = (numberOfDays - day) >= 0 ? day : numberOfDays;
                            if (day !== parseInt(dateParts[1])) {
                                ngModelCtrl.$setViewValue(dateParts[0] + '/' + zeroPad(day, 2) + '/' + dateParts[2] + ' ' + dateParts[3] + ':' + dateParts[4] + ' ' + period);
                            }

                            var date = val.replace(/AM||PM/g, '');
                            date = new Date(date);

                            if (!militaryTime) {
                                var hours = parseInt(dateParts[3]);
                                if (period === 'AM' && hours === 12) {
                                    hours = 0;
                                } else if (period === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                                date.setHours(hours);
                            }

                            ngModelCtrl.$setValidity('invalid-date', true);
                            return date;
                        });

                        function fillInPartialDate(val) {
                            var dateParts = val.split(/[\s/:]+/);
                            var period = dateParts[5];
                            dateParts.pop();


                            var today = new Date();

                            var year = parseInt(dateParts[2]);
                            var month = parseInt(dateParts[0]);
                            var day = parseInt(dateParts[1]);
                            var hour = parseInt(dateParts[3]);
                            var minute = parseInt(dateParts[4]);
                            var feb = year % 4 === 0 && (year % 100 || year % 400 === 0) ? 29 : 28;
                            var monthDays = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                            var numberOfDays = monthDays[month - 1];
                            if (numberOfDays)
                                day = (numberOfDays - day) >= 0 ? day : numberOfDays;

                            year = !isNumber(year) ? today.getFullYear() : year;
                            month = !isNumber(month) ? today.getMonth() + 1 : month;
                            day = !isNumber(day) ? today.getDay() + 1 : day;
                            hour = !isNumber(hour) ? 12 : hour;
                            minute = !isNumber(minute) ? 0 : minute;
                            return new Date(month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ' ' + period);
                        }

                        scope.$on('$destroy', function () {
                            if (scope.$parent.field.context.isGrid) {
                                if (ngModelCtrl.$modelValue === null) {
                                    //Do nothing
                                } else if (Object.prototype.toString.call(ngModelCtrl.$modelValue) === "[object Date]") {
                                    if (isNaN(ngModelCtrl.$modelValue.getTime())) {
                                        scope.$parent.field.value.$ = fillInPartialDate(ngModelCtrl.$viewValue);
                                    }
                                }
                                else {
                                    scope.$parent.field.value.$ = fillInPartialDate(ngModelCtrl.$viewValue);
                                }
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.decimal', []);

    module.directive('stdDecimal',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDecimal: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdDecimal.type.isNullable;
                        var decimalPlaces = scope.stdDecimal.type.property.decimalPlaces;
                        var maxValue = scope.stdDecimal.type.property.maximumValue;
                        var minValue = scope.stdDecimal.type.property.minimumValue;
                        maxValue = typeof maxValue === 'undefined' ? 2147483647 : maxValue;
                        minValue = typeof minValue === 'undefined' ? -2147483647 : minValue;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 0;

                        var wholePlaces = 38 - decimalPlaces;

                        function setViewValue(cleanVal, inputVal, newVal, offset) {
                            if (!offset) offset = 0;
                            var start = element[0].selectionStart;
                            var end = element[0].selectionEnd + cleanVal.length - inputVal.length + offset;
                            ngModelCtrl.$setViewValue(newVal);
                            ngModelCtrl.$render();
                            element[0].setSelectionRange(start, end);
                        }

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if ((val.toString().split('.').length - 1) > 1) {
                                setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var negativeCount = (val.match(/-/g) || []).length;
                                        if (negativeCount > 1)
                                            setViewValue(clean, val, clean);
                                        else {
                                            if (wholePlaces === wholeNumber.length || decimalPlaces === fractionalNumber.length)
                                                setViewValue(clean, val, clean, 1);
                                            else
                                                setViewValue(clean, val, clean);
                                        }
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                if (maxValue && number > maxValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                if (minValue && number < minValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString();
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString();
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function(){
    'use strict';

    var module = angular.module('std.download', []);

    module.directive('stdDownload',
        ['$templateCache', '$sce',
            function($templateCache, $sce) {
                return {
                    restrict: 'E',
                    scope: {
                        url: '=',
                        refs: '='
                    },
                    template: $templateCache.get('src/templates/common/download.html'),
                    link: function(scope, element, attrs) {
                        scope.data = {
                            url: undefined,
                            refs: undefined
                        };
                        scope.$watch('url', function(newValue) {
                            if (newValue) {
                                scope.data.url = $sce.trustAsResourceUrl(scope.url);
                                scope.data.refs = scope.refs;
                                element[0].submit();
                            }
                        });
                    }
                };
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.duration', []);

    module.directive('stdDuration',
        ['$filter', '$timeout', '$parse',
            function ($filter, $timeout, $parse) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdDurationPeriod: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        //TODO: Would like to pass field in as an isolated scope variable. Cannot do this currently due to the calendar directive already asking for isolation.
                        var isNullable = $parse(attrs.isNullable)(scope);
                        var format = 'hh:mm a';
                        var timeZone = 0;
                        var formatParts = format.split(/[\s/:]+/);
                        var position1Format = formatParts[0].toLowerCase();
                        var position2Format = formatParts[1].toLowerCase();
                        var position3Format = formatParts[2].toLowerCase();

                        //1
                        var range1Start = 0;
                        var range1End = position1Format.length;
                        //2
                        var range2Start = range1End + 1;
                        var range2End = range2Start + position2Format.length;

                        //3
                        var range3Start = range2End + 1;
                        var range3End = range3Start + 2;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);
                        var range3 = createRange(range3Start, range3End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var externalEvent = false;
                        var focusedValue;
                        ngModelCtrl.rangeInitialized = rangeInitialized;
                        var militaryTime = false; //scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if (e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        function isNumber(n) {
                            return !isNaN(parseFloat(n)) && isFinite(n);
                        }

                        element.bind('keydown', function (e) {
                            if (!focusedValue && focusedValue !== null)
                                focusedValue = scope.field.value.$;

                            if (e.keyCode === 27) {
                                //scope.field.value.$ = focusedValue;
                                //ngModelCtrl.$setValidity('invalid-time', true);
                                //ngModelCtrl.$setViewValue($filter('date')(new Date(focusedValue), 'MM/dd/yyyy hh:mm a'));
                                //ngModelCtrl.$render();
                                e.preventDefault();
                                return;
                            }

                            if (e.keyCode === 37) {
                                if (selectedRange === range3) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                } else if (selectedRange === range1) {
                                    setRange(range3Start, range3End, range3, true);
                                }
                            }
                            if (e.keyCode === 39 || e.keyCode === 191) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                } else if (selectedRange === range2) {
                                    setRange(range3Start, range3End, range3, true);
                                } else if (selectedRange === range3) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range3Start, range3End, range1, true);
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range1, true);
                                }
                                else if (selectedRange === range3 && !isNaN(selectedText)) {
                                    setValue(position3Format);
                                    setRange(range3Start, range3End, range3, true);
                                }
                                else if (selectedRange === range3 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                ngModelCtrl.$setViewValue('hh:mm AM');
                                ngModelCtrl.$render();
                                setRange(range1Start, range1End, range1, true);
                                e.preventDefault();
                                return;
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                //NOTE: If selectedRange is not set assume an external event triggered the key event.
                                if (selectedRange.length === 0) {
                                    selectedRange = range1;
                                    rangeInitialized = true;
                                    externalEvent = true;
                                }

                                if (selectedRange === range1) {
                                    if (position1Format === 'hh') {
                                        if ([0].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if ([1].indexOf(oldValue) > -1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range2Start, range2End, range2, true);
                                        } else {
                                            if (rangeInitialized || isNaN(oldValue)) {
                                                setValue('0' + newValue.toString());
                                                if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                    setRange(range1Start, range1End, range1, false);
                                                else
                                                    setRange(range2Start, range2End, range2, true);
                                            }
                                            else {
                                                if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setRange(range2Start, range2End, range2, true);
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, false);
                                                }
                                                else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range2Start, range2End, range2, true);
                                                } else {
                                                    setValue('0' + newValue.toString());
                                                    setRange(range1Start, range1End, range1, true);
                                                }
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if (position2Format === 'mm') {
                                        if ([0, 1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                            setValue(oldValue.toString() + newValue.toString());
                                            setRange(range1Start, range1End, range1, true);
                                        } else {
                                            setValue('0' + newValue.toString());
                                            setRange(range2Start, range2End, range2, false);
                                        }
                                    }
                                }
                            }

                            if (selectedRange === range3) {
                                var oldValue = getSelectedText();
                                if (e.keyCode === 65) {
                                    setValue('AM');
                                }
                                if (e.keyCode === 80) {
                                    setValue('PM');
                                }
                                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
                                    setValue(oldValue.toString() === 'AM' ? 'PM' : 'AM');
                                }
                                setRange(range3Start, range3End, range3, false);
                            }

                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function (e) {
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);

                            if (range3.indexOf(caretPosition) > -1)
                                setRange(range3Start, range3End, range3, true);
                        });

                        element.bind('mousemove', function (e) {
                            if (e.stopPropagation) e.stopPropagation();
                            if (e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function (e) {
                            var time = new Date().getTime();

                            if ((time - mouseDown) < 450) {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function (e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function (e) {
                            e.preventDefault();
                        });

                        element.bind('paste', function (e) {
                            e.preventDefault();
                        });

                        element.bind('focus', function (e) {


                            $timeout(function () {
                                if (!focusedValue && focusedValue !== null)
                                    focusedValue = scope.field.value.$;

                                if (externalEvent) {
                                    externalEvent = false;
                                    return;
                                }

                                var caretPosition = getCaretPosition();
                                var sel = window.getSelection();
                                sel.removeAllRanges();

                                if (range1.indexOf(caretPosition) > -1)
                                    setRange(range1Start, range1End, range1, true);

                                if (range2.indexOf(caretPosition) > -1)
                                    setRange(range2Start, range2End, range2, true);
                            }, 0)
                        });

                        element.bind('blur', function (e) {
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = 'hh:mm AM';
                        });

                        element.addClass('ttl-date-selection');

                        var fromIsoDuration = function (value) {
                            var result = {};
                            var duration = moment.duration(value)._data;

                            if (duration) {
                                var militaryHours = duration.hours;
                                result.years = duration.years;
                                result.months = duration.months;
                                result.days = duration.days;
                                result.hours = militaryHours > 12 ? militaryHours - 12 : militaryHours;
                                result.hours = militaryHours === 0 ? 12 : result.hours;
                                result.minutes = duration.minutes;
                                result.seconds = duration.seconds;
                                result.period = militaryHours >= 12 ? 'PM' : 'AM';
                                return result;
                            } else {
                                throw new Error('Invalid Format');
                            }
                        };

                        ngModelCtrl.$formatters.push(function (val) {
                            focusedValue = val;
                            ngModelCtrl.$setValidity('invalid-time', true);

                            var time = fromIsoDuration(val);
                            if (time) {
                                return zeroPad(time.hours, 2) + ':' + zeroPad(time.minutes, 2) + ' ' + time.period;
                            } else {
                                return 'hh:mm AM';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === 'hh:mm AM' || val === 'hh:mm PM') {
                                if (!isNullable)
                                    ngModelCtrl.$setValidity('invalid-time', false);
                                else
                                    ngModelCtrl.$setValidity('invalid-time', true);

                                return null;
                            }

                            var timeParts = val.split(/[\s/:]+/);
                            var period = timeParts[2];

                            //if (day !== parseInt(timeParts[1])) {

                            //}
                            //ngModelCtrl.$setViewValue(timeParts[0] + ':' + timeParts[1] + ' ' + period);
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            if (!militaryTime) {
                                if (period === 'AM' && hours === 12) {
                                    hours = 0;
                                } else if (period === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                            }

                            ngModelCtrl.$setValidity('invalid-time', true);
                            return 'PT' + hours + 'H' + minutes + 'M';
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.file.change', []);

    module.directive('stdFileChange',
        ['$parse',
            function ($parse) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        // Get the function provided in the file-change attribute.
                        // Note the attribute has become an angular expression,
                        // which is what we are parsing. The provided handler is
                        // wrapped up in an outer function (attrHandler) - we'll
                        // call the provided event handler inside the handler()
                        // function below.
                        var attrHandler = $parse(attrs['stdFileChange']);

                        // This is a wrapper handler which will be attached to the
                        // HTML change event.
                        var handler = function (e) {
                                // Execute the provided handler in the directive's scope.
                                // The files variable will be available for consumption
                                // by the event handler.
                                attrHandler(scope, { $event: e, files: e.target.files });
                        };

                        // Attach the handler to the HTML change event
                        element[0].addEventListener('change', handler, false);
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.float', []);

    module.directive('stdFloat',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdFloat: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdFloat;

                        ngModelCtrl.$formatters.push(function (val) {
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if ((val.toString().split('.').length - 1) > 1) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            if (number === 'NaN') {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '') + '.' + numericParts[1].toString().replace(/[^0-9]+/g, '');
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' ? '0' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.grid.focus', []);

    module.directive('stdGridFocus',
        ['$document',
            function ($document) {
                return {
                    scope: {
                        stdGridFocus: '='
                    },
                    link: function (scope, element, attrs) {
                        document.addEventListener('focus', function (e) {
                            //NOTE: Firefox does not support e.target
                            var target = e.target || e.srcElement;
                            scope.stdGridFocus = isDescendant(element[0], target) || (target.tagName && target.tagName.toLowerCase() === 'body');
                        }, true);

                        function isDescendant(parent, child) {
                            var node = child.parentNode;
                            while (node != null) {
                                if (node == parent) {
                                    return true;
                                }
                                node = node.parentNode;
                            }
                            return false;
                        }
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.indeterminate', []);

    module.directive('stdIndeterminate',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                      stdIndeterminate: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        if (!scope.stdIndeterminate) return;
                        var truthy = true;
                        var falsy = false;
                        var nully = null;
                        ngModelCtrl.$formatters = [];
                        ngModelCtrl.$parsers = [];
                        ngModelCtrl.$render = function() {
                            var d = ngModelCtrl.$viewValue;
                            element.data('checked', d);
                            switch(d){
                                case truthy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', true);
                                    break;
                                case falsy:
                                    element.prop('indeterminate', false);
                                    element.prop('checked', false);
                                    break;
                                default:
                                    element.prop('indeterminate', true);
                            }
                        };
                        element.bind('click', function() {
                            var d;
                            switch(element.data('checked')){
                                case falsy:
                                    d = truthy;
                                    break;
                                case truthy:
                                    d = nully;
                                    break;
                                default:
                                    d = falsy;
                            }
                            ngModelCtrl.$setViewValue(d);
                            scope.$apply(ngModelCtrl.$render);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.integer.only', []);

    module.directive('stdIntegerOnly',
        [
            function () {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdIntegerOnly.type.isNullable;
                        var isEditContext = scope.stdIntegerOnly.context.isEdit;
                        var isSearchContext = scope.stdIntegerOnly.context.isSearch;
                        var isGridContext = scope.stdIntegerOnly.context.isGrid;
                        var maxValue = scope.stdIntegerOnly.type.property.maximumValue;
                        var minValue = scope.stdIntegerOnly.type.property.minimumValue;
                        maxValue = typeof maxValue === 'undefined' ? 2147483647 : maxValue;
                        minValue = typeof minValue === 'undefined' ? -2147483647 : minValue;

                        function setViewValue(cleanVal, inputVal, newVal) {
                            var start = element[0].selectionStart;
                            var end = element[0].selectionEnd + cleanVal.length - inputVal.length;
                            ngModelCtrl.$setViewValue(newVal);
                            ngModelCtrl.$render();
                            element[0].setSelectionRange(start, end);
                        }

                        ngModelCtrl.$parsers.push(function (val) {
                            var parts = String(val).split('');
                            var isNegative = parts[0] === '-' ? true : false;
                            var clean = val.toString().replace(/[^0-9]+/g, '');

                            if (val !== clean) {
                                if (isNegative)
                                    clean = '-' + clean;

                                if (ngModelCtrl.$viewValue !== clean) {
                                    setViewValue(clean, val, clean);
                                }
                            }

                            if (maxValue && parseInt(clean) > maxValue) {
                                setViewValue(clean, val, ngModelCtrl.$modelValue);
                                return ngModelCtrl.$modelValue;
                            }

                            if (minValue && parseInt(clean) < minValue) {
                                setViewValue(clean, val, ngModelCtrl.$modelValue);
                                return ngModelCtrl.$modelValue;
                            }

                            //clean === '' because isNaN return false for empty string.
                            if (clean === '' && isSearchContext) {
                                return undefined;
                            } else if (clean === '' && (isEditContext || isGridContext)) {
                                return null;
                            } else if (isNaN(clean) && isSearchContext) {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else if (isNaN(clean) && (isEditContext || isGridContext)) {
                                return null;
                            } else
                                return parseInt(clean);
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.intl.phone', []);

    goog.require('goog.dom');
    goog.require('goog.json');
    goog.require('goog.proto2.ObjectSerializer');
    goog.require('goog.string.StringBuffer');
    goog.require('i18n.phonenumbers.AsYouTypeFormatter');
    goog.require('i18n.phonenumbers.PhoneNumberFormat');
    goog.require('i18n.phonenumbers.PhoneNumberType');
    goog.require('i18n.phonenumbers.PhoneNumberUtil');
    goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

    module.directive('stdIntlPhone',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
                        var PNF = i18n.phonenumbers.PhoneNumberFormat;
                        var listener = function () {
                            var clean = $element.val().replace(/[^0-9]/g, '');
                            try {
                                var countryCode = $scope.$parent.field.children.countryCode.value.$ ? $scope.$parent.field.children.countryCode.value.$ : $scope.$parent.field.property.countryCode;
                                var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                                $element.val(phoneUtil.format(number, PNF.NATIONAL));
                            } catch(e) {
                                $element.val(clean);
                            }

                        };

                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue.replace(/[^0-9]/g, '');
                        });

                        ngModelCtrl.$render = function () {
                            var clean = ngModelCtrl.$modelValue;
                            try {
                                var countryCode = $scope.$parent.field.children.countryCode.value.$ ? $scope.$parent.field.children.countryCode.value.$ : $scope.$parent.field.property.countryCode;
                                var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                                $element.val(phoneUtil.format(number, PNF.NATIONAL));
                            } catch (e) {
                                $element.val(clean);
                            }
                        };

                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        $element.bind('paste cut', function () {
                            $browser.defer(listener);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.intl.postal.code', []);

    module.directive('stdIntlPostalCode',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var listener = function () {
                            var value = $element.val().replace(/[^0-9]/g, '');
                            $element.val($filter('zip')(value, false));
                        };

                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue.replace(/[^0-9]/g, '').slice(0, 9);
                        });

                        ngModelCtrl.$render = function () {
                            $element.val($filter('zip')(ngModelCtrl.$viewValue, false));
                        };

                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        $element.bind('paste cut', function () {
                            $browser.defer(listener);
                        });
                    }
                };
            }]);

    module.filter('stdIntlPostalCode', function () {
        return function (zip) {
            if (!zip) { return ''; }

            var value = zip.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return zip;
            }

            var number = value;

            if (value.length > 5) {
                number = number.slice(0, 5) + '-' + number.slice(5, 9);
            }

            return number.trim();
        };
    });
})();
(function(){
    'use strict';

/*
 Attaches input mask onto input element
 */
    angular.module('std.mask', [])
        .value('maskConfig', {
            'maskDefinitions': {
                '9': /\d/,
                'A': /[a-zA-Z]/,
                '*': /[a-zA-Z0-9]/
            }
        })
        .directive('stdMask', ['maskConfig', '$parse', function (maskConfig, $parse) {
            return {
                priority: 100,
                require: 'ngModel',
                restrict: 'A',
                compile: function uiMaskCompilingFunction(){
                    var options = maskConfig;

                    return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller){
                        var maskProcessed = false, eventsBound = false,
                            maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
                        // Minimum required length of the value to be considered valid
                            minRequiredLength,
                            value, valueMasked, isValid,
                        // Vars for initializing/uninitializing
                            originalPlaceholder = iAttrs.placeholder,
                            originalMaxlength = iAttrs.maxlength,
                        // Vars used exclusively in eventHandler()
                            oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

                        function initialize(maskAttr){
                            if (!angular.isDefined(maskAttr)) {
                                return uninitialize();
                            }
                            processRawMask(maskAttr);
                            if (!maskProcessed) {
                                return uninitialize();
                            }
                            initializeElement();
                            bindEventListeners();
                            return true;
                        }

                        function initPlaceholder(placeholderAttr) {
                            if(! angular.isDefined(placeholderAttr)) {
                                return;
                            }

                            maskPlaceholder = placeholderAttr;

                            // If the mask is processed, then we need to update the value
                            if (maskProcessed) {
                                eventHandler();
                            }
                        }

                        function formatter(fromModelValue){
                            if (!maskProcessed) {
                                return fromModelValue;
                            }
                            value = unmaskValue(fromModelValue || '');
                            isValid = validateValue(value);
                            controller.$setValidity('mask', isValid);
                            return isValid && value.length ? maskValue(value) : undefined;
                        }

                        function parser(fromViewValue){
                            if (!maskProcessed) {
                                return fromViewValue;
                            }
                            value = unmaskValue(fromViewValue || '');
                            isValid = validateValue(value);
                            // We have to set viewValue manually as the reformatting of the input
                            // value performed by eventHandler() doesn't happen until after
                            // this parser is called, which causes what the user sees in the input
                            // to be out-of-sync with what the controller's $viewValue is set to.
                            controller.$viewValue = value.length ? maskValue(value) : '';
                            controller.$setValidity('mask', isValid);
                            if (value === '' && iAttrs.required) {
                                controller.$setValidity('required', false);
                            }
                            return isValid ? value : undefined;
                        }

                        var linkOptions = {};

                        if (iAttrs.uiOptions) {
                            linkOptions = scope.$eval('[' + iAttrs.uiOptions + ']');
                            if (angular.isObject(linkOptions[0])) {
                                // we can't use angular.copy nor angular.extend, they lack the power to do a deep merge
                                linkOptions = (function(original, current){
                                    for(var i in original) {
                                        if (Object.prototype.hasOwnProperty.call(original, i)) {
                                            if (!current[i]) {
                                                current[i] = angular.copy(original[i]);
                                            } else {
                                                angular.extend(current[i], original[i]);
                                            }
                                        }
                                    }
                                    return current;
                                })(options, linkOptions[0]);
                            }
                        } else {
                            linkOptions = options;
                        }

                        iAttrs.$observe('stdMask', initialize);
                        iAttrs.$observe('placeholder', initPlaceholder);
                        var modelViewValue = false;
                        iAttrs.$observe('modelViewValue', function(val) {
                            if(val === 'true') {
                                modelViewValue = true;
                            }
                        });
                        scope.$watch(iAttrs.ngModel, function(val) {
                            if(modelViewValue && val) {
                                var model = $parse(iAttrs.ngModel);
                                model.assign(scope, controller.$viewValue);
                            }
                        });
                        controller.$formatters.push(formatter);
                        controller.$parsers.push(parser);

                        function uninitialize(){
                            maskProcessed = false;
                            unbindEventListeners();

                            if (angular.isDefined(originalPlaceholder)) {
                                iElement.attr('placeholder', originalPlaceholder);
                            } else {
                                iElement.removeAttr('placeholder');
                            }

                            if (angular.isDefined(originalMaxlength)) {
                                iElement.attr('maxlength', originalMaxlength);
                            } else {
                                iElement.removeAttr('maxlength');
                            }

                            iElement.val(controller.$modelValue);
                            controller.$viewValue = controller.$modelValue;
                            return false;
                        }

                        function initializeElement(){
                            value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
                            valueMasked = oldValue = maskValue(value);
                            isValid = validateValue(value);
                            var viewValue = isValid && value.length ? valueMasked : '';
                            if (iAttrs.maxlength) { // Double maxlength to allow pasting new val at end of mask
                                iElement.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
                            }
                            iElement.attr('placeholder', maskPlaceholder);
                            iElement.val(viewValue);
                            controller.$viewValue = viewValue;
                            // Not using $setViewValue so we don't clobber the model value and dirty the form
                            // without any kind of user interaction.
                        }

                        function bindEventListeners(){
                            if (eventsBound) {
                                return;
                            }
                            iElement.bind('blur', blurHandler);
                            iElement.bind('mousedown mouseup', mouseDownUpHandler);
                            iElement.bind('input keyup click focus', eventHandler);
                            eventsBound = true;
                        }

                        function unbindEventListeners(){
                            if (!eventsBound) {
                                return;
                            }
                            iElement.unbind('blur', blurHandler);
                            iElement.unbind('mousedown', mouseDownUpHandler);
                            iElement.unbind('mouseup', mouseDownUpHandler);
                            iElement.unbind('input', eventHandler);
                            iElement.unbind('keyup', eventHandler);
                            iElement.unbind('click', eventHandler);
                            iElement.unbind('focus', eventHandler);
                            eventsBound = false;
                        }

                        function validateValue(value){
                            // Zero-length value validity is ngRequired's determination
                            return value.length ? value.length >= minRequiredLength : true;
                        }

                        function unmaskValue(value){
                            var valueUnmasked = '',
                                maskPatternsCopy = maskPatterns.slice();
                            // Preprocess by stripping mask components from value
                            value = value.toString();
                            angular.forEach(maskComponents, function (component){
                                value = value.replace(component, '');
                            });
                            angular.forEach(value.split(''), function (chr){
                                if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                                    valueUnmasked += chr;
                                    maskPatternsCopy.shift();
                                }
                            });
                            return valueUnmasked;
                        }

                        function maskValue(unmaskedValue){
                            var valueMasked = '',
                                maskCaretMapCopy = maskCaretMap.slice();

                            angular.forEach(maskPlaceholder.split(''), function (chr, i){
                                if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
                                    valueMasked  += unmaskedValue.charAt(0) || '_';
                                    unmaskedValue = unmaskedValue.substr(1);
                                    maskCaretMapCopy.shift();
                                }
                                else {
                                    valueMasked += chr;
                                }
                            });
                            return valueMasked;
                        }

                        function getPlaceholderChar(i) {
                            var placeholder = iAttrs.placeholder;

                            if (typeof placeholder !== 'undefined' && placeholder[i]) {
                                return placeholder[i];
                            } else {
                                return '_';
                            }
                        }

                        // Generate array of mask components that will be stripped from a masked value
                        // before processing to prevent mask components from being added to the unmasked value.
                        // E.g., a mask pattern of '+7 9999' won't have the 7 bleed into the unmasked value.
                        // If a maskable char is followed by a mask char and has a mask
                        // char behind it, we'll split it into it's own component so if
                        // a user is aggressively deleting in the input and a char ahead
                        // of the maskable char gets deleted, we'll still be able to strip
                        // it in the unmaskValue() preprocessing.
                        function getMaskComponents() {
                            return maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
                        }

                        function processRawMask(mask){
                            var characterCount = 0;

                            maskCaretMap    = [];
                            maskPatterns    = [];
                            maskPlaceholder = '';

                            if (typeof mask === 'string') {
                                minRequiredLength = 0;

                                var isOptional = false,
                                    splitMask  = mask.split('');

                                angular.forEach(splitMask, function (chr, i){
                                    if (linkOptions.maskDefinitions[chr]) {

                                        maskCaretMap.push(characterCount);

                                        maskPlaceholder += getPlaceholderChar(i);
                                        maskPatterns.push(linkOptions.maskDefinitions[chr]);

                                        characterCount++;
                                        if (!isOptional) {
                                            minRequiredLength++;
                                        }
                                    }
                                    else if (chr === '?') {
                                        isOptional = true;
                                    }
                                    else {
                                        maskPlaceholder += chr;
                                        characterCount++;
                                    }
                                });
                            }
                            // Caret position immediately following last position is valid.
                            maskCaretMap.push(maskCaretMap.slice().pop() + 1);

                            maskComponents = getMaskComponents();
                            maskProcessed  = maskCaretMap.length > 1 ? true : false;
                        }

                        function blurHandler(){
                            oldCaretPosition = 0;
                            oldSelectionLength = 0;
                            if (!isValid || value.length === 0) {
                                valueMasked = '';
                                iElement.val('');
                                scope.$apply(function (){
                                    controller.$setViewValue('');
                                });
                            }
                        }

                        function mouseDownUpHandler(e){
                            if (e.type === 'mousedown') {
                                iElement.bind('mouseout', mouseoutHandler);
                            } else {
                                iElement.unbind('mouseout', mouseoutHandler);
                            }
                        }

                        iElement.bind('mousedown mouseup', mouseDownUpHandler);

                        function mouseoutHandler(){
                            /*jshint validthis: true */
                            oldSelectionLength = getSelectionLength(this);
                            iElement.unbind('mouseout', mouseoutHandler);
                        }

                        function eventHandler(e){
                            /*jshint validthis: true */
                            e = e || {};
                            // Allows more efficient minification
                            var eventWhich = e.which,
                                eventType = e.type;

                            // Prevent shift and ctrl from mucking with old values
                            if (eventWhich === 16 || eventWhich === 91) { return;}

                            var val = iElement.val(),
                                valOld = oldValue,
                                valMasked,
                                valUnmasked = unmaskValue(val),
                                valUnmaskedOld = oldValueUnmasked,
                                valAltered = false,

                                caretPos = getCaretPosition(this) || 0,
                                caretPosOld = oldCaretPosition || 0,
                                caretPosDelta = caretPos - caretPosOld,
                                caretPosMin = maskCaretMap[0],
                                caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),

                                selectionLenOld = oldSelectionLength || 0,
                                isSelected = getSelectionLength(this) > 0,
                                wasSelected = selectionLenOld > 0,

                            // Case: Typing a character to overwrite a selection
                                isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
                            // Case: Delete and backspace behave identically on a selection
                                isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
                                isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

                                isKeyLeftArrow = eventWhich === 37,
                            // Necessary due to "input" event not providing a key code
                                isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
                                isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0 ) && !wasSelected),

                            // Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
                            // ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
                            // non-mask character. Also applied to click since users are (arguably) more likely to backspace
                            // a character when clicking within a filled input.
                                caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;

                            oldSelectionLength = getSelectionLength(this);

                            // These events don't require any action
                            if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup'))) {
                                return;
                            }

                            // Value Handling
                            // ==============

                            // User attempted to delete but raw value was unaffected--correct this grievous offense
                            if ((eventType === 'input') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
                                while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
                                    caretPos--;
                                }
                                while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
                                    caretPos++;
                                }
                                var charIndex = maskCaretMap.indexOf(caretPos);
                                // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
                                valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
                                valAltered = true;
                            }

                            // Update values
                            valMasked = maskValue(valUnmasked);

                            oldValue = valMasked;
                            oldValueUnmasked = valUnmasked;
                            iElement.val(valMasked);
                            if (valAltered) {
                                // We've altered the raw value after it's been $digest'ed, we need to $apply the new value.
                                scope.$apply(function (){
                                    controller.$setViewValue(valUnmasked);
                                });
                            }

                            // Caret Repositioning
                            // ===================

                            // Ensure that typing always places caret ahead of typed character in cases where the first char of
                            // the input is a mask char and the caret is placed at the 0 position.
                            if (isAddition && (caretPos <= caretPosMin)) {
                                caretPos = caretPosMin + 1;
                            }

                            if (caretBumpBack) {
                                caretPos--;
                            }

                            // Make sure caret is within min and max position limits
                            caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

                            // Scoot the caret back or forth until it's in a non-mask position and within min/max position limits
                            while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
                                caretPos += caretBumpBack ? -1 : 1;
                            }

                            if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld))) {
                                caretPos++;
                            }
                            oldCaretPosition = caretPos;
                            setCaretPosition(this, caretPos);
                        }

                        function isValidCaretPosition(pos){ return maskCaretMap.indexOf(pos) > -1; }

                        function getCaretPosition(input){
                            if (!input) return 0;
                            if (input.selectionStart !== undefined) {
                                return input.selectionStart;
                            } else if (document.selection) {
                                // Curse you IE
                                input.focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', input.value ? -input.value.length : 0);
                                return selection.text.length;
                            }
                            return 0;
                        }

                        function setCaretPosition(input, pos){
                            if (!input) return 0;
                            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                                return; // Input's hidden
                            }
                            if (input.setSelectionRange) {
                                input.focus();
                                input.setSelectionRange(pos, pos);
                            }
                            else if (input.createTextRange) {
                                // Curse you IE
                                var range = input.createTextRange();
                                range.collapse(true);
                                range.moveEnd('character', pos);
                                range.moveStart('character', pos);
                                range.select();
                            }
                        }

                        function getSelectionLength(input){
                            if (!input) return 0;
                            if (input.selectionStart !== undefined) {
                                return (input.selectionEnd - input.selectionStart);
                            }
                            if (document.selection) {
                                return (document.selection.createRange().text.length);
                            }
                            return 0;
                        }

                        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
                        if (!Array.prototype.indexOf) {
                            Array.prototype.indexOf = function (searchElement /*, fromIndex */){
                                if (this === null) {
                                    throw new TypeError();
                                }
                                var t = Object(this);
                                var len = t.length >>> 0;
                                if (len === 0) {
                                    return -1;
                                }
                                var n = 0;
                                if (arguments.length > 1) {
                                    n = Number(arguments[1]);
                                    if (n !== n) { // shortcut for verifying if it's NaN
                                        n = 0;
                                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                                    }
                                }
                                if (n >= len) {
                                    return -1;
                                }
                                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                                for (; k < len; k++) {
                                    if (k in t && t[k] === searchElement) {
                                        return k;
                                    }
                                }
                                return -1;
                            };
                        }

                    };
                }
            };
        }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.max', []);

    module.directive('stdMax',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var max = parseInt(attrs.stdMax);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue > max) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.min', []);

    module.directive('stdMin',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var min = parseInt(attrs.stdMin);
                        ngModelCtrl.$parsers.push(function (val) {
                            var enteredValue = parseInt(val);
                            if (enteredValue < min) {
                                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                                ngModelCtrl.$render();
                                return ngModelCtrl.$modelValue;
                            }

                            return val;
                        });
                    }
                };
            }]);
})();
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
(function () {
    'use strict';

    var module = angular.module('std.na.phone', []);

    module.directive('stdNaPhone',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {

                        ngModelCtrl.$formatters.push(function (val) {
                            return $filter('stdNaPhone')(val, false);
                        });

                        var initalLength, formattedLength, start, end;
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            var cleaned = viewValue.replace(/[^0-9]/g, '').slice(0, 20);
                            var formattedValue = $filter('stdNaPhone')(cleaned, false);

                            if (formattedValue !== viewValue) {
                                initalLength = viewValue.length;
                                formattedLength = formattedValue.length;
                                start = $element[0].selectionStart;
                                end = $element[0].selectionEnd;
                                start += formattedLength - initalLength;
                                end += formattedLength - initalLength;
                                ngModelCtrl.$setViewValue($filter('stdNaPhone')(cleaned, false));
                                ngModelCtrl.$render();
                                $element[0].setSelectionRange(start, end);
                            }
                            return cleaned;
                        });


                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                        });
                    }
                };
            }]);

    module.filter('stdNaPhone', function () {
        return function (number) {
            if (number.value) {
                if (number.value.$)
                    number = number.value.$.replace(/[^0-9]/g, '');
                else
                    number = number.value.$
            }
            if (!number) { return ''; }

            number = String(number);

            var formattedNumber = number;

            var c = (number[0] == '1') ? '+1 ' : '';
            number = number[0] == '1' ? number.slice(1) : number;

            var area = number.substring(0,3);
            var front = number.substring(3, 6);
            var end = number.substring(6, 10);
            var ext = number.substring(10, 20);

            if (front) {
                formattedNumber = (c + "(" + area + ") " + front);
            }
            if (end) {
                formattedNumber += ("-" + end);
            }
            if (ext) {
                formattedNumber += (" x" + ext);
            }
            return formattedNumber;
        };
    });
})();
(function () {
    'use strict';

    var module = angular.module('std.number.only', []);

    module.directive('stdNumberOnly',
        ['$browser',
            function ($browser) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdIntegerOnly: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var listener = function () {
                            var value = element.val().replace(/[^0-9]/g, '');
                            element.val(value);
                        };

                        ngModelCtrl.$formatters.push(function (val) {
                            if (!val && val !== null)
                                return val.replace(/[^0-9]/g, '');
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            return val.replace(/[^0-9]/g, '');
                        });

                        element.bind('change', listener);
                        element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        element.bind('paste cut', function () {
                            $browser.defer(listener);
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.percent', []);

    module.directive('stdPercent',
        ['$document',
            function ($document) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdPercent: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdPercent.type.isNullable;
                        var decimalPlaces = scope.stdPercent.type.property.decimalPlaces;
                        var maxValue = scope.stdPercent.type.property.maximumValue;
                        var minValue = scope.stdPercent.type.property.minimumValue;
                        maxValue = typeof maxValue === 'undefined' ? 2147483647 : maxValue;
                        minValue = typeof minValue === 'undefined' ? -2147483647 : minValue;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 2;

                        var wholePlaces = 38 - decimalPlaces;

                        function setViewValue(cleanVal, inputVal, newVal, offset) {
                            if (!offset) offset = 0;
                            var start = element[0].selectionStart;
                            var end = element[0].selectionEnd + cleanVal.length - inputVal.length + offset;
                            ngModelCtrl.$setViewValue(newVal);
                            ngModelCtrl.$render();
                            element[0].setSelectionRange(start, end);
                        }

                        ngModelCtrl.$formatters.push(function (val) {
                            return (val * 100).toFixed(2) + '%';
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (element[0] !== $document[0].activeElement) return ngModelCtrl.$modelValue;

                            if ((val.toString().split('.').length - 1) > 1) {
                                setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                return ngModelCtrl.$modelValue;
                            }

                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var negativeCount = (val.match(/-/g) || []).length;
                                        if (negativeCount > 1)
                                            setViewValue(clean, val, clean);
                                        else {
                                            if (wholePlaces === wholeNumber.length || decimalPlaces === fractionalNumber.length)
                                                setViewValue(clean, val, clean, 1);
                                            else
                                                setViewValue(clean, val, clean);
                                        }
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                if (maxValue && number > maxValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                if (minValue && number < minValue) {
                                    setViewValue(val, val, ngModelCtrl.$modelValue, -1);
                                    return ngModelCtrl.$modelValue;
                                }

                                return +number;
                            }
                        });

                        element.bind('focus', function (event) {
                            element.val(element.val().replace('$', ''));
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '-0';
                                } else {
                                    whole = numericParts[0] === '' ? '0' : numericParts[0].toString();
                                }
                                fraction = numericParts[1] === '' || numericParts[1] === '0' ? '0%' : numericParts[1].toString().replace(/[^0-9]+/g, '') + '%';
                                element.val(whole + '.' + fraction);
                            } else
                                element.val(element.val() + '.0' + '%');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.resizable', []);

    module.controller('stdResizableController', ['$scope',
        function ($scope) {
            var self = this;
        }]);

    module.directive('stdResizable', ['$document', function ($document) {
        return {
            restrict: 'A',
            replace: false,
            scope: {
                modal: '=',
                direction: '@'
            },
            link: function (scope, element, attrs) {

                var currentHeight,
                    currentWidth,
                    currentTop,
                    currentLeft,
                    currentRight,
                    currentBottom,
                    currentMinHeight,
                    currentMinWidth,
                    mouseOffsetX = 0,
                    mouseOffsetY = 0,
                    lastMouseX = 0,
                    lastMouseY = 0,
                    originalHeight = 0,
                    originalWidth = 0,
                    viewport;

                element.bind('mousedown', function (event) {
                    event.preventDefault();
                    mouseOffsetY = event.clientY;
                    mouseOffsetX = event.clientX;
                    originalHeight = parseInt(scope.modal.height, 10);
                    originalWidth = parseInt(scope.modal.width, 10);
                    viewport = getViewport();
                    $document.on('mousemove', mouseMove);
                    $document.on('mouseup', mouseUp);
                });

                var mouseMove = function (event) {
                    scope.$apply(function () {
                        var mouseY = event.pageY - mouseOffsetY;
                        var mouseX = event.pageX - mouseOffsetX;
                        var diffY = mouseY - lastMouseY;
                        var diffX = mouseX - lastMouseX;
                        lastMouseY = mouseY;
                        lastMouseX = mouseX;

                        currentHeight = parseInt(scope.modal.height, 10);
                        currentWidth = parseInt(scope.modal.width, 10);
                        currentMinHeight = parseInt(400, 10);
                        currentMinWidth = parseInt(500, 10);

                        if (scope.direction.indexOf("w") > -1) {
                            if (currentWidth - diffX < currentMinWidth) mouseOffsetX = mouseOffsetX - (diffX - (diffX = currentWidth - currentMinWidth));

                            //Contain resizing to the west
                            if (currentLeft + diffX < 0)
                                mouseOffsetX = mouseOffsetX - (diffX - (diffX = 0 - currentLeft));

                            scope.modal.width = (currentWidth - diffX) + 'px';
                        }
                        if (scope.direction.indexOf("n") > -1) {
                            if (currentHeight - diffY < currentMinHeight) mouseOffsetY = mouseOffsetY - (diffY - (diffY = currentHeight - currentMinHeight));

                            //Contain resizing to the north
                            if (diffY < 0) mouseOffsetY = mouseOffsetY - (diffY - (diffY));

                            scope.modal.height = (currentHeight - diffY) + 'px';
                        }
                        if (scope.direction.indexOf("e") > -1) {
                            if (currentWidth + diffX < currentMinWidth) mouseOffsetX = mouseOffsetX - (diffX - (diffX = currentMinWidth - currentWidth));

                            //Contain resizing to the east
                            if ((currentWidth) + diffX > viewport[0].offsetWidth)
                                mouseOffsetX = mouseOffsetX - (diffX - (diffX = viewport[0].offsetWidth - (currentWidth)));

                            scope.modal.width = (currentWidth + diffX) + 'px';
                        }
                        if (scope.direction.indexOf("s") > -1) {
                            if (currentHeight + diffY < currentMinHeight) mouseOffsetY = mouseOffsetY - (diffY - (diffY = currentMinHeight - currentHeight));

                            //Contain resizing to the south
                            if ((currentHeight) + diffY > viewport[0].offsetHeight)
                                mouseOffsetY = mouseOffsetY - (diffY - (diffY = viewport[0].offsetHeight - (currentHeight)));

                            scope.modal.height = (currentHeight + diffY) + 'px';
                        }
                    });
                }

                var mouseUp = function () {
                    mouseOffsetX = 0;
                    mouseOffsetY = 0;
                    lastMouseX = 0;
                    lastMouseY = 0;
                    $document.unbind('mousemove', mouseMove);
                    $document.unbind('mouseup', mouseUp);
                };

                var getViewport = function () {
                    return angular.element(document.querySelectorAll('.desktop-viewport-container')[0]);
                };
            }
        };
    }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.search.focus', []);

    module.directive('stdSearchFocus',
        ['$document',
            function ($document) {
                return {
                    scope: {
                        stdSearchFocus: '='
                    },
                    link: function (scope, element, attrs) {
                        document.addEventListener('focus', function (e) {
                            //NOTE: Firefox does not support e.target
                            var target = e.target || e.srcElement;
                            scope.stdSearchFocus(isDescendant(element[0], target) || (target.tagName && target.tagName.toLowerCase() === 'body'));
                        }, true);

                        function isDescendant(parent, child) {
                            var node = child.parentNode;
                            while (node != null) {
                                if (node == parent) {
                                    return true;
                                }
                                node = node.parentNode;
                            }
                            return false;
                        }
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.select.value.converter', []);

    module.directive('stdSelectValueConverter',
        [
            function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModelCtrl) {
                        ngModelCtrl.$formatters.push(function (val) {
                            if (val === null)
                                return 'null';
                            return val;
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (val === null)
                                return undefined;
                            if (val === 'null')
                                return null;
                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.time', []);

    module.directive('stdTime',
        ['$filter', '$timeout',
            function ($filter, $timeout) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdTime: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var format = '--:--';
                        var timeZone = 0;
                        var formatParts = format.split(':');
                        var position1Format = formatParts[0];
                        var position2Format = formatParts[1];

                        var range1Start = 0;
                        var range1End = 2;
                        var range2Start = 3;
                        var range2End = 5;

                        var range1 = createRange(range1Start, range1End);
                        var range2 = createRange(range2Start, range2End);

                        var selectedRange = [];
                        var rangeInitialized = false;
                        var militaryTime = scope.stdTime.property.militaryTime;

                        var mouseDown = new Date().getTime(),
                            previousMouseDown = mouseDown;

                        var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
                        || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

                        function getCaretPosition() {
                            var caretPos = 0;   // IE Support
                            if (document.selection) {
                                element[0].focus();
                                var selection = document.selection.createRange();
                                selection.moveStart('character', -element[0].value.length);
                                caretPos = selection.text.length;
                            }
                            // Firefox support
                            else if (element[0].selectionStart || element[0].selectionStart == '0')
                                caretPos = element[0].selectionStart;
                            return (caretPos);
                        }

                        function createRange(start, end) {
                            var array = [];
                            for (var i = start; i <= end; i++) {
                                array.push(i);
                            }
                            return array;
                        }

                        function getSelectedText() {
                            return element[0].value.substring(selectedRange[0], selectedRange[selectedRange.length - 1]);
                        }

                        function replaceRange(s, start, end, substitute) {
                            return s.substring(0, start) + substitute + s.substring(end);
                        }

                        function zeroPad(num, places) {
                            var zero = places - num.toString().length + 1;
                            return Array(+(zero > 0 && zero)).join("0") + num;
                        }

                        function setValue(value) {
                            ngModelCtrl.$setViewValue(replaceRange(element[0].value, selectedRange[0], selectedRange[selectedRange.length - 1], value));
                            ngModelCtrl.$render();
                        }

                        function setRange(rangeStart, rangeEnd, rangeToSelect, ri) {
                            element[0].setSelectionRange(rangeStart, rangeEnd);
                            selectedRange = rangeToSelect;
                            rangeInitialized = ri;
                        }

                        function getCharFromKeyCode(e) {
                            if(e.keyCode >= 96 && e.keyCode <= 105)
                                return parseInt(String.fromCharCode(e.keyCode - 48));

                            return parseInt(String.fromCharCode(e.keyCode));
                        }

                        element.bind('keydown', function(e) {
                            if (e.keyCode === 37) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }
                            if (e.keyCode === 39 || (e.keyCode === 186 && e.shiftKey)) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                }
                            }

                            if (e.keyCode === 8) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2, true);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 46) {
                                var selectedText = getSelectedText();
                                if (selectedRange === range1 && !isNaN(selectedText)) {
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                                else if (selectedRange === range1 && isNaN(selectedText)) {
                                    setRange(range2Start, range2End, range2);
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && !isNaN(selectedText)) {
                                    setValue(position2Format);
                                    setRange(range2Start, range2End, range2, true);
                                }
                                else if (selectedRange === range2 && isNaN(selectedText)) {
                                    setRange(range1Start, range1End, range1, true);
                                    setValue(position1Format);
                                    setRange(range1Start, range1End, range1, true);
                                }
                            }

                            if (e.keyCode === 9 && !e.shiftKey) {
                                if (selectedRange === range1) {
                                    setRange(range2Start, range2End, range2, true);
                                    e.preventDefault();
                                }
                            }
                            if (e.keyCode === 9 && e.shiftKey) {
                                if (selectedRange === range2) {
                                    setRange(range1Start, range1End, range1, true);
                                    e.preventDefault();
                                }
                            }

                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                var newValue,
                                    oldValue,
                                    selectedText = getSelectedText();

                                if (selectedText === '') return;

                                oldValue = parseInt(selectedText);
                                newValue = getCharFromKeyCode(e);

                                if (selectedRange === range1) {
                                    if (oldValue === 1 && [0, 1, 2].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 1 && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else if (militaryTime && oldValue === 2 && [1, 2, 3].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, true);
                                    } else {
                                        if (rangeInitialized || isNaN(oldValue)) {
                                            setValue('0' + newValue.toString());
                                            if ([0, 1].indexOf(newValue) > -1 || (militaryTime && [0, 1, 2].indexOf(newValue) > -1))
                                                setRange(range1Start, range1End, range1, false);
                                            else
                                                setRange(range2Start, range2End, range2, true);
                                        }
                                        else {
                                            if (!militaryTime && [2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 ) {
                                                setRange(range2Start, range2End, range2, true);
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, false);
                                            }
                                            else if (militaryTime && [3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1) {
                                                setValue('0' + newValue.toString());
                                                setRange(range2Start, range2End, range2, true);
                                            } else {
                                                setValue('0' + newValue.toString());
                                                setRange(range1Start, range1End, range1, true);
                                            }
                                        }
                                    }
                                } else if (selectedRange === range2) {
                                    if ([1, 2, 3, 4, 5].indexOf(oldValue) > -1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(newValue) > -1 && !rangeInitialized) {
                                        setValue(oldValue.toString() + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    } else {
                                        setValue('0' + newValue.toString());
                                        setRange(range2Start, range2End, range2, false);
                                    }
                                }
                            }
                            if (e.keyCode !== 9)
                                e.preventDefault();

                        });

                        element.bind('mouseup', function(e){
                            var caretPosition = getCaretPosition();
                            var sel = window.getSelection();
                            sel.removeAllRanges();

                            if (range1.indexOf(caretPosition) > -1)
                                setRange(range1Start, range1End, range1, true);

                            if (range2.indexOf(caretPosition) > -1)
                                setRange(range2Start, range2End, range2, true);
                        });

                        element.bind('mousemove', function(e){
                            if(e.stopPropagation) e.stopPropagation();
                            if(e.preventDefault) e.preventDefault();
                            e.cancelBubble = true;
                            e.returnValue = false;
                            return false;
                        });

                        element.bind('mousedown', function(e){
                            var time = new Date().getTime();

                            if((time - mouseDown) < 450)
                            {
                                previousMouseDown = mouseDown;
                                mouseDown = time;

                                e.preventDefault();
                                return false;
                            }

                            previousMouseDown = mouseDown;
                            mouseDown = time;
                        });

                        element.bind('copy', function(e) {
                            var textToPutOnClipboard = element[0].value;

                            if (isIe) {
                                window.clipboardData.setData('Text', textToPutOnClipboard);
                            } else {
                                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                            }
                            e.preventDefault();
                        });

                        element.bind('cut', function(e){
                            e.preventDefault();
                        });

                        element.bind('paste', function(e){
                            e.preventDefault();
                        });

                        element.bind('focus', function(e){
                            $timeout(function() {
                                setRange(range1Start, range1End, range1, true);
                            }, 0)
                        });

                        element.bind('blur', function(e){
                            if (ngModelCtrl.$modelValue === null)
                                element[0].value = '--:--';
                        });

                        element.addClass('ttl-date-selection');

                        scope.$watch('stdTime.property.period', function(newValue, oldValue){
                            if (ngModelCtrl.$modelValue === null || newValue === oldValue) return;
                            var val = element[0].value;
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            if (isNaN(hours) || isNaN(minutes)) {
                                //Do Nothing
                            } else {
                                if (newValue ==='AM' && hours === 12) {
                                    hours = 0;
                                } else if (newValue === 'PM' && hours < 12) {
                                    hours += 12;
                                }
                                var newDate = new Date(ngModelCtrl.$modelValue);
                                newDate.setHours(hours);
                                //Do this watch being out of context we have clear the value and re-render to get the parser to fire.
                                ngModelCtrl.$setViewValue($filter('date')(null, 'hh:mm'));
                                ngModelCtrl.$render();
                                ngModelCtrl.$setViewValue($filter('date')(newDate, 'hh:mm'));
                                ngModelCtrl.$render();
                            }
                        });

                        ngModelCtrl.$formatters.push(function (val) {
                            var date = Date.parse(val);
                            if (!isNaN(date)) {
                                if (!militaryTime)
                                    scope.stdTime.property.period = (val.getHours() >= 12) ? "PM" : "AM";
                                return $filter('date')(val, 'hh:mm');
                            } else {
                                return '--:--';
                            }
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            var timeParts = String(val).split(':');
                            var hours = parseInt(timeParts[0]);
                            var minutes = parseInt(timeParts[1]);
                            var period = scope.stdTime.property.period;

                            if (isNaN(hours) || isNaN(minutes)) {
                                return null;
                            }

                            val = new Date();
                            if (period ==='AM' && hours === 12) {
                                hours = 0;
                            } else if (period === 'PM' && hours < 12) {
                                hours += 12;
                            }
                            val.setHours(hours);
                            val.setMinutes(minutes);
                            var date = Date.parse(ngModelCtrl.$modelValue);
                            if (!isNaN(date))
                            {
                                val.setFullYear(ngModelCtrl.$modelValue.getFullYear());
                                val.setMonth(ngModelCtrl.$modelValue.getMonth());
                                val.setDate(ngModelCtrl.$modelValue.getDate());

                                return val;
                            }
                            return val;
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.trap.focus', []);

    module.directive('stdTrapFocus',
        ['$window', '$document', '$timeout',
            function ($window, $document, $timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        var keyCode, shiftKey;
                        var blurListener = function (e) {
                            var elements = element[0].querySelectorAll('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled):not(.excluded)');
                            if (shiftKey && keyCode === 9) {
                                if (elements[0] === e.target) {
                                    e.preventDefault();
                                    elements[elements.length - 1].focus();
                                }
                            } else if (!shiftKey && keyCode === 9) {
                                if (elements[elements.length - 1] === e.target) {
                                    e.preventDefault();
                                    elements[0].focus();
                                }
                            }
                        };

                        var keydownListener = function (e) {
                            keyCode = e.keyCode;
                            shiftKey = e.shiftKey;
                        };

                        $document[0].addEventListener('blur', blurListener, true);
                        $document[0].addEventListener('keydown', keydownListener, true);

                        scope.$on('$destroy', function () {
                            $document[0].removeEventListener('blur', blurListener);
                            $document[0].removeEventListener('keydown', keydownListener);
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.usa.dollar', []);

    module.directive('stdUsaDollar',
        ['$document',
            function ($document) {
                return {
                    require: 'ngModel',
                    scope: {
                        stdUsaDollar: '='
                    },
                    link: function (scope, element, attrs, ngModelCtrl) {
                        var isNullable = scope.stdUsaDollar.type.isNullable;
                        var decimalPlaces = scope.stdUsaDollar.type.property.decimalPlaces;

                        if (typeof decimalPlaces === 'undefined')
                            decimalPlaces = 2;

                        var wholePlaces = 38 - decimalPlaces;

                        ngModelCtrl.$formatters.push(function (val) {
                            if (val === null) return val;
                            return '$' + val.toFixed(2);
                        });

                        ngModelCtrl.$parsers.push(function (val) {
                            if (element[0] !== $document[0].activeElement) return ngModelCtrl.$modelValue;
                            var number = Number(val).toPrecision();

                            var numericParts = String(val).split('.');

                            if (numericParts.length >= 2) {
                                var wholeNumberPrecision = numericParts[0].length > wholePlaces;
                                var fractionalNumberPrecision = numericParts[1].length > decimalPlaces;
                            } else {
                                wholeNumberPrecision = numericParts[0].length > wholePlaces;
                            }

                            if (number === 'NaN' || wholeNumberPrecision || fractionalNumberPrecision) {
                                var allParts = String(val).split('');
                                var isNegative = allParts[0] === '-' ? true : false;
                                var numericParts = String(val).split('.');
                                var clean = '';

                                if (numericParts.length >= 2) {
                                    var wholeNumber = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                    var fractionalNumber = numericParts[1].toString().replace(/[^0-9]+/g, '').substring(0, decimalPlaces);
                                    clean = wholeNumber + '.' + fractionalNumber;
                                } else {
                                    clean = numericParts[0].toString().replace(/[^0-9]+/g, '').substring(0, wholePlaces);
                                }

                                if (val !== clean) {
                                    if (isNegative)
                                        clean = '-' + clean;

                                    if (ngModelCtrl.$viewValue !== clean) {
                                        var start = element[0].selectionStart;
                                        var end = element[0].selectionEnd + clean.length - val.length;
                                        ngModelCtrl.$setViewValue(clean);
                                        ngModelCtrl.$render();
                                        element[0].setSelectionRange(start, end);
                                    }
                                }

                                if (!isNaN(ngModelCtrl.$modelValue)) {
                                    return +ngModelCtrl.$modelValue;
                                } else {
                                    if (isNullable)
                                        return null;
                                    else
                                        return undefined;
                                }
                            } else if (val === '') {
                                if (isNullable)
                                    return null;
                                else
                                    return undefined;
                            } else {
                                return +number;
                            }
                        });

                        element.bind('focus', function (event) {
                            element.val(element.val().replace('$', ''));
                        });

                        element.bind('blur', function (event) {
                            if (element.val() === '') return;
                            var numericParts = element.val().split('.');
                            var whole = '';
                            var fraction = '';
                            if (numericParts.length >= 2) {
                                if (numericParts[0] === '-') {
                                    whole = '$-0';
                                } else {
                                    whole = numericParts[0] === '' ? '$0' : '$' + numericParts[0].toString().replace(/[^0-9]+/g, '');
                                }
                                fraction = numericParts[1] === '' || numericParts[1] === '0' ? '00' : numericParts[1].toString().replace(/[^0-9]+/g, '');
                                element.val(whole + '.' + fraction);
                            } else
                                element.val('$' + element.val() + '.00');
                        });

                        element.bind('keypress', function (event) {
                            if (event.keyCode === 32) {
                                event.preventDefault();
                            }
                        });
                    }
                };
            }]);
})();
(function () {
    'use strict';

    var module = angular.module('std.zip', []);

    module.directive('stdZip',
        ['$filter', '$browser',
            function ($filter, $browser) {
                return {
                    require: 'ngModel',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var listener = function () {
                            var value = $element.val().replace(/[^0-9]/g, '');
                            $element.val($filter('zip')(value, false));
                        };

                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue.replace(/[^0-9]/g, '').slice(0, 9);
                        });

                        ngModelCtrl.$render = function () {
                            $element.val($filter('zip')(ngModelCtrl.$viewValue, false));
                        };

                        $element.bind('change', listener);
                        $element.bind('keydown', function (event) {
                            var key = event.keyCode;
                            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                                return;
                            }
                            $browser.defer(listener);
                        });

                        $element.bind('paste cut', function () {
                            $browser.defer(listener);
                        });
                    }
                };
            }]);

    module.filter('zip', function () {
        return function (zip) {
            if (!zip) { return ''; }

            var value = zip.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return zip;
            }

            var number = value;

            if (value.length > 5) {
                number = number.slice(0, 5) + '-' + number.slice(5, 9);
            }

            return number.trim();
        };
    });
})();
(function() {
    var root;

    if (typeof window === 'object' && window) {
        root = window;
    } else {
        root = global;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = root.Promise ? root.Promise : Promise;
    } else if (!root.Promise) {
        root.Promise = Promise;
    }

    // Use polyfill for setImmediate for performance gains
    var asap = root.setImmediate || function(fn) { setTimeout(fn, 1); };

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function() {
            fn.apply(thisArg, arguments);
        }
    }

    var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

    function Promise(fn) {
        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = null;
        this._value = null;
        this._deferreds = []

        doResolve(fn, bind(resolve, this), bind(reject, this))
    }

    function handle(deferred) {
        var me = this;
        if (this._state === null) {
            this._deferreds.push(deferred);
            return
        }
        asap(function() {
            var cb = me._state ? deferred.onFulfilled : deferred.onRejected
            if (cb === null) {
                (me._state ? deferred.resolve : deferred.reject)(me._value);
                return;
            }
            var ret;
            try {
                ret = cb(me._value);
            }
            catch (e) {
                deferred.reject(e);
                return;
            }
            deferred.resolve(ret);
        })
    }

    function resolve(newValue) {
        try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (typeof then === 'function') {
                    doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
                    return;
                }
            }
            this._state = true;
            this._value = newValue;
            finale.call(this);
        } catch (e) { reject.call(this, e); }
    }

    function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
    }

    function finale() {
        for (var i = 0, len = this._deferreds.length; i < len; i++) {
            handle.call(this, this._deferreds[i]);
        }
        this._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, resolve, reject){
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function (reason) {
                if (done) return;
                done = true;
                onRejected(reason);
            })
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }

    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };

    Promise.prototype.then = function(onFulfilled, onRejected) {
        var me = this;
        return new Promise(function(resolve, reject) {
            handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        })
    };

    Promise.all = function () {
        var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;
            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) { res(i, val) }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }

        return new Promise(function (resolve) {
            resolve(value);
        });
    };

    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for(var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };
})();
(function(){
    'use strict';

    var module = angular.module('std.countries', []);

    module.factory('stdCountries',
        [
            function() {
                this.allCountries = [
                    [
                        "Afghanistan (‫افغانستان‬‎)",
                        "af",
                        "93"
                    ],
                    [
                        "Albania (Shqipëri)",
                        "al",
                        "355"
                    ],
                    [
                        "Algeria (‫الجزائر‬‎)",
                        "dz",
                        "213"
                    ],
                    [
                        "American Samoa",
                        "as",
                        "1684"
                    ],
                    [
                        "Andorra",
                        "ad",
                        "376"
                    ],
                    [
                        "Angola",
                        "ao",
                        "244"
                    ],
                    [
                        "Anguilla",
                        "ai",
                        "1264"
                    ],
                    [
                        "Antigua and Barbuda",
                        "ag",
                        "1268"
                    ],
                    [
                        "Argentina",
                        "ar",
                        "54"
                    ],
                    [
                        "Armenia (Հայաստան)",
                        "am",
                        "374"
                    ],
                    [
                        "Aruba",
                        "aw",
                        "297"
                    ],
                    [
                        "Australia",
                        "au",
                        "61",
                        0
                    ],
                    [
                        "Austria (Österreich)",
                        "at",
                        "43"
                    ],
                    [
                        "Azerbaijan (Azərbaycan)",
                        "az",
                        "994"
                    ],
                    [
                        "Bahamas",
                        "bs",
                        "1242"
                    ],
                    [
                        "Bahrain (‫البحرين‬‎)",
                        "bh",
                        "973"
                    ],
                    [
                        "Bangladesh (বাংলাদেশ)",
                        "bd",
                        "880"
                    ],
                    [
                        "Barbados",
                        "bb",
                        "1246"
                    ],
                    [
                        "Belarus (Беларусь)",
                        "by",
                        "375"
                    ],
                    [
                        "Belgium (België)",
                        "be",
                        "32"
                    ],
                    [
                        "Belize",
                        "bz",
                        "501"
                    ],
                    [
                        "Benin (Bénin)",
                        "bj",
                        "229"
                    ],
                    [
                        "Bermuda",
                        "bm",
                        "1441"
                    ],
                    [
                        "Bhutan (འབྲུག)",
                        "bt",
                        "975"
                    ],
                    [
                        "Bolivia",
                        "bo",
                        "591"
                    ],
                    [
                        "Bosnia and Herzegovina (Босна и Херцеговина)",
                        "ba",
                        "387"
                    ],
                    [
                        "Botswana",
                        "bw",
                        "267"
                    ],
                    [
                        "Brazil (Brasil)",
                        "br",
                        "55"
                    ],
                    [
                        "British Indian Ocean Territory",
                        "io",
                        "246"
                    ],
                    [
                        "British Virgin Islands",
                        "vg",
                        "1284"
                    ],
                    [
                        "Brunei",
                        "bn",
                        "673"
                    ],
                    [
                        "Bulgaria (България)",
                        "bg",
                        "359"
                    ],
                    [
                        "Burkina Faso",
                        "bf",
                        "226"
                    ],
                    [
                        "Burundi (Uburundi)",
                        "bi",
                        "257"
                    ],
                    [
                        "Cambodia (កម្ពុជា)",
                        "kh",
                        "855"
                    ],
                    [
                        "Cameroon (Cameroun)",
                        "cm",
                        "237"
                    ],
                    [
                        "Canada",
                        "ca",
                        "1",
                        1,
                        ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]
                    ],
                    [
                        "Cape Verde (Kabu Verdi)",
                        "cv",
                        "238"
                    ],
                    [
                        "Caribbean Netherlands",
                        "bq",
                        "599",
                        1
                    ],
                    [
                        "Cayman Islands",
                        "ky",
                        "1345"
                    ],
                    [
                        "Central African Republic (République centrafricaine)",
                        "cf",
                        "236"
                    ],
                    [
                        "Chad (Tchad)",
                        "td",
                        "235"
                    ],
                    [
                        "Chile",
                        "cl",
                        "56"
                    ],
                    [
                        "China (中国)",
                        "cn",
                        "86"
                    ],
                    [
                        "Christmas Island",
                        "cx",
                        "61",
                        2
                    ],
                    [
                        "Cocos (Keeling) Islands",
                        "cc",
                        "61",
                        1
                    ],
                    [
                        "Colombia",
                        "co",
                        "57"
                    ],
                    [
                        "Comoros (‫جزر القمر‬‎)",
                        "km",
                        "269"
                    ],
                    [
                        "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
                        "cd",
                        "243"
                    ],
                    [
                        "Congo (Republic) (Congo-Brazzaville)",
                        "cg",
                        "242"
                    ],
                    [
                        "Cook Islands",
                        "ck",
                        "682"
                    ],
                    [
                        "Costa Rica",
                        "cr",
                        "506"
                    ],
                    [
                        "Côte d’Ivoire",
                        "ci",
                        "225"
                    ],
                    [
                        "Croatia (Hrvatska)",
                        "hr",
                        "385"
                    ],
                    [
                        "Cuba",
                        "cu",
                        "53"
                    ],
                    [
                        "Curaçao",
                        "cw",
                        "599",
                        0
                    ],
                    [
                        "Cyprus (Κύπρος)",
                        "cy",
                        "357"
                    ],
                    [
                        "Czech Republic (Česká republika)",
                        "cz",
                        "420"
                    ],
                    [
                        "Denmark (Danmark)",
                        "dk",
                        "45"
                    ],
                    [
                        "Djibouti",
                        "dj",
                        "253"
                    ],
                    [
                        "Dominica",
                        "dm",
                        "1767"
                    ],
                    [
                        "Dominican Republic (República Dominicana)",
                        "do",
                        "1",
                        2,
                        ["809", "829", "849"]
                    ],
                    [
                        "Ecuador",
                        "ec",
                        "593"
                    ],
                    [
                        "Egypt (‫مصر‬‎)",
                        "eg",
                        "20"
                    ],
                    [
                        "El Salvador",
                        "sv",
                        "503"
                    ],
                    [
                        "Equatorial Guinea (Guinea Ecuatorial)",
                        "gq",
                        "240"
                    ],
                    [
                        "Eritrea",
                        "er",
                        "291"
                    ],
                    [
                        "Estonia (Eesti)",
                        "ee",
                        "372"
                    ],
                    [
                        "Ethiopia",
                        "et",
                        "251"
                    ],
                    [
                        "Falkland Islands (Islas Malvinas)",
                        "fk",
                        "500"
                    ],
                    [
                        "Faroe Islands (Føroyar)",
                        "fo",
                        "298"
                    ],
                    [
                        "Fiji",
                        "fj",
                        "679"
                    ],
                    [
                        "Finland (Suomi)",
                        "fi",
                        "358",
                        0
                    ],
                    [
                        "France",
                        "fr",
                        "33"
                    ],
                    [
                        "French Guiana (Guyane française)",
                        "gf",
                        "594"
                    ],
                    [
                        "French Polynesia (Polynésie française)",
                        "pf",
                        "689"
                    ],
                    [
                        "Gabon",
                        "ga",
                        "241"
                    ],
                    [
                        "Gambia",
                        "gm",
                        "220"
                    ],
                    [
                        "Georgia (საქართველო)",
                        "ge",
                        "995"
                    ],
                    [
                        "Germany (Deutschland)",
                        "de",
                        "49"
                    ],
                    [
                        "Ghana (Gaana)",
                        "gh",
                        "233"
                    ],
                    [
                        "Gibraltar",
                        "gi",
                        "350"
                    ],
                    [
                        "Greece (Ελλάδα)",
                        "gr",
                        "30"
                    ],
                    [
                        "Greenland (Kalaallit Nunaat)",
                        "gl",
                        "299"
                    ],
                    [
                        "Grenada",
                        "gd",
                        "1473"
                    ],
                    [
                        "Guadeloupe",
                        "gp",
                        "590",
                        0
                    ],
                    [
                        "Guam",
                        "gu",
                        "1671"
                    ],
                    [
                        "Guatemala",
                        "gt",
                        "502"
                    ],
                    [
                        "Guernsey",
                        "gg",
                        "44",
                        1
                    ],
                    [
                        "Guinea (Guinée)",
                        "gn",
                        "224"
                    ],
                    [
                        "Guinea-Bissau (Guiné Bissau)",
                        "gw",
                        "245"
                    ],
                    [
                        "Guyana",
                        "gy",
                        "592"
                    ],
                    [
                        "Haiti",
                        "ht",
                        "509"
                    ],
                    [
                        "Honduras",
                        "hn",
                        "504"
                    ],
                    [
                        "Hong Kong (香港)",
                        "hk",
                        "852"
                    ],
                    [
                        "Hungary (Magyarország)",
                        "hu",
                        "36"
                    ],
                    [
                        "Iceland (Ísland)",
                        "is",
                        "354"
                    ],
                    [
                        "India (भारत)",
                        "in",
                        "91"
                    ],
                    [
                        "Indonesia",
                        "id",
                        "62"
                    ],
                    [
                        "Iran (‫ایران‬‎)",
                        "ir",
                        "98"
                    ],
                    [
                        "Iraq (‫العراق‬‎)",
                        "iq",
                        "964"
                    ],
                    [
                        "Ireland",
                        "ie",
                        "353"
                    ],
                    [
                        "Isle of Man",
                        "im",
                        "44",
                        2
                    ],
                    [
                        "Israel (‫ישראל‬‎)",
                        "il",
                        "972"
                    ],
                    [
                        "Italy (Italia)",
                        "it",
                        "39",
                        0
                    ],
                    [
                        "Jamaica",
                        "jm",
                        "1876"
                    ],
                    [
                        "Japan (日本)",
                        "jp",
                        "81"
                    ],
                    [
                        "Jersey",
                        "je",
                        "44",
                        3
                    ],
                    [
                        "Jordan (‫الأردن‬‎)",
                        "jo",
                        "962"
                    ],
                    [
                        "Kazakhstan (Казахстан)",
                        "kz",
                        "7",
                        1
                    ],
                    [
                        "Kenya",
                        "ke",
                        "254"
                    ],
                    [
                        "Kiribati",
                        "ki",
                        "686"
                    ],
                    [
                        "Kuwait (‫الكويت‬‎)",
                        "kw",
                        "965"
                    ],
                    [
                        "Kyrgyzstan (Кыргызстан)",
                        "kg",
                        "996"
                    ],
                    [
                        "Laos (ລາວ)",
                        "la",
                        "856"
                    ],
                    [
                        "Latvia (Latvija)",
                        "lv",
                        "371"
                    ],
                    [
                        "Lebanon (‫لبنان‬‎)",
                        "lb",
                        "961"
                    ],
                    [
                        "Lesotho",
                        "ls",
                        "266"
                    ],
                    [
                        "Liberia",
                        "lr",
                        "231"
                    ],
                    [
                        "Libya (‫ليبيا‬‎)",
                        "ly",
                        "218"
                    ],
                    [
                        "Liechtenstein",
                        "li",
                        "423"
                    ],
                    [
                        "Lithuania (Lietuva)",
                        "lt",
                        "370"
                    ],
                    [
                        "Luxembourg",
                        "lu",
                        "352"
                    ],
                    [
                        "Macau (澳門)",
                        "mo",
                        "853"
                    ],
                    [
                        "Macedonia (FYROM) (Македонија)",
                        "mk",
                        "389"
                    ],
                    [
                        "Madagascar (Madagasikara)",
                        "mg",
                        "261"
                    ],
                    [
                        "Malawi",
                        "mw",
                        "265"
                    ],
                    [
                        "Malaysia",
                        "my",
                        "60"
                    ],
                    [
                        "Maldives",
                        "mv",
                        "960"
                    ],
                    [
                        "Mali",
                        "ml",
                        "223"
                    ],
                    [
                        "Malta",
                        "mt",
                        "356"
                    ],
                    [
                        "Marshall Islands",
                        "mh",
                        "692"
                    ],
                    [
                        "Martinique",
                        "mq",
                        "596"
                    ],
                    [
                        "Mauritania (‫موريتانيا‬‎)",
                        "mr",
                        "222"
                    ],
                    [
                        "Mauritius (Moris)",
                        "mu",
                        "230"
                    ],
                    [
                        "Mayotte",
                        "yt",
                        "262",
                        1
                    ],
                    [
                        "Mexico (México)",
                        "mx",
                        "52"
                    ],
                    [
                        "Micronesia",
                        "fm",
                        "691"
                    ],
                    [
                        "Moldova (Republica Moldova)",
                        "md",
                        "373"
                    ],
                    [
                        "Monaco",
                        "mc",
                        "377"
                    ],
                    [
                        "Mongolia (Монгол)",
                        "mn",
                        "976"
                    ],
                    [
                        "Montenegro (Crna Gora)",
                        "me",
                        "382"
                    ],
                    [
                        "Montserrat",
                        "ms",
                        "1664"
                    ],
                    [
                        "Morocco (‫المغرب‬‎)",
                        "ma",
                        "212",
                        0
                    ],
                    [
                        "Mozambique (Moçambique)",
                        "mz",
                        "258"
                    ],
                    [
                        "Myanmar (Burma) (မြန်မာ)",
                        "mm",
                        "95"
                    ],
                    [
                        "Namibia (Namibië)",
                        "na",
                        "264"
                    ],
                    [
                        "Nauru",
                        "nr",
                        "674"
                    ],
                    [
                        "Nepal (नेपाल)",
                        "np",
                        "977"
                    ],
                    [
                        "Netherlands (Nederland)",
                        "nl",
                        "31"
                    ],
                    [
                        "New Caledonia (Nouvelle-Calédonie)",
                        "nc",
                        "687"
                    ],
                    [
                        "New Zealand",
                        "nz",
                        "64"
                    ],
                    [
                        "Nicaragua",
                        "ni",
                        "505"
                    ],
                    [
                        "Niger (Nijar)",
                        "ne",
                        "227"
                    ],
                    [
                        "Nigeria",
                        "ng",
                        "234"
                    ],
                    [
                        "Niue",
                        "nu",
                        "683"
                    ],
                    [
                        "Norfolk Island",
                        "nf",
                        "672"
                    ],
                    [
                        "North Korea (조선 민주주의 인민 공화국)",
                        "kp",
                        "850"
                    ],
                    [
                        "Northern Mariana Islands",
                        "mp",
                        "1670"
                    ],
                    [
                        "Norway (Norge)",
                        "no",
                        "47",
                        0
                    ],
                    [
                        "Oman (‫عُمان‬‎)",
                        "om",
                        "968"
                    ],
                    [
                        "Pakistan (‫پاکستان‬‎)",
                        "pk",
                        "92"
                    ],
                    [
                        "Palau",
                        "pw",
                        "680"
                    ],
                    [
                        "Palestine (‫فلسطين‬‎)",
                        "ps",
                        "970"
                    ],
                    [
                        "Panama (Panamá)",
                        "pa",
                        "507"
                    ],
                    [
                        "Papua New Guinea",
                        "pg",
                        "675"
                    ],
                    [
                        "Paraguay",
                        "py",
                        "595"
                    ],
                    [
                        "Peru (Perú)",
                        "pe",
                        "51"
                    ],
                    [
                        "Philippines",
                        "ph",
                        "63"
                    ],
                    [
                        "Poland (Polska)",
                        "pl",
                        "48"
                    ],
                    [
                        "Portugal",
                        "pt",
                        "351"
                    ],
                    [
                        "Puerto Rico",
                        "pr",
                        "1",
                        3,
                        ["787", "939"]
                    ],
                    [
                        "Qatar (‫قطر‬‎)",
                        "qa",
                        "974"
                    ],
                    [
                        "Réunion (La Réunion)",
                        "re",
                        "262",
                        0
                    ],
                    [
                        "Romania (România)",
                        "ro",
                        "40"
                    ],
                    [
                        "Russia (Россия)",
                        "ru",
                        "7",
                        0
                    ],
                    [
                        "Rwanda",
                        "rw",
                        "250"
                    ],
                    [
                        "Saint Barthélemy (Saint-Barthélemy)",
                        "bl",
                        "590",
                        1
                    ],
                    [
                        "Saint Helena",
                        "sh",
                        "290"
                    ],
                    [
                        "Saint Kitts and Nevis",
                        "kn",
                        "1869"
                    ],
                    [
                        "Saint Lucia",
                        "lc",
                        "1758"
                    ],
                    [
                        "Saint Martin (Saint-Martin (partie française))",
                        "mf",
                        "590",
                        2
                    ],
                    [
                        "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
                        "pm",
                        "508"
                    ],
                    [
                        "Saint Vincent and the Grenadines",
                        "vc",
                        "1784"
                    ],
                    [
                        "Samoa",
                        "ws",
                        "685"
                    ],
                    [
                        "San Marino",
                        "sm",
                        "378"
                    ],
                    [
                        "São Tomé and Príncipe (São Tomé e Príncipe)",
                        "st",
                        "239"
                    ],
                    [
                        "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
                        "sa",
                        "966"
                    ],
                    [
                        "Senegal (Sénégal)",
                        "sn",
                        "221"
                    ],
                    [
                        "Serbia (Србија)",
                        "rs",
                        "381"
                    ],
                    [
                        "Seychelles",
                        "sc",
                        "248"
                    ],
                    [
                        "Sierra Leone",
                        "sl",
                        "232"
                    ],
                    [
                        "Singapore",
                        "sg",
                        "65"
                    ],
                    [
                        "Sint Maarten",
                        "sx",
                        "1721"
                    ],
                    [
                        "Slovakia (Slovensko)",
                        "sk",
                        "421"
                    ],
                    [
                        "Slovenia (Slovenija)",
                        "si",
                        "386"
                    ],
                    [
                        "Solomon Islands",
                        "sb",
                        "677"
                    ],
                    [
                        "Somalia (Soomaaliya)",
                        "so",
                        "252"
                    ],
                    [
                        "South Africa",
                        "za",
                        "27"
                    ],
                    [
                        "South Korea (대한민국)",
                        "kr",
                        "82"
                    ],
                    [
                        "South Sudan (‫جنوب السودان‬‎)",
                        "ss",
                        "211"
                    ],
                    [
                        "Spain (España)",
                        "es",
                        "34"
                    ],
                    [
                        "Sri Lanka (ශ්‍රී ලංකාව)",
                        "lk",
                        "94"
                    ],
                    [
                        "Sudan (‫السودان‬‎)",
                        "sd",
                        "249"
                    ],
                    [
                        "Suriname",
                        "sr",
                        "597"
                    ],
                    [
                        "Svalbard and Jan Mayen",
                        "sj",
                        "47",
                        1
                    ],
                    [
                        "Swaziland",
                        "sz",
                        "268"
                    ],
                    [
                        "Sweden (Sverige)",
                        "se",
                        "46"
                    ],
                    [
                        "Switzerland (Schweiz)",
                        "ch",
                        "41"
                    ],
                    [
                        "Syria (‫سوريا‬‎)",
                        "sy",
                        "963"
                    ],
                    [
                        "Taiwan (台灣)",
                        "tw",
                        "886"
                    ],
                    [
                        "Tajikistan",
                        "tj",
                        "992"
                    ],
                    [
                        "Tanzania",
                        "tz",
                        "255"
                    ],
                    [
                        "Thailand (ไทย)",
                        "th",
                        "66"
                    ],
                    [
                        "Timor-Leste",
                        "tl",
                        "670"
                    ],
                    [
                        "Togo",
                        "tg",
                        "228"
                    ],
                    [
                        "Tokelau",
                        "tk",
                        "690"
                    ],
                    [
                        "Tonga",
                        "to",
                        "676"
                    ],
                    [
                        "Trinidad and Tobago",
                        "tt",
                        "1868"
                    ],
                    [
                        "Tunisia (‫تونس‬‎)",
                        "tn",
                        "216"
                    ],
                    [
                        "Turkey (Türkiye)",
                        "tr",
                        "90"
                    ],
                    [
                        "Turkmenistan",
                        "tm",
                        "993"
                    ],
                    [
                        "Turks and Caicos Islands",
                        "tc",
                        "1649"
                    ],
                    [
                        "Tuvalu",
                        "tv",
                        "688"
                    ],
                    [
                        "U.S. Virgin Islands",
                        "vi",
                        "1340"
                    ],
                    [
                        "Uganda",
                        "ug",
                        "256"
                    ],
                    [
                        "Ukraine (Україна)",
                        "ua",
                        "380"
                    ],
                    [
                        "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
                        "ae",
                        "971"
                    ],
                    [
                        "United Kingdom",
                        "gb",
                        "44",
                        0
                    ],
                    [
                        "United States",
                        "us",
                        "1",
                        0
                    ],
                    [
                        "Uruguay",
                        "uy",
                        "598"
                    ],
                    [
                        "Uzbekistan (Oʻzbekiston)",
                        "uz",
                        "998"
                    ],
                    [
                        "Vanuatu",
                        "vu",
                        "678"
                    ],
                    [
                        "Vatican City (Città del Vaticano)",
                        "va",
                        "39",
                        1
                    ],
                    [
                        "Venezuela",
                        "ve",
                        "58"
                    ],
                    [
                        "Vietnam (Việt Nam)",
                        "vn",
                        "84"
                    ],
                    [
                        "Wallis and Futuna",
                        "wf",
                        "681"
                    ],
                    [
                        "Western Sahara (‫الصحراء الغربية‬‎)",
                        "eh",
                        "212",
                        1
                    ],
                    [
                        "Yemen (‫اليمن‬‎)",
                        "ye",
                        "967"
                    ],
                    [
                        "Zambia",
                        "zm",
                        "260"
                    ],
                    [
                        "Zimbabwe",
                        "zw",
                        "263"
                    ],
                    [
                        "Åland Islands",
                        "ax",
                        "358",
                        1
                    ]
                ];


                for (var i = 0; i < this.allCountries.length; i++) {
                    var c = this.allCountries[i];
                    this.allCountries[i] = {
                        name: c[0],
                        iso2: c[1],
                        dialCode: c[2],
                        priority: c[3] || 0,
                        areaCodes: c[4] || null
                    };
                }

                return {
                    allCountries: this.allCountries
                }
            }
        ]);
})();

(function(){
    'use strict';

    var module = angular.module('std.display', []);

    module.factory('stdDisplay',
        [
            function() {
                this.setVisibility = function(element, canDisplay) {
                    if (!canDisplay)
                        element.html('');
                };

                return {
                    setVisibility: this.setVisibility
                }
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.file.reader', []);

    module.factory('stdFileReader',
        [
            function() {
                this.read = function(file, allowed) {
                    if (allowed === 'image') {
                        var filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                        if (!filter.test(file.type)) { alert("You must select a valid image file!"); return; }
                    }

                    return new Promise(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var results = {
                                data: e.target.result,
                                mimeType: file.type,
                                filename: file.name
                            };
                            resolve(results)
                        };
                        reader.readAsDataURL(file);
                    });
                };

                return {
                    read: this.read
                }
            }
        ]);
})();

(function(){
    'use strict';
    var module = angular.module('std.filter', []);
    module.service('stdFilter',
        [
            '$filter',
            function ($filter) {
                /**
                 * Returns null for null, a msg (invalid date) for an invalid date object or the
                 * result of angular's date filter.
                 * @param {Date} date - Date object.
                 * @param {string} format - specifies the output format -- see angular's $filter('date').
                 */

                this.formatDate = function (date, format) {
                    if (date === null)
                        return null;
                    if (isNaN(date.getTime()))
                        return '';
                    return $filter('date')(date, format);
                };
            }
        ]);
})();
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
(function(){
    'use strict';

    var module = angular.module('std.number', []);

    module.factory('stdNumber',
        [
            function() {
                this.isUndefined = function(property) {
                    return typeof property === 'undefined'
                };

                return {
                    getClosest: this.getClosest,
                    isUndefined: this.isUndefined,
                    tryParseInt: this.tryParseInt
                }
            }
        ]);
})();
(function(){
    'use strict';

    var module = angular.module('std.operator.lookup', []);

    module.factory('stdOperatorLookup',
        [
            function() {
                var operatorLookup = {
                    'equal': {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    },
                    'not-equal': {
                        operator: 'not-eq',
                        operatorImage: 'ico-not-equal',
                        operatorImageMessage: 'Not Equal To'
                    },
                    'greater-than': {
                        operator: 'gt',
                        operatorImage: 'ico-greater-than',
                        operatorImageMessage: 'Greater Than'
                    },
                    'greater-than-or-equal': {
                        operator: 'ge',
                        operatorImage: 'ico-greater-than-or-equal',
                        operatorImageMessage: 'Greater Than Or Equal To'
                    },
                    'less-than': {
                        operator: 'lt',
                        operatorImage: 'ico-less-than',
                        operatorImageMessage: 'Less Than'
                    },
                    'less-than-or-equal': {
                        operator: 'le',
                        operatorImage: 'ico-less-than-or-equal',
                        operatorImageMessage: 'Less Than Or Equal To'
                    },
                    'contains': {
                        operator: 'contains',
                        operatorImage: 'ico-contains',
                        operatorImageMessage: 'Contains'
                    },
                    undefined: {
                        operator: 'eq',
                        operatorImage: 'ico-equal',
                        operatorImageMessage: 'Equal To'
                    }
                };

                return operatorLookup;
            }
        ]);
})();


(function(){
    'use strict';

    var module = angular.module('std.util', []);

    /**
     * @ngdoc service
     * @name std.util.service:stdUtil
     *
     * @description
     * Common functions
     *
     */
    module.factory('stdUtil',
        [
            function() {
                /**
                 * @ngdoc method
                 * @name getCursorPosition
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns the inputs cursor position.
                 *
                 *
                 * @param {DOMElement} element html input element.
                 * @returns {number} position of the cursor.
                 */
                this.getCursorPosition = function(element) {
                    var cursorPos = 0;
                    if (document.selection) {
                        element.focus();
                        var selection = document.selection.createRange();
                        selection.moveStart('character', -element.value.length);
                        cursorPos = selection.text.length;
                    }
                    else if (element.selectionStart || element.selectionStart == '0')
                        cursorPos = element.selectionStart;
                    return (cursorPos);
                };

                /**
                 * @ngdoc method
                 * @name getClosestParentByClass
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns the closest parent element by class name.
                 *
                 *
                 * @param {DOMElement} element any DOM element.
                 * @param {string} selector css class name of the element you what to find.
                 * @returns {DOMElement} returns a DOM element, else null if not found.
                 */
                this.getClosestParentByClass = function(element, selector) {
                    var firstChar = selector.charAt(0);
                    for (; element && element !== document; element = element.parentNode) {
                        if (firstChar === '.') {
                            if (element.classList && element.classList.contains(selector.substr(1))) {
                                return element;
                            }
                        }
                    }
                    return null;
                };

                /**
                 * @ngdoc method
                 * @name isUndefined
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Returns whether a given property or variable is undefined.
                 *
                 *
                 * @param {object} entity property or variable.
                 * @returns {boolean} returns true if undefined.
                 */
                this.isUndefined = function(entity) {
                    return typeof entity === 'undefined'
                };

                /**
                 * @ngdoc method
                 * @name tryParseInt
                 * @methodOf std.util.service:stdUtil
                 *
                 * @description
                 * Attempts to parse a string into an integer.
                 * If the string is not parseable it returns the provided defaultValue.
                 *
                 * @param {string} str string to parse.
                 * @param {string} defaultValue the value to return if str is not parseable.
                 * @returns {boolean} returns an integer or the given default value.
                 */
                this.tryParseInt = function(str, defaultValue) {
                    var retValue = defaultValue;
                    if(str !== null) {
                        if(str.length > 0) {
                            if (!isNaN(str)) {
                                retValue = parseInt(str);
                            }
                        }
                    }
                    return retValue;
                };

                this.isDate = function(date) {
                    if ( Object.prototype.toString.call(date) === '[object Date]' ) {
                        if (isNaN(date.getTime())) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };

                return {
                    getCursorPosition: this.getCursorPosition,
                    getClosestParentByClass: this.getClosestParentByClass,
                    isUndefined: this.isUndefined,
                    tryParseInt: this.tryParseInt,
                    isDate: this.isDate
                }
            }
        ]);
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdBoolean', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v ? 'True' : 'False';
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    var v = cfg.value.$;
                    return stdFilter.formatDate(v, 'MM/dd/yyyy hh:mm a');
                };
            }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDatetimeSpanShort',
        ['stdFilter',
            function (stdFilter) {
                return function (cfg) {
                    cfg = cfg.children;
                    var start = cfg.start.value.$;
                    var end = cfg.end.value.$;
                    var text = '';
                    if (start !== null) {
                        text = stdFilter.formatDate(start, 'MM/dd/yyyy hh:mm a') + ' - ';
                        if (end != null) {
                            if (start.getYear() === end.getYear() && start.getMonth() === end.getMonth() && start.getDay() === end.getDay())
                                text += stdFilter.formatDate(end, 'hh:mm a');
                            else
                                text += stdFilter.formatDate(end, 'MM/dd/yyyy hh:mm a');
                        }
                    } else {
                        if (end !== null)
                            text += stdFilter.formatDate(end, 'MM/dd/yyyy hh:mm a');
                    }
                    return text;
                };
            }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdDecimal', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdFile', [function () {
        return function (cfg) {
            var text = '';
            if (cfg.children.filename.value.$ !== null)
                text += cfg.children.filename.value.$;
            return text;
            //cfg = cfg.children;
            //var length = cfg.length.value.$;
            //var mb = 1024 * 1024;
            //var size;
            //if (length > mb * 0.01)
            //    size = (length / mb).toFixed(2) + ' MB';
            //else
            //    size = (length / 1024).toFixed(2) + ' KB';
            //var text = cfg.filename.value.$ + ' (' + size + ')';
            //return text;
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdFloat', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdInteger', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if(v === null)
                return null;
            return v.toString();
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdIntlAddress', ['dataService', function (dataService) {
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    goog.require('goog.dom');
    goog.require('goog.json');
    goog.require('goog.proto2.ObjectSerializer');
    goog.require('goog.string.StringBuffer');
    goog.require('i18n.phonenumbers.AsYouTypeFormatter');
    goog.require('i18n.phonenumbers.PhoneNumberFormat');
    goog.require('i18n.phonenumbers.PhoneNumberType');
    goog.require('i18n.phonenumbers.PhoneNumberUtil');
    goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

    module.filter('stdIntlPhone', ['stdCountries', function (countries) {
        return function (cfg) {
            var field = cfg;
            cfg = cfg.children;
            var text = '';
            if (cfg.countryCode.value.$ !== null) {
                var country = _.find(countries.allCountries, function (country) { return country.iso2 === cfg.countryCode.value.$ });
                var dialCode = country.dialCode;
                text += '+' + dialCode + ' ';
            }
            if (cfg.phone.value.$ !== null) {
                var clean = cfg.phone.value.$.replace(/[^0-9]/g, '');
                try {
                    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
                    var PNF = i18n.phonenumbers.PhoneNumberFormat;
                    var countryCode = cfg.countryCode.value.$ ? cfg.countryCode.value.$ : field.property.countryCode;
                    var number = phoneUtil.parseAndKeepRawInput(clean, countryCode);
                    text += phoneUtil.format(number, PNF.NATIONAL) + ' ';
                } catch(e) {
                    text += clean + ' ';
                }
            }
            if (cfg.extension.value.$ !== null)
                text += ' x' + cfg.extension.value.$;
            return text;
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPassword', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 0)
                return '********';
            return '';
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPercentage', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return (v * 100).toFixed(2) + '%';
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdPicture', [function () {
        return function (cfg) {
            var text = '';
            if (cfg.children.filename.value.$ !== null)
                text += cfg.children.filename.value.$;
            return text;
            //cfg = cfg.children;
            //var length = cfg.length.value.$;
            //var mb = 1024 * 1024;
            //var size;
            //if (length > mb * 0.01)
            //    size = (length / mb).toFixed(2) + ' MB';
            //else
            //    size = (length / 1024).toFixed(2) + ' KB';
            //var text = cfg.filename.value.$ + ' (' + size + ')';
            //return text;
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdRef', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.toString();
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdText', [function () {
        return function (cfg) {
            return cfg.value.$;
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdTimeSpanHhMmSs', [function () {
        return function (cfg) {
            cfg = cfg.children;
            return cfg.hours.value.$ + ' H, ' + cfg.minutes.value.$ + ' M, ' + cfg.seconds.value.$ + '.' + cfg.milliseconds.value.$ + ' S';
        };
    }])
})();
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
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaDollars', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return '$' + v.toFixed(2);
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaSocialSecurity', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            return v.substring(0, 3) + '-' + v.substring(3, 5) + '-' + v.substring(5);
        };
    }])
})();
(function () {
    'use strict';

    var module = angular.module('std.formatters');

    module.filter('stdUsaZip', [function () {
        return function (cfg) {
            var v = cfg.value.$;
            if (v === null)
                return null;
            if (v.length > 5)
                return v.substring(0, 5) + '-' + v.substring(5);
            return v;
        };
    }])
})();
angular.module('tru.type.lib').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/common/std-download.html',
    "<div>\r" +
    "\n" +
    "    <form action=\"{{data.url}}\" action=\"POST\">\r" +
    "\n" +
    "        <input type=\"hidden\" name=\"refs\" value=\"{{data.refs}}\">\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-adorner-edit.html',
    "<div>\r" +
    "\n" +
    "    <input data-ng-focus=\"onFocus()\"\r" +
    "\n" +
    "           type=\"text\"/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/edit/std-checkbox-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-checked=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"checkbox\">\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-country-code-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div style=\"height:20px\">\r" +
    "\n" +
    "        <div style=\"float:left;position:relative;top:50%;transform:translateY(-50%);margin-right:3px;width:20px;\" class=\"iti-flag\" data-ng-class=\"data.selectedCountryIso2\"></div>\r" +
    "\n" +
    "        <select data-ng-model=\"data.selectedCountry\"\r" +
    "\n" +
    "                data-ng-options=\"x as x.name for x in countries\"\r" +
    "\n" +
    "                data-ng-change=\"onChange(data.selectedCountry)\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                class=\"ttl-dropdown-edit dropdown control\"\r" +
    "\n" +
    "                style=\"float:left;width:100px;\">\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-date-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-date-wrapper\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-std-date\r" +
    "\n" +
    "                   data-std-calendar display=\"show\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   class=\"ttl-date\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <button data-ng-click=\"show = !show\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                tabindex=\"-1\"\r" +
    "\n" +
    "                class=\"ttl-date-button\"><i class=\"ttl-date-button-icon ico-calendar\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-datetime-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-datetime-wrapper\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-std-datetime=\"field\" is-nullable=\"field.type.isNullable\"\r" +
    "\n" +
    "                   data-std-calendar display=\"show\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   style=\"float:left;width:140px;\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <button data-ng-click=\"show = !show\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                class=\"ttl-date-button\"\r" +
    "\n" +
    "                tabindex=\"-1\"\r" +
    "\n" +
    "                style=\"float:left\"><i class=\"ttl-date-button-icon ico-calendar\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-datetime-span-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <tru-column>\r" +
    "\n" +
    "        <div style=\"min-width:320px\">\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <std-datetime-edit label=\"Start\" field=\"field.children.start\"></std-datetime-edit>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <std-datetime-edit label=\"End\" field=\"field.children.end\"></std-datetime-edit>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </tru-column>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-decimal-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           std-decimal=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-dropdown-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-dropdown-edit-wrapper\">\r" +
    "\n" +
    "        <div data-ng-show=\"!data.show\" style=\"position:relative;background-color:#fff;height:20px;width:100%;z-index:100;\"><p>Loading...</p></div>\r" +
    "\n" +
    "        <select data-ng-model=\"data.value\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "                data-ng-change=\"onChange()\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                data-ng-show=\"data.show\"\r" +
    "\n" +
    "                data-z-validate\r" +
    "\n" +
    "                class=\" dropdown control\"\r" +
    "\n" +
    "                data-ng-class=\"showGoTo ? 'ttl-dropdown-edit' : 'ttl-dropdown-edit-no-button'\">\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <button data-ng-click=\"goTo()\"\r" +
    "\n" +
    "                data-ng-show=\"showGoTo\"\r" +
    "\n" +
    "                data-ng-cloak\r" +
    "\n" +
    "                data-ng-style=\"showGoTo ? {'display': 'block'} : {'display': 'none'}\"\r" +
    "\n" +
    "                class=\"tvl-btn\"\r" +
    "\n" +
    "                style=\"float:left;height:20px;width:25px;padding:0;position:relative;display:none;\"\r" +
    "\n" +
    "                type=\"button\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "            <i style=\"\" class=\"icon-external-link\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-file-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <button data-ng-click=\"upload()\"\r" +
    "\n" +
    "            data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "            class=\"btn btn_textOnly\">Upload</button>\r" +
    "\n" +
    "    <a data-ng-click=\"download()\"\r" +
    "\n" +
    "       data-ng-disabled=\"!field.value.data\"\r" +
    "\n" +
    "       download=\"\"\r" +
    "\n" +
    "       href=\"\"\r" +
    "\n" +
    "       class=\"anchorElement download btn btn_textOnly\"\r" +
    "\n" +
    "       style=\"vertical-align: middle;\">Download</a>\r" +
    "\n" +
    "    <input data-ng-model=\"field.property.data\"\r" +
    "\n" +
    "           data-std-file-change=\"fileChanged($event)\"\r" +
    "\n" +
    "           type=\"file\"\r" +
    "\n" +
    "           class=\"fileElement\"\r" +
    "\n" +
    "           style=\"display:none\"/>\r" +
    "\n" +
    "    <div style=\"overflow:hidden;padding:5px;\">\r" +
    "\n" +
    "        <div class=\"renderElement\"></div>\r" +
    "\n" +
    "        <p data-ng-if=\"noDataMessage\" style=\"color:red;\">{{noDataMessage}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-float-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           std-float=\"field.type.isNullable\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-integer-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-integer-only=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-intl-address-basic-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 375px);height:25px;\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:200px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"State/Province\" field=\"field.children.stateProvince\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:175px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"Postal Code\" field=\"field.children.postalCode\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Country\" field=\"field.children.country\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-intl-address-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-dropdown-edit label=\"Country\" field=\"field.children.country\"></std-dropdown-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 370px);\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:175px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"State/Province\" field=\"field.children.stateProvince\" ng-show=\"showStateProvinceText\"></std-textbox-edit>\r" +
    "\n" +
    "            <std-intl-state-edit label=\"State/Province\" field=\"field.children\" ng-show=\"!showStateProvinceText\"></std-intl-state-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:195px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"Postal Code\" field=\"field.children.postalCode\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-intl-phone-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div style=\"width:100%;min-width:300px\">\r" +
    "\n" +
    "        <div style=\"float:left;width:105px\">\r" +
    "\n" +
    "            <div style=\"height:20px\">\r" +
    "\n" +
    "                <!--<div style=\"float:left;position:relative;top:50%;transform:translateY(-50%);margin-right:3px;width:20px;\" class=\"iti-flag\" data-ng-class=\"field.children.countryCode.value.$\"></div>-->\r" +
    "\n" +
    "                <select data-ng-model=\"data.selectedCountry\"\r" +
    "\n" +
    "                        data-ng-options=\"x as x.name for x in countries\"\r" +
    "\n" +
    "                        data-ng-change=\"onCountryCodeChange(data.selectedCountry)\"\r" +
    "\n" +
    "                        data-ng-disabled=\"!field.children.countryCode.context.isEditing || !field.children.countryCode.type.canEdit\"\r" +
    "\n" +
    "                        class=\"ttl-dropdown-edit dropdown control\"\r" +
    "\n" +
    "                        style=\"float:left;width:100px;\">\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 220px);\">\r" +
    "\n" +
    "            <i tabindex=\"-1\" class=\"icon-phone\" style=\"float:left;margin-right: 3px;margin-left: 0px;margin-top: 2px;\"></i>\r" +
    "\n" +
    "            <div style=\"height:18px;width:50px;background-color:#efefef;float:left;border:#cccccc 1px solid;text-align:center;line-height:18px;\">+{{field.property.dialCode}}</div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.children.phone.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.children.phone.context.isEditing || !field.children.phone.type.canEdit\"\r" +
    "\n" +
    "                   data-std-intl-phone\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   style=\"border-left-width: 0px;float: left;width: calc(100% - 70px);\"\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                    />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <div style=\"float:left;margin-right: 1px;margin-left: 3px;width:10px;margin-top:5px;\">x</div>\r" +
    "\n" +
    "            <input data-ng-model=\"field.children.extension.value.$\"\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.children.extension.context.isEditing || !field.children.extension.type.canEdit\"\r" +
    "\n" +
    "                   data-std-number-only\r" +
    "\n" +
    "                   maxlength=\"{{field.children.extension.type.property.maxLength}}\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   style=\"float: left;width: 100px;\"\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                    />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-intl-phone-number-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field.phone\">\r" +
    "\n" +
    "    <div style=\"height:18px;width:50px;background-color:#efefef;float:left;border:#cccccc 1px solid\">{{data.dialCode}}</div>\r" +
    "\n" +
    "    <input data-ng-model=\"field.phone.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.phone.context.isEditing || !field.phone.type.canEdit\"\r" +
    "\n" +
    "           maxlength=\"{{field.phone.type.property.maxLength}}\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           style=\"border-left-width: 0px;float: left;width: 200px;\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-intl-state-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-dropdown-edit-wrapper\">\r" +
    "\n" +
    "        <div data-ng-show=\"!data.show\" style=\"position:relative;background-color:#fff;height:20px;width:100%;z-index:100;\"><p>Loading...</p></div>\r" +
    "\n" +
    "        <select data-ng-model=\"data.value\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "                data-ng-change=\"onChange()\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.stateProvince.context.isEditing || !field.stateProvince.type.canEdit\"\r" +
    "\n" +
    "                data-z-validate\r" +
    "\n" +
    "                class=\"ttl-dropdown-edit-no-button dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-link-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <a data-ng-click=\"field.goTo()\"\r" +
    "\n" +
    "       data-ng-disabled=\"!field.type.canEdit\"\r" +
    "\n" +
    "       href=\"#\">{{field | stdId}}\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-masked-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input\r" +
    "\n" +
    "           data-ng-model=\"data.value\"\r" +
    "\n" +
    "           data-ng-model-options=\"{ updateOn: 'default blur'}\"\r" +
    "\n" +
    "           data-ng-change=\"onChange()\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-mask=\"{{field.property.entryFilter}}\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           placeholder=\"{{field.property.watermark}}\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-multiline-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <textarea data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "              data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "              data-ng-trim=\"false\"\r" +
    "\n" +
    "              data-z-validate\r" +
    "\n" +
    "              rows=\"{{field.property.rows}}\"\r" +
    "\n" +
    "              style=\"width:100%;\">\r" +
    "\n" +
    "    </textarea>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-na-phone-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-na-phone\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           placeholder=\"+1 ___-___- ____ x____\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-password-edit.html',
    "<div class=\"ttl-password-edit-wrapper\">\r" +
    "\n" +
    "    <div\r" +
    "\n" +
    "        std-modals\r" +
    "\n" +
    "        ng-show=\"subview\"\r" +
    "\n" +
    "        class=\"ttl-modals\"\r" +
    "\n" +
    "        ng-switch=\"subview\">\r" +
    "\n" +
    "        <div data-ng-controller=\"stdPasswordModalController\"\r" +
    "\n" +
    "            data-ng-switch-when=\"password\"\r" +
    "\n" +
    "            data-tru-label-container\r" +
    "\n" +
    "            data-std-trap-focus\r" +
    "\n" +
    "            class=\"ttl-modal\" style=\"height:125px;min-height:0;\">\r" +
    "\n" +
    "            <div style=\"position:absolute;top:0;left:0;right:0;height:30px;\">\r" +
    "\n" +
    "                <h4 style=\"margin-left: 5px;margin-top: 5px;float:left;\">\r" +
    "\n" +
    "                    {{setOrChange}} Password\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <button type=\"button\" style=\"float:right;font-size:12px;padding:0;margin-right: 5px;margin-top: 5px;\" class=\"desktop-btn desktop-btn-default desktop-window-close-button excluded\" data-ng-class=\"{'desktop-window-close-button': window.active}\" title=\"Close Dialog - [ESC]\" data-ng-click=\"cancel($event)\" tabindex=\"-1\">\r" +
    "\n" +
    "                    <span class=\"desktop-icon-close\"></span>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;top:30px;left:0;right:0;bottom:35px;height:auto;\">\r" +
    "\n" +
    "                <div>\r" +
    "\n" +
    "                    <div>\r" +
    "\n" +
    "                        <tru-label label=\"Password\">\r" +
    "\n" +
    "                            <input type=\"password\"\r" +
    "\n" +
    "                                   data-ng-model=\"data.password\"\r" +
    "\n" +
    "                                   data-ng-change=\"onPasswordChange()\"\r" +
    "\n" +
    "                                   data-ng-mouseenter=\"onPasswordMouseEnter()\"\r" +
    "\n" +
    "                                   data-ng-mouseleave=\"onPasswordMouseLeave()\"\r" +
    "\n" +
    "                                   data-ng-keydown=\"onPasswordKeyDown($event)\"\r" +
    "\n" +
    "                                   data-ng-class=\"{'ttl-invalid-input': errorMessage ? true : false}\"\r" +
    "\n" +
    "                                   data-ng-focus=\"passwordIsFocused = true\"\r" +
    "\n" +
    "                                   data-ng-blur=\"passwordIsFocused = false\"\r" +
    "\n" +
    "                                    />\r" +
    "\n" +
    "                        <span class=\"ttl-invalid-indicator\" data-ng-show=\"field.context.isEditing && errorMessage && mouseOverPassword && passwordIsFocused\">\r" +
    "\n" +
    "                            <i class=\"icon-warning-sign icon-white\"></i>{{errorMessage}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                        </tru-label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div style=\"margin-top: 5px;\">\r" +
    "\n" +
    "                        <tru-label label=\"Confirm Password\">\r" +
    "\n" +
    "                            <input type=\"password\"\r" +
    "\n" +
    "                                   data-ng-model=\"data.confirmPassword\"\r" +
    "\n" +
    "                                   data-ng-change=\"onConfirmPasswordChange()\"\r" +
    "\n" +
    "                                   data-ng-mouseenter=\"onConfirmPasswordMouseEnter()\"\r" +
    "\n" +
    "                                   data-ng-mouseleave=\"onConfirmPasswordMouseLeave()\"\r" +
    "\n" +
    "                                   data-ng-class=\"{'ttl-invalid-input': confirmErrorMessage ? true : false}\"\r" +
    "\n" +
    "                                   data-ng-focus=\"confirmPasswordIsFocused = true\"\r" +
    "\n" +
    "                                   data-ng-blur=\"confirmPasswordIsFocused = false\"\r" +
    "\n" +
    "                                    />\r" +
    "\n" +
    "                        <span class=\"ttl-invalid-indicator\" data-ng-show=\"field.context.isEditing && confirmErrorMessage && mouseOverConfirmPassword && confirmPasswordIsFocused\">\r" +
    "\n" +
    "                            <i class=\"icon-warning-sign icon-white\"></i>{{confirmErrorMessage}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                        </tru-label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;left:0;right:0;bottom:0;height:35px;\">\r" +
    "\n" +
    "                <div style=\"float:right;margin-right: 5px;\">\r" +
    "\n" +
    "                    <button data-ng-click=\"onOkClick()\"\r" +
    "\n" +
    "                            data-ng-keydown=\"onOkKeyDown($event)\"\r" +
    "\n" +
    "                            data-ng-class=\"{'tvl-btn-primary': formIsValid}\"\r" +
    "\n" +
    "                            data-ng-disabled=\"!formIsValid\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"onClearClick()\"\r" +
    "\n" +
    "                            data-ng-if=\"field.type.isNullable\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set No Value\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"onCancelClick()\"\r" +
    "\n" +
    "                            data-ng-keydown=\"onCancelKeyDown($event)\"\r" +
    "\n" +
    "                            class=\"tvl-btn\"\r" +
    "\n" +
    "                            >Cancel\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <tru-label label=\"{{label}}\">\r" +
    "\n" +
    "        <button data-ng-click=\"onPasswordButtonClick()\"\r" +
    "\n" +
    "                data-ng-keydown=\"onPasswordButtonKeyDown($event)\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                data-ng-class=\"{'ttl-invalid-button': field.getValidationErrors().length > 0}\"\r" +
    "\n" +
    "                data-ng-mouseenter=\"onMouseEnterPasswordButton()\"\r" +
    "\n" +
    "                data-ng-mouseleave=\"onMouseLeavePasswordButton()\"\r" +
    "\n" +
    "                class=\"tvl-btn\"\r" +
    "\n" +
    "                >{{setOrChange}} Password...\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "        <span class=\"ttl-invalid-indicator\" data-ng-show=\"field.context.isEditing && field.getValidationErrors().length > 0 && mouseOverPasswordButton\">\r" +
    "\n" +
    "            <i class=\"icon-warning-sign icon-white\"></i>Password is required.\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </tru-label>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/edit/std-percent-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-percent=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-record-picker-edit.html',
    "<div class=\"ttl-record-picker-outer-wrapper\">\r" +
    "\n" +
    "    <div\r" +
    "\n" +
    "            std-modals\r" +
    "\n" +
    "            ng-show=\"subview\"\r" +
    "\n" +
    "            class=\"ttl-modals\"\r" +
    "\n" +
    "            ng-switch=\"subview\">\r" +
    "\n" +
    "        <div data-ng-controller=\"stdRecordPickerModalController\"\r" +
    "\n" +
    "             data-ng-switch-when=\"recordPicker\"\r" +
    "\n" +
    "             data-ng-style=\"{'height': modal.height, 'width': modal.width}\"\r" +
    "\n" +
    "             data-tru-label-container\r" +
    "\n" +
    "             data-std-trap-focus\r" +
    "\n" +
    "             class=\"ttl-modal\">\r" +
    "\n" +
    "            <div style=\"position:absolute;top:0;left:0;right:0;height:30px;\">\r" +
    "\n" +
    "                <h4 style=\"margin-left: 5px;margin-top: 5px;float:left;\">\r" +
    "\n" +
    "                    {{title}}\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <button type=\"button\" style=\"float:right;font-size:12px;padding:0;margin-right: 5px;margin-top: 5px;\" class=\"desktop-btn desktop-btn-default desktop-window-close-button excluded\" data-ng-class=\"{'desktop-window-close-button': window.active}\" title=\"Close Dialog - [ESC]\" data-ng-click=\"cancel($event)\" tabindex=\"-1\">\r" +
    "\n" +
    "                    <span class=\"desktop-icon-close\"></span>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;top:30px;left:0;right:0;bottom:35px\">\r" +
    "\n" +
    "                <div std-picker-view style=\"position:absolute;top:0;left:0;right:0;bottom:0;\"></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;left:0;right:0;bottom:0;height:35px;\">\r" +
    "\n" +
    "                <div style=\"float:right;margin-right:5px;margin-top: 5px;\">\r" +
    "\n" +
    "                    <button data-ng-click=\"submit()\"\r" +
    "\n" +
    "                            data-ng-keydown=\"submitByEnter($event)\"\r" +
    "\n" +
    "                            data-ng-disabled=\"!selectedId || childSearchIsFocused\"\r" +
    "\n" +
    "                            data-ng-class=\"{'tvl-btn-primary': selectedId && !childSearchIsFocused}\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"clear()\"\r" +
    "\n" +
    "                            data-ng-if=\"field.type.isNullable\"\r" +
    "\n" +
    "                            data-ng-keydown=\"onClearKeydown($event)\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            title=\"Sets the value to null in the database\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set No Value\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"cancel($event)\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            class=\"tvl-btn\"\r" +
    "\n" +
    "                            >Cancel\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-n\" data-std-resizable data-modal=\"modal\" data-direction=\"n\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-s\" data-std-resizable data-modal=\"modal\" data-direction=\"s\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-e\" data-std-resizable data-modal=\"modal\" data-direction=\"e\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-w\" data-std-resizable data-modal=\"modal\" data-direction=\"w\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-ne\" data-std-resizable data-modal=\"modal\" data-direction=\"ne\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-nw\" data-std-resizable data-modal=\"modal\" data-direction=\"nw\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-se\" data-std-resizable data-modal=\"modal\" data-direction=\"se\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-sw\" data-std-resizable data-modal=\"modal\" data-direction=\"sw\"></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <tru-label field=\"field\" label=\"{{label}}\">\r" +
    "\n" +
    "        <div class=\"ttl-record-picker-wrapper\" data-ng-if=\"!field.context.isGrid\">\r" +
    "\n" +
    "            <div data-ng-mousedown=\"onInputMousedown()\" data-ng-class=\"showLink ? 'ttl-record-picker-display-value-wrapper' : 'ttl-record-picker-display-value-wrapper-no-button'\">\r" +
    "\n" +
    "                <div class=\"ttl-record-picker-display-value\" tabindex=\"-1\">\r" +
    "\n" +
    "                    <a data-ng-click=\"goTo()\" href=\"#\" data-ng-show=\"showLink\">{{data.displayValue}}</a>\r" +
    "\n" +
    "                    <p data-ng-show=\"!showLink\" style=\"line-height:6px;\">{{data.displayValue}}</p>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button data-ng-click=\"onClick()\"\r" +
    "\n" +
    "                    data-ng-keydown=\"onKeydown($event)\"\r" +
    "\n" +
    "                    data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit || open\"\r" +
    "\n" +
    "                    data-ng-show=\"showLink\"\r" +
    "\n" +
    "                    class=\"tvl-btn\"\r" +
    "\n" +
    "                    style=\"float:left;height:20px;width:25px;padding:0;position:relative;\"\r" +
    "\n" +
    "                    ><i class=\"icon-search icon-flip-horizontal\"></i>\r" +
    "\n" +
    "                <i style=\"color:green;margin-left:5px;margin-top:3px;position:absolute;z-index:5;top:0;left:-20px;\" class=\"ttl-date-button-icon icon-arrow-right animated shake\" data-ng-show=\"showArrow && showLink\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </tru-label>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/edit/std-text-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <p>{{field | stdId}}</p>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-textbox-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           maxlength=\"{{field.type.property.maxLength}}\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "           />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-time-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div style=\"float:left\">\r" +
    "\n" +
    "            <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                   data-std-duration\r" +
    "\n" +
    "                   data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                   data-ng-trim=\"false\"\r" +
    "\n" +
    "                   data-z-validate\r" +
    "\n" +
    "                   placeholder=\"__:__\"\r" +
    "\n" +
    "                   type=\"text\"\r" +
    "\n" +
    "                   class=\"text text_full ttl-time\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-usa-address-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;min-width:475px\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-dropdown-edit label=\"State\" field=\"field.children.state\"></std-dropdown-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-usa-zip-5-edit label=\"Zip\" field=\"field.children.zip\"></std-usa-zip-5-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-usa-address-zip-9-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-dropdown-edit label=\"State\" field=\"field.children.state\"></std-dropdown-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-usa-zip-9-edit label=\"Zip\" field=\"field.children.zip\"></std-usa-zip-9-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/edit/std-usa-dollar-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-usa-dollar=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-usa-zip-5-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-integer-only=\"field\"\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           maxlength=\"5\"\r" +
    "\n" +
    "           placeholder=\"_____\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/edit/std-usa-zip-9-edit.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "           data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "           data-ng-trim=\"false\"\r" +
    "\n" +
    "           data-std-zip\r" +
    "\n" +
    "           data-z-validate\r" +
    "\n" +
    "           maxlength=\"10\"\r" +
    "\n" +
    "           placeholder=\"_________\"\r" +
    "\n" +
    "           type=\"text\"\r" +
    "\n" +
    "            />\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/list/std-checkbox-list-edit.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-list-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-checked=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "               data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "               class=\"ttl-checkbox-list\"\r" +
    "\n" +
    "               type=\"checkbox\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/templates/list/std-checkbox-list.html',
    "<div tabindex=\"-1\">\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-list-wrapper\" tabindex=\"-1\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "            data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "            data-std-indeterminate=\"field.type.isNullable\"\r" +
    "\n" +
    "            tabindex=\"-1\"\r" +
    "\n" +
    "            class=\"ttl-checkbox-list\"\r" +
    "\n" +
    "            type=\"checkbox\"/>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/list/std-dropdown-list.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div class=\"ttl-dropdown-edit-wrapper\">\r" +
    "\n" +
    "        <div data-ng-show=\"!data.show\" style=\"position:relative;background-color:#fff;height:20px;width:100%;z-index:100;\"><p>Loading...</p></div>\r" +
    "\n" +
    "        <select data-ng-model=\"data.value\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "                data-ng-change=\"onChange()\"\r" +
    "\n" +
    "                data-ng-disabled=\"!field.context.isEditing || !field.type.canEdit\"\r" +
    "\n" +
    "                data-ng-show=\"data.show\"\r" +
    "\n" +
    "                data-z-validate\r" +
    "\n" +
    "                class=\" dropdown control\"\r" +
    "\n" +
    "                data-ng-class=\"showGoTo() ? 'ttl-dropdown-edit' : 'ttl-dropdown-edit-no-button'\">\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/list/std-text-list.html',
    "<div>\r" +
    "\n" +
    "    <p>{{field.value.$}}</p>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/templates/query/std-boolean-dropdown-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <select data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in choices\"\r" +
    "\n" +
    "                data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                std-select-value-converter\r" +
    "\n" +
    "                class=\"dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-checkbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-checkbox-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-std-indeterminate\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               type=\"checkbox\"/>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': field.value.$}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"field.value.$ = undefined\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-date\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startDate}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"onStartOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       >\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endDate}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"onEndOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       >\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-date-span-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <std-date-query label=\"\" field=\"field.children.start\"></std-date-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <std-date-query label=\"\" field=\"field.children.end\"></std-date-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': field.value.$}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"field.value.$ = undefined\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-date\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"data.startValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-time\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"data.endValue = undefined\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-date\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endDate\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-time\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-datetime-span-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <std-datetime-query label=\"Zip\" field=\"field.children.zip\"></std-datetime-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <std-integer-query label=\"Zip\" field=\"field.children.zip\"></std-integer-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-decimal-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-decimal=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-dropdown-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <select data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in data.choices\"\r" +
    "\n" +
    "                data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                std-select-value-converter\r" +
    "\n" +
    "                class=\"ttl-dropdown-edit dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-float-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-float=\"field.type.isNullable\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-integer-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-model-options=\"{allowInvalid:true}\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-integer-only=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-integer-range-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-start\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.startValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{startOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"startOperatorImage\" data-ng-click=\"onStartOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.startValue\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.startValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-integer-only=\"field\"\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ttl-integer-range-query-end\">\r" +
    "\n" +
    "            <div data-ng-class=\"{'ttl-operator-icon-has-value': data.endValue}\" class=\"ttl-operator-icon-wrapper\" title=\"{{endOperatorImageMessage}}\">\r" +
    "\n" +
    "                <i tabindex=\"-1\" class=\"ttl-operator-icon ttl-integer-range-query-end-icon\" data-ng-class=\"endOperatorImage\" data-ng-click=\"onEndOperatorClick()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"ttl-integer-range-query-end-input-wrapper\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.endValue\"\r" +
    "\n" +
    "                       data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.property.endValue || field.context.isEditing\"\r" +
    "\n" +
    "                       data-ng-trim=\"false\"\r" +
    "\n" +
    "                       data-std-integer-only=\"field\"\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       class=\"text text_full\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-intl-address-basic-query.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 1\" field=\"field.children.address1\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Address 2\" field=\"field.children.address2\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-edit label=\"Country\" field=\"field.children.country\"></std-textbox-edit>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"State/Province\" field=\"field.children.stateProvince\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"City\" field=\"field.children.city\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-textbox-edit label=\"Postal Code\" field=\"field.children.postalCode\"></std-textbox-edit>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-intl-address-query.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 1\" field=\"field.children.address1\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 2\" field=\"field.children.address2\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-dropdown-query label=\"Country\" field=\"field.children.country\"></std-dropdown-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 370px);\">\r" +
    "\n" +
    "            <std-textbox-query label=\"City\" field=\"field.children.city\"></std-textbox-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:175px\">\r" +
    "\n" +
    "            <std-dropdown-query label=\"State/Province\" field=\"field.children.stateProvince\"></std-dropdown-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:195px\">\r" +
    "\n" +
    "            <std-textbox-query label=\"Postal Code\" field=\"field.children.postalCode\"></std-textbox-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-null-not-null-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"padding-left:18px;\">\r" +
    "\n" +
    "        <select data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "                data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "                data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "                data-ng-options=\"x.value.$ as x.label for x in data.choices\"\r" +
    "\n" +
    "                data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                std-select-value-converter\r" +
    "\n" +
    "                class=\"ttl-dropdown-edit dropdown control\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-or-list-checkbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': checked || !valueIsUndefined() }\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-or-list-checkbox-query-wrapper\">\r" +
    "\n" +
    "        <ul class=\"hList tickGroup\" data-ng-if=\"valueIsUndefined()\" data-tru-label-container>\r" +
    "\n" +
    "            <li data-ng-repeat=\"choice in data.choices\">\r" +
    "\n" +
    "                <label class=\"checkbox\">\r" +
    "\n" +
    "                    <input class=\"ttl-or-list-checkbox\" type=\"checkbox\" data-ng-model=\"choice.checked\" data-ng-disabled=\"field.context.isEditing\" data-ng-change=\"updateQueryPredicate()\"/>{{choice.label}}\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.labels.join()}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-percent-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-percent=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-radio-list-button-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': checked || !valueIsUndefined() }\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-radio-list-button-wrapper\">\r" +
    "\n" +
    "        <form data-ng-if=\"valueIsUndefined()\">\r" +
    "\n" +
    "            <ul class=\"hList tickGroup\">\r" +
    "\n" +
    "                <li data-ng-repeat=\"choice in data.choices\">\r" +
    "\n" +
    "                    <label class=\"checkbox\">\r" +
    "\n" +
    "                        <input type=\"radio\" name=\"$parent.label\" data-ng-model=\"choice.checked\" data-ng-value=\"true\" data-ng-disabled=\"field.context.isEditing\" data-ng-change=\"updateQueryPredicate()\"/>{{choice.label}}\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{data.labels.join()}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-record-picker-query.html',
    "<div class=\"ttl-record-picker-outer-wrapper\">\r" +
    "\n" +
    "    <div\r" +
    "\n" +
    "            std-modals\r" +
    "\n" +
    "            ng-show=\"subview\"\r" +
    "\n" +
    "            class=\"ttl-modals\"\r" +
    "\n" +
    "            ng-switch=\"subview\">\r" +
    "\n" +
    "        <div data-ng-controller=\"stdRecordPickerModalController\"\r" +
    "\n" +
    "             data-ng-switch-when=\"recordPicker\"\r" +
    "\n" +
    "             data-ng-style=\"{'height': modal.height, 'width': modal.width}\"\r" +
    "\n" +
    "             data-tru-label-container\r" +
    "\n" +
    "             data-std-trap-focus\r" +
    "\n" +
    "             class=\"ttl-modal\">\r" +
    "\n" +
    "            <div style=\"position:absolute;top:0;left:0;right:0;height:30px;\">\r" +
    "\n" +
    "                <h4 style=\"margin-left: 5px;margin-top: 5px;float:left;\">\r" +
    "\n" +
    "                    {{title}} Picker\r" +
    "\n" +
    "                </h4>\r" +
    "\n" +
    "                <button type=\"button\" style=\"float:right;font-size:12px;padding:0;margin-right: 5px;margin-top: 5px;\" class=\"desktop-btn desktop-btn-default desktop-window-close-button excluded\" data-ng-class=\"{'desktop-window-close-button': window.active}\" title=\"Close Dialog - [ESC]\" data-ng-click=\"cancel($event)\" tabindex=\"-1\">\r" +
    "\n" +
    "                    <span class=\"desktop-icon-close\"></span>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;top:30px;left:0;right:0;bottom:35px\">\r" +
    "\n" +
    "                <div std-picker-view style=\"position:absolute;top:0;left:0;right:0;bottom:0;\"></div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"position:absolute;left:0;right:0;bottom:0;height:35px;\">\r" +
    "\n" +
    "                <div style=\"float:right;margin-right:5px;margin-top: 5px;\">\r" +
    "\n" +
    "                    <button data-ng-click=\"submit()\"\r" +
    "\n" +
    "                            data-ng-keydown=\"submitByEnter($event)\"\r" +
    "\n" +
    "                            data-ng-disabled=\"!selectedId || childSearchIsFocused\"\r" +
    "\n" +
    "                            data-ng-class=\"{'tvl-btn-primary': selectedId && !childSearchIsFocused}\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"clear()\"\r" +
    "\n" +
    "                            data-ng-if=\"field.type.isNullable\"\r" +
    "\n" +
    "                            data-ng-keydown=\"onClearKeydown($event)\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            title=\"Sets the value to null in the database\"\r" +
    "\n" +
    "                            class=\"tvl-btn\">Set No Value\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <button data-ng-click=\"cancel($event)\"\r" +
    "\n" +
    "                            type=\"button\"\r" +
    "\n" +
    "                            class=\"tvl-btn\"\r" +
    "\n" +
    "                            >Cancel\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-n\" data-std-resizable data-modal=\"modal\" data-direction=\"n\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-s\" data-std-resizable data-modal=\"modal\" data-direction=\"s\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-e\" data-std-resizable data-modal=\"modal\" data-direction=\"e\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-w\" data-std-resizable data-modal=\"modal\" data-direction=\"w\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-ne\" data-std-resizable data-modal=\"modal\" data-direction=\"ne\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-nw\" data-std-resizable data-modal=\"modal\" data-direction=\"nw\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-se\" data-std-resizable data-modal=\"modal\" data-direction=\"se\"></span>\r" +
    "\n" +
    "            <span class=\"ttl-modal-resizable-handle ttl-modal-resizable-sw\" data-std-resizable data-modal=\"modal\" data-direction=\"sw\"></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <tru-label field=\"field\" label=\"{{label}}\">\r" +
    "\n" +
    "        <div class=\"ttl-record-picker-query-wrapper\">\r" +
    "\n" +
    "            <div style=\"float:left;height: 20px;width:19px;background-color:#fff;\">\r" +
    "\n" +
    "                <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined() || !valueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "                    <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div data-ng-mousedown=\"onInputMousedown()\" style=\"float:left;width: calc(100% - 25px);background-color:#fff;\">\r" +
    "\n" +
    "                <input data-ng-model=\"data.displayValue\"\r" +
    "\n" +
    "                       data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                       data-ng-disabled=\"field.context.isEditing || open\"\r" +
    "\n" +
    "                       disabled=\"disabled\"\r" +
    "\n" +
    "                       type=\"text\"\r" +
    "\n" +
    "                       />\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button data-ng-click=\"onClick()\"\r" +
    "\n" +
    "                    data-ng-keydown=\"onKeydown($event)\"\r" +
    "\n" +
    "                    data-ng-disabled=\"field.context.isEditing || open\"\r" +
    "\n" +
    "                    data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "                    class=\"tvl-btn\"\r" +
    "\n" +
    "                    style=\"float:left;height:20px;width:25px;padding:0;position:relative;\"\r" +
    "\n" +
    "                    >...\r" +
    "\n" +
    "                <i style=\"color:green;margin-left:5px;margin-top:3px;position:absolute;z-index:5;top:0;left:-20px;\" class=\"ttl-date-button-icon icon-arrow-right animated shake\" data-ng-show=\"showArrow\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "            <p data-ng-if=\"!valueIsUndefined()\">{{data.label}}</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </tru-label>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/templates/query/std-textbox-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-textbox-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "               style=\"\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-usa-address-query.html',
    "<tru-label label=\"{{label}}\" field=\"field\">\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 1\" field=\"field.children.address1\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px\">\r" +
    "\n" +
    "        <std-textbox-query label=\"Address 2\" field=\"field.children.address2\"></std-textbox-query>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin-top:5px;width:100%;height:20px;\">\r" +
    "\n" +
    "        <div style=\"float:left;width: calc(100% - 255px);\">\r" +
    "\n" +
    "            <std-textbox-query label=\"City\" field=\"field.children.city\"></std-textbox-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:115px\">\r" +
    "\n" +
    "            <std-dropdown-query label=\"State\" field=\"field.children.state\"></std-dropdown-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left;width:140px\">\r" +
    "\n" +
    "            <std-integer-query label=\"Zip\" field=\"field.children.zip\"></std-integer-query>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );


  $templateCache.put('src/templates/query/std-usa-dollar-query.html',
    "<tru-label label=\"{{label}}\">\r" +
    "\n" +
    "    <div data-ng-class=\"{'ttl-operator-icon-has-value': !controlValueIsUndefined()}\" class=\"ttl-operator-icon-wrapper\" title=\"{{operatorImageMessage}}\">\r" +
    "\n" +
    "        <i tabindex=\"-1\" class=\"ttl-operator-icon\" data-ng-class=\"operatorImage\" data-ng-click=\"onOperatorClick()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"ttl-integer-query-wrapper\">\r" +
    "\n" +
    "        <input data-ng-model=\"field.value.$\"\r" +
    "\n" +
    "               data-ng-change=\"updateQueryPredicate()\"\r" +
    "\n" +
    "               data-ng-disabled=\"field.context.isEditing\"\r" +
    "\n" +
    "               data-ng-if=\"valueIsUndefined()\"\r" +
    "\n" +
    "               data-ng-trim=\"false\"\r" +
    "\n" +
    "               data-std-usa-dollar=\"field\"\r" +
    "\n" +
    "               type=\"text\"\r" +
    "\n" +
    "                />\r" +
    "\n" +
    "        <p data-ng-if=\"!valueIsUndefined()\">{{field.value.$}}</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</tru-label>"
  );

}]);
