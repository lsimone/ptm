'use strict';

angular
	.module('directives.todoList', [])
	.directive('todoList', function TodoListDirective($compile) {
		return {
			restrict: "E",
			scope: {
				todos: "=",
				type: "=",
				collapsed: "=",
				setEdit: "&"
			},
			templateUrl: "js/directives/todo-list/todo-list.html",
			compile: function(tElement, tAttr) {
				var contents = tElement.contents().remove();
				var compiledContents;
				return function(scope, element) {
					if (!compiledContents) {
						compiledContents = $compile(contents);
					}
					compiledContents(scope, function(clone, scope) {
						element.append(clone);
					});
				};
			}
		};
	});