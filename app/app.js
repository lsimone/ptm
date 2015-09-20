'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',

  // states
  'states.list',
  'states.note',
  'states.pomodoro',

  // directives
  'directives.ngDraggable',
  'directives.focusMe',
  'directives.todoList'
  
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
