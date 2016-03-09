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