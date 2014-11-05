'use strict';

(function () {
        	
    var INIT_NEW_ENTRY = "enter new entry...";


    var todos = [{
        text : "test"
        }, {
        text : "due"
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
                $scope.setEdit = function (e, index, edit) {
                    $scope.todos[index].edit = edit;
                    if (edit) {
                        var input = document.getElementById("input-" + index);
                        setTimeout(function () {
                            input.focus();
                            console.log(edit, $scope.todos);
                        }, 1)
                    }
                };

        }]);

})();
