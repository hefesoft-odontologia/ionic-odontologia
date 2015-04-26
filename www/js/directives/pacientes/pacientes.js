angular.module('starter')
.directive('pacientes', [function () {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {
			
		},
		templateUrl : 'templates/directives/pacientes/pacientes.html',
		controller: 'pacientesController'
	};
}])