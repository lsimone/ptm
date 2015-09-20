'use strict';

angular.module('states.list', [])
    .config(function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl: 'js/states/list/list.html',
            controller: 'ListCtrl'
        });
    });