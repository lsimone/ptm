'use strict';

angular.module('myApp.pomodoro', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pomodoro', {
    templateUrl: 'pomodoro/pomodoro.html',
    controller: 'PomodoroCtrl'
  });
}])

.controller('PomodoroCtrl', [function() {

}]);