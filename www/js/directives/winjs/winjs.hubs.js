angular.module('starter').
directive('obtenerControl', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {				
			var hub = element[0].winControl;
			//window.hub = hub;
			var fn = $parse(attr.obtenerControl);                       
            fn(scope, {'ctrl' : hub});			
		}
	};
}])