angular.module('starter').
directive('clickNavBar', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, el, attrs) {
			var fn = $parse(attrs['clickNavBar']);
			var ctrl = el[0].winControl;

			ctrl.addEventListener("click", function (e) {
	            if (e.target.id == "NextPage") {
	                WinJS.Navigation.navigate("/nextPage.html");
	            }
        	}, true);

		}
	};
}])