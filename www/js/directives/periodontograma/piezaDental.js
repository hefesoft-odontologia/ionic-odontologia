angular.module('starter')
.directive('periodontogramaPiezaDental', [function () {
	return {
		restrict: 'E',
		scope:{			
			zoom : '=',			
			item: '='
		},
		templateUrl : 'templates/directives/periodontograma/piezaDental.html',
		controller : 'periodontogramaPiezaDentalCtrl',
		link: function (scope, el, attr) {
			$(el[0]).css('zoom', scope.zoom);
		}
	};
}])