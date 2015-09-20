'use strict';

angular.module('directives.todoList')
	.controller('TodoCtrl', function($rootScope, $scope, $compile, $element) {
		console.log("todo", $scope.type);
		var types = ["today", "done"];
		var typeN = $scope.type ? types.indexOf($scope.type) : undefined;

		$scope.typeFilter = function(element) {
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
		};

		var prioritySuffix = ["up", "right", "down"];
		$scope.getPrioArrow = function(item) {
			if (item.priority !== undefined) {
				return prioritySuffix[item.priority];
			}
			return "right";
		};

		$scope.toggleDone = function(item, done) {
			done = (done !== undefined) ? done : (item.type == 1) ? undefined : 1;
			item.type = done;
			angular.forEach(item.todos, function(value, key) {
				$scope.toggleDone(value, done);
			});
			console.log($scope.todos);
		};

		$scope.changePriority = function(item) {
			var prio = (item.priority !== undefined) ? item.priority : 1;
			item.priority = (prio + 1) % prioritySuffix.length;
		};

		$scope.addSubtask = function(item) {
			console.log("SUBTASK");

			if (!item.todos) {
				item.todos = [];
			}
			item.todos.push({
				text: 'new',
				type: typeN
			});
		};

		$scope.dragDrop = function(todo) {
			return {
				dragStart: function(event) {
					console.log("DRAG!!!", todo.text);
					$rootScope.dragDrop = {
						todos: $scope.todos,
						todo: todo
					};
				},
				dragEnter: function(event) {
					console.log("ENTER!!!", todo.text, $rootScope.dragDrop, $scope.todos, todo);
					var ixTarget = $scope.todos.indexOf(todo);
					var ixSource = $rootScope.dragDrop.todos.indexOf($rootScope.dragDrop.todos.todo);
					var replaced = $scope.todos.splice(ixTarget, 1, $rootScope.dragDrop.todo);
					$rootScope.dragDrop.todos.splice(ixSource, 1, replaced[0]);
					console.log("DONE!!!", todo.text, $rootScope.dragDrop, $scope.todos, todo);
				}
			};
		};
	});