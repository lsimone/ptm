'use strict';

(function () {

    angular.module('myApp.list', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/list', {
                    templateUrl : 'list/list.html',
                    controller : 'ListCtrl'
                });
        }])

        .controller('ListCtrl', [function () {
        	this.todos = ["test", "due", "trete", "sine moi aqquai"];

        }]);

})();
