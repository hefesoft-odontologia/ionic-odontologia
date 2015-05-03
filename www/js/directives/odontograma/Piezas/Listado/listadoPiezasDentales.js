angular.module('starter')
.directive('listadoPiezasDentales', [function () {
	return {
		restrict: 'E',
		templateUrl: "js/directives/odontograma/Piezas/Listado/listado.html",
		controller : "listadoPiezasDentalesCtrl",
		link: function (scope, element, attrs) {
			
		}
	};
}])

.controller('listadoPiezasDentalesCtrl', ['$scope', '$rootScope', 'piezasService', 
	function($scope, $rootScope, piezasService){
	
	

	$scope.$on('Odontograma cargado', function(event, args){      
       $scope.items = piezasService.getPiezas(true);    
    });


	$scope.seleccionar = function(item){
		var seleccionado = {item : item};
		$rootScope.$broadcast('elemento-dental-seleccionado', { seleccionado: seleccionado });
	}

}])