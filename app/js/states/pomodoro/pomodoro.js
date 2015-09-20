'use strict';

angular.module('states.pomodoro', [])

.config(function($routeProvider) {
	$routeProvider.when('/pomodoro', {
		templateUrl: 'js/states/pomodoro/pomodoro.html',
		controller: 'PomodoroCtrl'
	});
});