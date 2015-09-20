'use strict';

angular
	.module('directives.ngDraggable', [])
	.directive('ngDraggable', ['$parse', function($parse) {
		return {
			restrict: 'A',
			compile: function($element, attr) {
					// We expose the powerful $event object on the scope that provides access to the Window,
					// etc. that isn't protected by the fast paths in $parse.  We explicitly request better
					// checks at the cost of speed since event handler expressions are not executed as
					// frequently as regular change detection.
					console.log('compiling draggable element');
					var fn = $parse(attr.ngDraggable, /* interceptorFn */ null, /* expensiveChecks */ true);
					return function ngDraggable(scope, element) {
						console.log('linking draggable element');
						angular.element(element).attr('draggable', 'true');
						element.on('dragstart', function(event) {
							fn(scope).dragStart(event);
						});
						element.on('dragenter', function(event) {
							fn(scope).dragEnter(event);
						});
						element.on('dragover', function(event) {
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