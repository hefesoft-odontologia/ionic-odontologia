angular.module('starter').
directive('myClick', [function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, el, attrs) {
			var fn = $parse(attrs['myClick']);
			el.on('click', function(){
				scope.$apply(function(){
					fn(scope);
				})
			})
		}
	};
}])