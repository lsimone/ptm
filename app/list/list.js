'use strict';

(function () {

    var INIT_NEW_ENTRY = "enter new entry...";
    var types = ["today", "done"];


    var todos = [{
        text : "test"
        }, {
        text : "due",
        priority : 2,
        todos : [{
            text : "subtask!!"
            }, {
            text : "subtask second",
            type : 0,
            todos : [{
                text : "sub sub"
            }]
            }, {
            text : "subtask3"
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
        .controller('TodoCtrl', ['$rootScope', "$scope", "$compile", "$element", function ($rootScope, $scope, $compile, $element) {
                console.log("todo", $scope.type);
                var typeN = $scope.type ? types.indexOf($scope.type) : undefined;

                $scope.typeFilter = function (element) {
                    if (element.type === typeN) {
                        return true;
                    }
                    if (element.todos) {
                        for (var i in element.todos) {
                            if ($scope.typeFilter(element.todos[i])) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var prioritySuffix = ["up", "right", "down"];
                $scope.getPrioArrow = function (item) {
                    if (item.priority != undefined) {
                        return prioritySuffix[item.priority];
                    }
                    return "right";
                }

                $scope.toggleDone = function (item, done) {
                    done = (done != undefined) ? done : (item.type == 1) ? undefined : 1;
                    item.type = done;
                    angular.forEach(item.todos, function (value, key) {
                        $scope.toggleDone(value, done);
                    });
                    console.log($scope.todos);
                }

                $scope.changePriority = function (item) {
                    var prio = (item.priority != undefined) ? item.priority : 1;
                    item.priority = (prio + 1) % prioritySuffix.length;
                }

                $scope.addSubtask = function (item) {
                    console.log("SUBTASK");

                    if (!item.todos) {
                        item.todos = [];
                    }
                    item.todos.push({
                        text : 'new',
                        type : typeN
                    })
                }

                $scope.dragDrop = function (todo) {
                    return {
                        dragStart : function (event) {
                            console.log("DRAG!!!", todo.text);
                            $rootScope.dragDrop = {
                                todos : $scope.todos,
                                todo : todo
                            };
                        },
                        dragEnter : function (event) {
                            console.log("ENTER!!!", todo.text, $rootScope.dragDrop, $scope.todos, todo);
                            var ixTarget = $scope.todos.indexOf(todo);
                            var ixSource = $rootScope.dragDrop.todos.indexOf($rootScope.dragDrop.todos.todo);
                            var replaced = $scope.todos.splice(ixTarget, 1, $rootScope.dragDrop.todo);
                            $rootScope.dragDrop.todos.splice(ixSource, 1, replaced[0]);
                            console.log("DONE!!!", todo.text, $rootScope.dragDrop, $scope.todos, todo);
                        }
                    }
                }

        }])
        .directive('todoList', ["$compile", function ($compile) {
                return {
                    restrict : "E",
                    scope : {
                        todos : "=",
                        type : "=",
                        collapsed : "=",
                        setEdit : "&"
                    },
                    templateUrl : "list/todo-list.html",
                    compile : function (tElement, tAttr) {
                        var contents = tElement.contents().remove();
                        var compiledContents;
                        return function (scope, element) {
                            if (!compiledContents) {
                                compiledContents = $compile(contents);
                            }
                            compiledContents(scope, function (clone, scope) {
                                element.append(clone);
                            });
                        };
                    }
                };
        }])
        .directive('focusMe', function () {
            return {
                link : function (scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function (value) {
                        if (value === true) {
                            element[0].focus();
                        }
                    });
                }
            };
        })
        .directive('ngDraggable', ['$parse', function ($parse) {
                return {
                    restrict : 'A',
                    compile : function ($element, attr) {
                        // We expose the powerful $event object on the scope that provides access to the Window,
                        // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
                        // checks at the cost of speed since event handler expressions are not executed as
                        // frequently as regular change detection.
                        console.log("compiling draggable element");
                        var fn = $parse(attr.ngDraggable, /* interceptorFn */ null, /* expensiveChecks */ true);
                        return function ngDraggable(scope, element) {
                            console.log("linking draggable element");
                            angular.element(element).attr("draggable", "true");
                            element.on("dragstart", function (event) {
                                fn(scope).dragStart(event);
                            });
                            element.on("dragenter", function (event) {
                                fn(scope).dragEnter(event);
                            });
                            element.on("dragover", function (event) {
                                event.preventDefault();
                            });

                        };
                    }
                    // ,
                    // link : function (scope, el, attrs) {
                    //     console.log("linking draggable element");

                    //     angular.element(el).attr("draggable", "true");

                    //     var fn = $parse(attr[directiveName], /* interceptorFn */ null, /* expensiveChecks */ true);

                    //     el.on("dragstart", function (e) {
                    //         attrs.ngDraggable.dragStart();
                    //     });

                    // }

                };
        }]);

})();
