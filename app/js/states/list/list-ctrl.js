"use strict";

angular.module('states.list')
    .controller('ListCtrl', function($scope) {

var todos = [{
    text: "test"
}, {
    text: "due",
    priority: 2,
    todos: [{
            text: "subtask!!"
        }, {
            text: "subtask second",
            type: 0,
            todos: [{
                text: "sub sub"
            }]
        }, {
            text: "subtask3"
        }]
        // }, {
        // text : "trete",
        // todos : [{
        //     text : "done1",
        //     type : 1
        //     }, {
        //     text : "todo in done"
        //     }, {
        //     text : "done3",
        //     type : 1
        // }]
        // }, {
        // text : "sine moi aqquai"
}];
        $scope.todos = todos;
        $scope.newEntry = "";

        $scope.addNew = function() {
            if ($scope.newEntry && $scope.newEntry !== "") {
                $scope.todos.unshift({
                    text: $scope.newEntry
                });
                $scope.newEntry = "";
            }
        };
    });