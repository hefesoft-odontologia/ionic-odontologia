angular.module('starter')
.directive('pacientesAdicionar', [function () {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {
			
		},
		templateUrl: 'templates/directives/pacientes/adicionarPaciente.html',
		controller: 'pacientesController'
	};
}])