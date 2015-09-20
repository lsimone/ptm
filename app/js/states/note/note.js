'use strict';

angular.module('states.note', [])

.config(function($routeProvider) {
	$routeProvider.when('/note', {
		templateUrl: 'js/states/note/note.html',
		controller: 'NoteCtrl'
	});
});