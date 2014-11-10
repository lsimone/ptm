'use strict';

(function () {

    var INIT_NEW_ENTRY = "enter new entry...";


    var todos = [{
        text : "test"
        }, {
        text : "due",
        todos : [{
            text : "subtask!!"
        }]
        }, {
        text : "trete"
        }, {
        text : "sine moi aqquai"
    }];

    angular.module('myApp.list', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/list', {
                    templateUrl : 'list/list.html',
                    controller : 'ListCtrl'
                });
        }])
        .controller('ListCtrl', ["$scope", function ($scope) {
                $scope.todos = todos;
                $scope.newEntry = "";

                $scope.addNew = function () {
                    if ($scope.newEntry && $scope.newEntry != "") {
                        $scope.todos.unshift({
                            text : $scope.newEntry
                        });
                        $scope.newEntry = "";
                    }
                };
        }])
        .controller('TodoCtrl', ["$scope", function ($scope) {
                console.log("todo", $scope.todo);

                $scope.setEdit = function (e, index, edit) {
                    console.log("***", $scope.todo);
                    $scope.todo.edit = edit;
                    if (edit) {
                        var input = document.getElementById("input-" + index);
                        setTimeout(function () {
                            input.focus();
                            console.log(edit, $scope.todo);
                        }, 1)
                    }
                };

        }])
        .directive('todoList', function () {
            return {
                restrict : "E",
                scope : {
                    todos : "=",
                    setEdit : "&"
                },
                templateUrl : "list/todo-list.html"
            };
        })
        .directive('todo', function ($compile) {
            return {
                restrict : "E",
                templateUrl : "list/todo.html",
                link : function (scope, element, attrs) {
                    if (angular.isArray(scope.todo.todos)) {
                        $compile('<todo-list todos="todo.todos"></todo-list>')(scope, function (cloned, scope) {
                            element.append(cloned);
                        });
                    }
                }
            };
        })
        .directive('focusMe', function ($timeout) {
            return {
                link : function (scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function (value) {
                        if (value === true) {
                            element[0].focus();
                        }
                    });
                }
            };
        });

})();
