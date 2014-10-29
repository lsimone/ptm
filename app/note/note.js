'use strict';

angular.module('myApp.note', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/note', {
    templateUrl: 'note/note.html',
    controller: 'NoteCtrl'
  });
}])

.controller('NoteCtrl', [function() {

}]);