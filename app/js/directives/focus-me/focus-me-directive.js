'use strict';

angular
    .module('directives.focusMe', [])
    .directive('focusMe', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focusMe, function(value) {
                    if (value === true) {
                        element[0].focus();
                    }
                });
            }
        };
    });